import { StyleSheet, View, Text, Image, ImageBackground} from 'react-native';

import Btn from '../components/alertButton.jsx';

const iconIncendio = require("../assets/incendio.png");
const iconPanico = require("../assets/panicoBTN.png");
const iconMedico = require("../assets/medico.png");

const logo = require("../assets/logo.png")

const backgroundImg = require("../assets/background.png")

export default function Main() {

  return (
        <ImageBackground source={backgroundImg} style={styles.backgroundImg}>
          <View style={styles.containerNav}>
            <Image style={styles.logo} source={logo}/>
            <Text style={styles.subText}>Mis Alarmas</Text>
          </View>

            <View style={styles.containerBtn}>
                <Btn
                    onPress={() => {}}
                    backgroundColor={{ pressed: '#c0d7fd', default: '#fe0000' }}
                    text="PÁNICO"
                    imageSource={iconPanico}
                />
                <Btn
                    onPress={() => {}}
                    backgroundColor={{ pressed: "#fdaea9", default: "#ffcc00"}}
                    text="INCENDIO"
                    imageSource={iconIncendio}
                />
                <Btn
                    onPress={() => {}}
                    backgroundColor={{ pressed: '#fdecbe', default: '#0000fe'}}
                    text="ASISTENCIA"
                    imageSource={iconMedico}
                />
            </View>
        </ImageBackground>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  containerBtn: {
    justifyContent: "space-evenly",
    marginHorizontal: 20,
    paddingVertical: 30,
  },
  containerNav: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  logo: {
    width: 200,
    height: 100,
    objectFit: "contain"
  },
  subText: {
    fontSize: 18,
    color: "white",
    fontFamily: "GothamBold",
    paddingLeft: 5,
    borderBottomWidth: 1,
    borderColor: "white",
  },
  backgroundImg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});