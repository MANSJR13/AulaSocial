import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Aula Social</Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => router.push("/alunos")}
      >
        <Text style={styles.textoBotao}>Alunos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => router.push("/agenda")}
      >
        <Text style={styles.textoBotao}>Agenda</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => router.push("/relatorio")}
      >
        <Text style={styles.textoBotao}>Relatório</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => router.push("/financeiro")}
      >
        <Text style={styles.textoBotao}>Financeiro</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },

  botao: {
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: "#1E88E5",
  },

  textoBotao: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
  },
});