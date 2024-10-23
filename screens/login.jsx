import { StyleSheet, Image, Pressable, Text, View, TextInput, ImageBackground, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { API_URL } from "../configAPI"

const iconLogo = require("../assets/logo.png");
const background = require("../assets/background.png")

export function LoginScreen () {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();


    const handleLogin = async () => {

        if (!email || !password) {
            Alert.alert('Error', 'Por favor, ingrese su email y contraseña.');
            return;
        }

        try {
          const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
    
          const {accessToken, refreshToken} = await response.json();
    
          if (response.ok) {
            await AsyncStorage.setItem('accessToken', accessToken);
            await AsyncStorage.setItem('refreshToken', refreshToken);
            console.log(accessToken, refreshToken);
                router.push("/main")
          } else {
            Alert.alert(
                `Error ${response.status}`,
                data.message || 'El email o contraseña ingresados son incorrectos. Intente nuevamente'
              );
          }
        } catch (error) {
          console.error('Error al iniciar sesión:', error);
          Alert.alert( 'Error', 
            'No se pudo conectar con el servidor, intente nuevamente más tarde'
          );
        }
      };

      //input email y pass mas anchos

    return (
        <ImageBackground source={background} style={styles.backgroundImg}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
            >

            <Stack.Screen
                options={{
                    header: () => <></>,
                }}
            />
            <View style={styles.container}>

                <Image source={iconLogo} style={styles.imgLogo}/>

                <View style={styles.inputCont}>
                    
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
        
                <View style={styles.containerBtn}>

                        <Pressable style={styles.btn} onPress={handleLogin}>
                            <Text style={styles.btnText}>Iniciar Sesión</Text>
                        </Pressable>

                </View>

            </View>
            </KeyboardAvoidingView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 90,
        backgroundColor: "white",
        borderRadius: 15,
        width: "80%",
        justifyContent: "space-between",
        alignItems: "center",
    },
    imgLogo: {
        width: 250,
        height: 80,
        objectFit: "contain",
        marginTop: 30,
    },
    inputCont: {
        width: "70%",
        height: 150,
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 10,
        fontFamily: "Gotham"
      },
    containerBtn: {
        alignItems: "center",
        marginBottom: 40,
    },
    btn: {
        backgroundColor: "#1D1B69",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 15,
        marginBottom: 10,
    },
    btnText: {
        color: "white",
        textAlign: "center",
        fontSize: 20,
        fontFamily: "Gotham",
    },
    backgroundImg: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center"
    }
})
