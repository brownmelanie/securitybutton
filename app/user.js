import { View, StyleSheet, Image, Pressable, Text } from "react-native"
import { Link } from 'expo-router';

import Navbar from "../components/navbar"
import Input from "../components/inputUser"

const homeIcon = require("../assets/home.png")
const logoIcon = require("../assets/logo.png")


export default function User() {
    return(
        <View style={styles.wrapper}>
            <Navbar text="Mi perfil" icon={homeIcon} destination="/main"/>
            <Image source={logoIcon} style={styles.logoIcon}/>
            <View style={styles.container}>

                <View style={styles.containerInput}>
                    <Input title="Nombre completo" content="John Doe"/>
                    <Input title="Correo electrónico" content="johndoe@gmail.com"/>
                    <Input title="Número de teléfono" content="+54 (911) 1111-1111"/>
                    <Input title="Sector custodiado" content="AB 123"/>
                </View>

                <Link asChild href="/">
                    <Pressable style={styles.btn}>
                        <Text style={styles.btnText}>Cerrar Sesión</Text>
                    </Pressable>
                </Link>
            </View>
        </View>
    )
}

const styles = StyleSheet.create ({
    wrapper: {
        paddingTop: 60,
        backgroundColor: "#F3F4F6",
        minHeight: "100%",
    },
    logoIcon: {
        width: 300,
        height: 100,
        objectFit: "contain",
        alignSelf: "center",
    },
    container: {
        backgroundColor: "white",
        height: "70%",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 40,
        marginTop: 50,
    },
    containerInput: {
       width: "80%",
    },
    btn: {
        backgroundColor: "#1D1B69",
        padding: 20,
        width: 200,
        borderRadius: 15,
        marginVertical: 20,
    },
    btnText: {
        color: "white",
        textAlign: "center",
        fontSize: 20,
    }
    
})