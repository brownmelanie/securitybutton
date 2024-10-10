import { useRef } from "react";
import { Animated, Pressable, View, Text, Image, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Btn = ({ onPress, backgroundColor, text, imageSource }) => {
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

    const handlePress = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            
            if (!token) {
                Alert.alert('Error', 'No se encontró el token de autenticación, inicia sesión nuevamente');
                return;
            }

            const timestamp = new Date().toISOString();

            const data = {
                token,
                text,
                timestamp
            };

            //solicitud POST al back, fetch("link back api")
            const response = await fetch('', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                Alert.alert('Éxito', 'Alerta Iniciada');
            } else {
                Alert.alert('Error', result.message || 'Ocurrió un error, intente nuevamente');
            }

        } catch (error) {
            console.error('Error al enviar los datos:', error);
            Alert.alert('Error', 'No se pudo enviar la información');
        }

        //llamada a las funciones pasadas como props
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
                    <Text style={styles.textBtn}>{text}</Text>
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