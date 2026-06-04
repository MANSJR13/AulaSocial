import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Aluno = {
  id: number;
  nome: string;
  telefone: string;
  serie: string;
};

export default function AlunosScreen() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [serie, setSerie] = useState("");

  const [alunos, setAlunos] = useState<Aluno[]>([]);

  function adicionarAluno() {
    if (!nome.trim()) {
      alert("Informe o nome do aluno");
      return;
    }

    const novoAluno: Aluno = {
      id: Date.now(),
      nome,
      telefone,
      serie,
    };

    setAlunos([...alunos, novoAluno]);

    setNome("");
    setTelefone("");
    setSerie("");
  }

  function excluirAluno(id: number) {
    setAlunos(alunos.filter((a) => a.id !== id));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastro de Alunos</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTelefone}
      />

      <TextInput
        style={styles.input}
        placeholder="Série"
        value={serie}
        onChangeText={setSerie}
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={adicionarAluno}
      >
        <Text style={styles.textoBotao}>Salvar</Text>
      </TouchableOpacity>

      <FlatList
        data={alunos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text>{item.telefone}</Text>
            <Text>{item.serie}</Text>

            <TouchableOpacity
              style={styles.botaoExcluir}
              onPress={() => excluirAluno(item.id)}
            >
              <Text style={styles.textoBotao}>Excluir</Text>
            </TouchableOpacity>
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

  nome: {
    fontSize: 18,
    fontWeight: "bold",
  },

  botaoExcluir: {
    backgroundColor: "#d9534f",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
});