import { View, StyleSheet, ImageBackground } from "react-native";
import { Stack } from "expo-router"


import { FontProvider } from "./fontContext";



export default function Layout() {

    return (
            <FontProvider>
                <View style={styles.main}>
                    <Stack
                        screenOptions={{
                            headerTitle: "",
                            header: () => <></>
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


/*
<FontProvider>
            <ImageBackground source={backgroundImg} style={styles.backgroundImg}>
                <View style={styles.main}>
                    <Navbar/>
                    <Main/>
                </View>
            </ImageBackground>
        </FontProvider>
*/