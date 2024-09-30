
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
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 40,
        paddingBottom: 20,
      },
      subText: {
        paddingBottom: 30,
        fontWeight: "bold",
        fontSize: 20,
        color: "#1D1B69",
      },
      imageNav: {
        width: 35,
        height: 35,
        objectFit: "contain",
      },
})

export default Navbar