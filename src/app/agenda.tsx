import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  carregarAulas,
  salvarAulas,
} from "../storage/agendaStorage";
import { carregarAlunos } from "../storage/alunosStorage";
type Aula = {
  id: number;
  data: string;
  horario: string;
  aluno: string;
  materia: string;
};
type Aluno = {
  id: number;
  nome: string;
  telefone: string;
  serie: string;
};

export default function AgendaScreen() {
const [data, setData] = useState("");
const [horario, setHorario] = useState("");
const [alunoSelecionado, setAlunoSelecionado] = useState("");
const [materia, setMateria] = useState("");

const [alunos, setAlunos] = useState<Aluno[]>([]);
const [aulas, setAulas] = useState<Aula[]>([]);



  useEffect(() => {
  async function buscarAlunos() {
    const dados = await carregarAlunos();
    setAlunos(dados);
  }

  buscarAlunos();
}, []);

useEffect(() => {
  async function buscarAulas() {
    const dados = await carregarAulas();
    setAulas(dados);
  }

  buscarAulas();
}, []);

useEffect(() => {
  salvarAulas(aulas);
}, [aulas]);


function salvarAula() {
  if (!alunoSelecionado.trim()) {
    alert("Informe o aluno");
    return;
  }

  const novaAula: Aula = {
    id: Date.now(),
    data,
    horario,
    aluno: alunoSelecionado,
    materia,
  };

  setAulas([...aulas, novaAula]);

  setData("");
  setHorario("");
  setAlunoSelecionado("");
  setMateria("");
}
return (
    <ScrollView
  style={styles.container}
  contentContainerStyle={{ paddingBottom: 40 }}
>
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

  <Picker
  selectedValue={alunoSelecionado}
  onValueChange={(valor) => setAlunoSelecionado(valor)}
>
  <Picker.Item
    label="Selecione um aluno"
    value=""
  />

  {alunos.map((aluno) => (
    <Picker.Item
      key={aluno.id}
      label={aluno.nome}
      value={aluno.nome}
    />
  ))}
</Picker>

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
    </ScrollView>
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