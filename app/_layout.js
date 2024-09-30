import { View, StyleSheet } from "react-native";
import { Stack } from "expo-router"


import Navbar from "../components/navbar";
import { FontProvider } from "./fontContext";

const userIcon = require("../assets/user.png")


export default function Layout() {

    return (
        <FontProvider>
            <View style={styles.main}>
                <Stack
                    screenOptions={{
                        headerTitle: "",
                        header: () => <Navbar text="Mis alertas" icon={userIcon} destination="/user"/>,
                    }}
                />
            </View>
        </FontProvider>
        
    )
}

const styles = StyleSheet.create ({
    main: {
        flex: 1,
    },
})