import { StyleSheet, View } from 'react-native';

import Btn from '../components/alertButton.jsx';

const iconIncendio = require("../assets/incendio.png");
const iconMedico = require("../assets/medico.png");
const iconPanico= require("../assets/panico.png");

export default function Main() {

  return (
        <View style={styles.mainContainer}>
          <View style={styles.containerBtn}>
              <Btn
                  onPress={() => {}}
                  backgroundColor={{ pressed: '#c0d7fd', default: '#FC014D' }}
                  text="PÁNICO"
                  imageSource={iconPanico}
              />
              <Btn
                  onPress={() => {}}
                  backgroundColor={{ pressed: '#fdecbe', default: '#00EC3C'}}
                  text="INCENDIO"
                  imageSource={iconIncendio}
              />
              <Btn
                  onPress={() => {}}
                  backgroundColor={{ pressed: "#fdaea9", default: "#FFF200"}}
                  text="EMERGENCIA MÉDICA"
                  imageSource={iconMedico}
              />
          </View>
        </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#F3F4F6",
    minHeight: "95%",
  },
  containerBtn: {
    height: "90%",
    justifyContent: "space-evenly",
    marginHorizontal: 30,
    paddingBottom: 50,
  },
});