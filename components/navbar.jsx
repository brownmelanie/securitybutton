
import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import { Link } from 'expo-router';

const Navbar = ({text, icon, destination}) => {

    return (
      <View style={styles.containerNav}>
        <Text style={styles.subText}>{text}</Text>
        <Link asChild href={destination}>
          <Pressable>
            <Image style={styles.imageNav} source={icon}/>
          </Pressable>
        </Link>
      </View>
    )
}

const styles = StyleSheet.create ({
    containerNav: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 40,
        paddingTop: 70,
        backgroundColor: "#F3F4F6",
      },
      subText: {
        fontSize: 22,
        color: "#1D1B69",
        fontFamily: "GothamBlack",
      },
      imageNav: {
        width: 35,
        height: 35,
        objectFit: "contain",
      },
})

export default Navbar