import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons"; // Importação do ícone
import VoltarTela from "./VoltarTela";

// Componente Perimetro
const Perimetro = ({ navigation }) => {
  const [radius, setRadius] = useState("");
  const [result, setResult] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar a visibilidade do modal

  const calculateArea = () => {
    if (!isNaN(radius) && parseFloat(radius) >= 0) {
      const area = Math.PI * Math.pow(parseFloat(radius), 2);
      setResult(area.toFixed(2));
    } else {
      setResult("Por favor, insira um valor válido para o raio.");
    }
  };

  const limparCampos = () => {
    setRadius("");
    setResult(null);
  };

  return (
    <LinearGradient colors={["#FFFFFF", "#EAEAEA"]} style={styles.gradient}>
      <ScrollView
        contentContainerStyle={styles.containerScrollView}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <VoltarTela onPress={() => navigation.goBack()} />

          <View style={styles.header}>
            <Text style={styles.title}>Área do Círculo</Text>
          </View>

          <TouchableOpacity
            style={[styles.infoButton, styles.infoButtonTop]} // Adicionei o estilo infoButtonTop
            onPress={() => setModalVisible(true)}
          >
            <MaterialIcons name="info" size={30} color="white" />
          </TouchableOpacity>

          <View style={styles.textInput}>
            <TextInput
              style={[styles.input]}
              onChangeText={(number) => setRadius(number)}
              value={radius}
              placeholder="Raio do Círculo"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: "#53A176", width: "48%" },
              ]}
              onPress={calculateArea}
            >
              <Text style={styles.buttonText}>Calcular</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: "#FF0000", width: "48%" },
              ]}
              onPress={limparCampos}
            >
              <Text style={styles.buttonText}>Limpar</Text>
            </TouchableOpacity>
          </View>

          {result !== null && (
            <Text style={styles.result}>Área: {result} unidades quadradas</Text>
          )}

          {/* Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalView}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Perímetro </Text>
                <Text style={[styles.modalText, styles.formula]}>P=2πr</Text>
                <Text style={styles.modalText}>
                  A fórmula para calcular o perímetro(P) de uma tubulação
                  circular é:
                  {"\n\n"}
                  - Onde: π é o valor da constante pi, que representa a relação
                  entre a circunferência de um círculo e seu diâmetro, e é
                  aproximadamente igual a 3.14159.
                  {"\n\n"} 
                  - r é o raio da tubulação.
                  {"\n\n"}
                  Portanto, multiplicando o valor do raio pelo dobro da
                  constante pi (π), obtemos o perímetro da tubulação.
                </Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Fechar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  containerScrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: "5%",
    paddingVertical: "5%",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10%",
  },
  title: {
    fontSize: width * 0.12,
    fontFamily: "Montserrat-Bold",
    textAlign: "center",
    marginHorizontal: 70,
  },
  input: {
    height: width * 0.15,
    width: "100%",
    marginBottom: "5%",
    backgroundColor: "#F3F3F3",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1.0,
    shadowRadius: 3,
    elevation: 21,
    fontFamily: "Montserrat-Bold",
    paddingHorizontal: "5%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "5%",
  },
  button: {
    height: width * 0.1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 11,
    marginHorizontal: "2%",
    paddingHorizontal: "5%",
    elevation: 21,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: width * 0.04,
    fontFamily: "Montserrat-Bold",
  },
  result: {
    marginTop: height * 0.02,
    fontSize: width * 0.05,
    fontFamily: "Montserrat-Regular",
  },
  textInput: {
    height: Dimensions.get("window").width * 0.15,
    width: "100%",
    marginBottom: Dimensions.get("window").width * 0.1,
    backgroundColor: "#F3F3F3",
    borderWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1.0,
    shadowRadius: 3,
    elevation: 10,
    fontFamily: "Montserrat-Bold",
  },
  infoButtonTop: {
    position: "absolute",
    top: 45, // ou qualquer valor que desejar
    right: 20, // ou qualquer valor que desejar
    zIndex: 1, // Para garantir que fique acima dos outros elementos
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    padding: 30,
    marginTop: 30,
    margin: 40,
    borderRadius: 40,
    elevation: 5,
  },
  modalTitle: {
    fontSize: width * 0.06,
    fontFamily: "Montserrat-Bold",
    marginBottom: "2%",
    textAlign: "center",
  },
  modalText: {
    fontFamily: "Montserrat-Regular",
    marginBottom: "2%",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "black",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  formula: {
    textAlign: "center",
    justifyContent: "center",
    fontFamily: "Montserrat-Bold",
    fontSize: 20,
  },
});

export default Perimetro;