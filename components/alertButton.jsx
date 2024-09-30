import { useRef } from "react";
import { Animated, Pressable, View, Text, Image, StyleSheet, Alert } from "react-native";


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

    const handlePress = () => {
        Alert.alert("Alerta iniciada", `Alerta iniciada: ${text}`, [{text: "OK"}]);
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
      borderRadius: 8,
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