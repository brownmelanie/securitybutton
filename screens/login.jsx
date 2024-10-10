import { StyleSheet, Image, Pressable, Text, View, TextInput, ImageBackground, Alert } from "react-native";
import { Link, Stack } from 'expo-router';
import React, { useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

const iconLogo = require("../assets/logo.png");
const background = require("../assets/background.png")

export function LoginScreen () {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            /*fetch("link de la api") logica de las api aparte para reemplazar el link en un lugar y se muestre en todos lados */
          const response = await fetch('', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
    
          const data = await response.json();
    
          if (response.ok) {
            await AsyncStorage.setItem('userToken', data.token);
            console.log('Token guardado:', data.token);
            // aca deberia redirigir al main (botones)
          } else { //aca devolveria el codigo de error del back
            Alert.alert('Error', data.message || 'El email o contraseña ingresados son incorrectos. Intente nuevamente');
          }
        } catch (error) {
          console.error('Error al iniciar sesión:', error);
          Alert.alert('Error', 'No se pudo conectar con el servidor, intente nuevamente más tarde');
        }
      };

    return (
        <ImageBackground source={background} style={styles.backgroundImg}>
            <Stack.Screen
                options={{
                    header: () => <></>,
                }}
            />
            <View style={styles.container}>

                <Image source={iconLogo} style={styles.imgLogo}/>

                <View style={styles.inputCont}>
                    <Text style={styles.inputText}>INGRESAR</Text>
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
                    <Link asChild href="/main">
                        <Pressable style={styles.btn} onPress={handleLogin}>
                            <Text style={styles.btnText}>Iniciar Sesión</Text>
                        </Pressable>
                    </Link>
                </View>

            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        borderRadius: 15,
        width: "80%",
        height: "80%",
        justifyContent: "space-between",
        alignItems: "center",
    },
    imgLogo: {
        width: 250,
        height: 80,
        objectFit: "contain",
        marginTop: 40,
    },
    inputCont: {
        width: "70%",
        height: 150,
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    inputText: {
        fontFamily: "GothamBold",
        fontSize: 20,
        textAlign: "center",
        marginTop: -80,
        marginBottom: 50,
        color: "#1D1B69",
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
