import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Aula = {
  id: number;
  data: string;
  horario: string;
  aluno: string;
  materia: string;
};

export default function AgendaScreen() {
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [aluno, setAluno] = useState("");
  const [materia, setMateria] = useState("");

  const [aulas, setAulas] = useState<Aula[]>([]);

  function salvarAula() {
    if (!aluno.trim()) {
      alert("Informe o aluno");
      return;
    }

    const novaAula: Aula = {
      id: Date.now(),
      data,
      horario,
      aluno,
      materia,
    };

    setAulas([...aulas, novaAula]);

    setData("");
    setHorario("");
    setAluno("");
    setMateria("");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Agenda de Aulas</Text>

      <TextInput
        style={styles.input}
        placeholder="Data"
        value={data}
        onChangeText={setData}
      />

      <TextInput
        style={styles.input}
        placeholder="Horário"
        value={horario}
        onChangeText={setHorario}
      />

      <TextInput
        style={styles.input}
        placeholder="Aluno"
        value={aluno}
        onChangeText={setAluno}
      />

      <TextInput
        style={styles.input}
        placeholder="Matéria"
        value={materia}
        onChangeText={setMateria}
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={salvarAula}
      >
        <Text style={styles.textoBotao}>Salvar Aula</Text>
      </TouchableOpacity>

      <FlatList
        data={aulas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
         <View style={styles.card}>
  <Text style={styles.tituloAula}>
    AULA {index + 1}
  </Text>

  <Text>{item.data}</Text>
  <Text>{item.horario}</Text>
  <Text>{item.aluno}</Text>
  <Text>{item.materia}</Text>
</View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },

  botao: {
    backgroundColor: "#1E88E5",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },

  textoBotao: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },

  tituloAula: {
  fontSize: 18,
  fontWeight: "bold",
  marginBottom: 10,
  color: "#1E88E5",
},
});