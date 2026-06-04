import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Relatorio = {
  id: number;
  aluno: string;
  data: string;
  materia: string;
  conteudo: string;
  percepcao: string;
  observacoes: string;
};

export default function RelatorioScreen() {
  const [aluno, setAluno] = useState("");
  const [data, setData] = useState("");
  const [materia, setMateria] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [percepcao, setPercepcao] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const [relatorios, setRelatorios] = useState<Relatorio[]>([]);

  function salvarRelatorio() {
    if (!aluno.trim()) {
      alert("Informe o aluno");
      return;
    }

    const novoRelatorio: Relatorio = {
      id: Date.now(),
      aluno,
      data,
      materia,
      conteudo,
      percepcao,
      observacoes,
    };

    setRelatorios([...relatorios, novoRelatorio]);

    limparCampos();
  }

  function limparCampos() {
    setAluno("");
    setData("");
    setMateria("");
    setConteudo("");
    setPercepcao("");
    setObservacoes("");
  }

  function excluirRelatorio(id: number) {
    setRelatorios(relatorios.filter((r) => r.id !== id));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Relatório de Aula</Text>

      <TextInput
        style={styles.input}
        placeholder="Aluno"
        value={aluno}
        onChangeText={setAluno}
      />

      <TextInput
        style={styles.input}
        placeholder="Data"
        value={data}
        onChangeText={setData}
      />

      <TextInput
        style={styles.input}
        placeholder="Matéria"
        value={materia}
        onChangeText={setMateria}
      />

      <TextInput
        style={styles.input}
        placeholder="Conteúdo Trabalhado"
        value={conteudo}
        onChangeText={setConteudo}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Percepções sobre o aluno"
        value={percepcao}
        onChangeText={setPercepcao}
        multiline
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Observações da aula"
        value={observacoes}
        onChangeText={setObservacoes}
        multiline
      />

      <TouchableOpacity
        style={styles.botaoSalvar}
        onPress={salvarRelatorio}
      >
        <Text style={styles.textoBotao}>Salvar Relatório</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoLimpar}
        onPress={limparCampos}
      >
        <Text style={styles.textoBotao}>Limpar Campos</Text>
      </TouchableOpacity>

      <FlatList
        data={relatorios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Text style={styles.tituloRelatorio}>
              RELATÓRIO {index + 1}
            </Text>

            <Text><Text style={styles.label}>Aluno:</Text> {item.aluno}</Text>
            <Text><Text style={styles.label}>Data:</Text> {item.data}</Text>
            <Text><Text style={styles.label}>Matéria:</Text> {item.materia}</Text>

            <Text style={styles.secao}>Conteúdo Trabalhado</Text>
            <Text>{item.conteudo}</Text>

            <Text style={styles.secao}>Percepções</Text>
            <Text>{item.percepcao}</Text>

            <Text style={styles.secao}>Observações</Text>
            <Text>{item.observacoes}</Text>

            <TouchableOpacity
              style={styles.botaoExcluir}
              onPress={() => excluirRelatorio(item.id)}
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
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },

  textArea: {
    minHeight: 80,
    textAlignVertical: "top",
  },

  botaoSalvar: {
    backgroundColor: "#1E88E5",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },

  botaoLimpar: {
    backgroundColor: "#6c757d",
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
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },

  tituloRelatorio: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E88E5",
    marginBottom: 10,
  },

  label: {
    fontWeight: "bold",
  },

  secao: {
    marginTop: 10,
    fontWeight: "bold",
  },

  botaoExcluir: {
    backgroundColor: "#d9534f",
    padding: 10,
    borderRadius: 8,
    marginTop: 15,
  },
});