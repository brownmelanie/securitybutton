import { useRef, useState } from "react";
import { Animated, Pressable, View, Text, Image, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../configAPI";
import * as Location from "expo-location";
import { iniciarSocket } from "./socketLocation";

const Btn = ({ onPress, backgroundColor, text, imageSource, displayText }) => {

    const [alertId, setAlertId] = useState(null);

    const animatedValue = useRef(new Animated.Value(0)).current;
    const animatedBackgroundColor = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [backgroundColor.default, backgroundColor.pressed],
    });

    const handlePressIn = () => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };
    const handlePressOut = () => {
        Animated.timing(animatedValue, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const refreshAccessToken = async () => {
        try {
            const refreshToken = await AsyncStorage.getItem('refreshToken');
    
            if (!refreshToken) {
                throw new Error('No se encontró el refresh token. Inicie sesión nuevamente.');
            }
    
            //consultar ENDPOINT
            const response = await fetch(`${API_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: refreshToken }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                const newAccessToken = data.accessToken;
                await AsyncStorage.setItem('accessToken', newAccessToken);
                return newAccessToken;
            } else {
                throw new Error('Inicie sesión nuevamente');
            }
        } catch (error) {
            Alert.alert('Error', error.message);
            throw error;
        }
    };


    const handlePress = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');

            if (!accessToken) {
                Alert.alert("Error", "No se encontró el token de usuario. Inicie sesión nuevamente");
                return;
            }

            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert("Error", "Permiso de ubicación denegado");
                return;
            }
            const location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;


            const enviarAlerta = async (accessToken) => {
                const response = await fetch(`${API_URL}/alerts`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({ 
                        type: text,
                        location: { latitude, longitude }
                    })
                });
    
                const data = await response.json();
    
                if (response.ok) {
                    Alert.alert("Alerta iniciada", `Alerta de tipo ${text} enviada con éxito.`);
                    setAlertId(data.id);
                    iniciarSocket(API_URL, data.id);
                } else if (response.status === 401) {
                    accessToken = await refreshAccessToken();
                    await enviarAlerta(accessToken);
                } else {
                    const errorMessage = Array.isArray(data.message)
                        ? data.message.join(', ')
                        : data.message || "Ocurrió un error al enviar la alerta. Intente nuevamente.";
                    Alert.alert(`Error ${response.status}`, errorMessage);
                }
            };
            await enviarAlerta(accessToken);
        } catch (error) {
            console.error('Error al enviar la alerta:', error);
            Alert.alert('Error', 'No se pudo enviar la alerta, intente nuevamente.');
        }
    
        if (onPress) {
            onPress();
        }
    };

    return (
        <Pressable
            onPress={handlePress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
        > 
            <Animated.View style={[styles.wrapperCustom, { backgroundColor: animatedBackgroundColor }]}>
                <View style={styles.wrapperBtn}>
                    <Image source={imageSource}/>
                    <Text style={styles.textBtn}>{displayText}</Text>
                </View>
            </Animated.View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    wrapperCustom: {
      borderRadius: 20,
      padding: 30,
      margin: 10,
      elevation: 8,
    },
    wrapperBtn: {
      alignItems: 'center',
    },
    textBtn: {
      marginLeft: 8,
      fontSize: 20,
      color: "white",
      paddingTop: 20,
      textAlign: "center",
      fontFamily: "GothamBlack",
    },
  });

export default Btn;