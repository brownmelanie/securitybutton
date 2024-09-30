import { StyleSheet, Image, Pressable, Text, View } from "react-native";
import { Link, Stack } from 'expo-router';

const iconLogo = require("../assets/logo.png");

export function LoginScreen () {
    return (
        <View style={styles.screen}>
            <Stack.Screen
                options={{
                    header: () => <></>,
                }}
            />
            <View style={styles.container}>

                <Image source={iconLogo} style={styles.imgLogo}/>

                <View style={styles.inputCont}>
                {/*EMAIL CONTRASENA PROVISORIOS!!!!!!!!!!!!!!!!!!! */}
                    <Text style={styles.email}>Email</Text>
                    <Text style={styles.contrasena}>Contraseña</Text>
                </View>
                

                <View style={styles.containerBtn}>
                    <Link asChild href="/main">
                        <Pressable style={styles.btn}>
                            <Text style={styles.btnText}>Iniciar Sesión</Text>
                        </Pressable>
                    </Link>
                    <Text style={styles.btnSubText}>¿Olvidaste tu contraseña?</Text>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: "#F3F4F6",
        minHeight: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
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
        justifyContent: "space-around"
    },
    /*EMAIL CONTRASENA PROVISORIOS!!!!!!!!!!!!!!!!!!! */
    contrasena: {
        color: "#6C6C72",
        borderBottomWidth: 1,
        borderBottomColor: "#6C6C72",
        fontFamily: "Gotham",
    },
    email: {
        color: "#6C6C72",
        borderBottomWidth: 1,
        borderBottomColor: "#6C6C72",
        fontFamily: "Gotham",
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
    btnSubText: {
        color: "#6C6C72",
        fontFamily: "Gotham",
    }
})
