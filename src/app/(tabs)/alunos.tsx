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
import MaskInput from "react-native-mask-input";
import { carregarAlunos, salvarAlunos } from "../../storage/alunosStorage";
console.log(carregarAlunos);
console.log(salvarAlunos);

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
  const [idEdicao, setIdEdicao] = useState<number | null>(null);

    useEffect(() => {
    async function buscarAlunos() {
      const dados = await carregarAlunos();
      setAlunos(dados);
    }

    buscarAlunos();
  }, []);

  useEffect(() => {
    salvarAlunos(alunos);
  }, [alunos]);


function adicionarAluno() {
  if (!nome.trim()) {
    alert("Informe o nome do aluno");
    return;
  }

  if (idEdicao !== null) {
    const alunosAtualizados = alunos.map((aluno) =>
      aluno.id === idEdicao
        ? {
            ...aluno,
            nome,
            telefone,
            serie,
          }
        : aluno
    );

    setAlunos(alunosAtualizados);
    setIdEdicao(null);
  } else {

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
  }

  function excluirAluno(id: number) {
    setAlunos(alunos.filter((a) => a.id !== id));
  }

  function editarAluno(aluno: Aluno) {
  setIdEdicao(aluno.id);

  setNome(aluno.nome);
  setTelefone(aluno.telefone);
  setSerie(aluno.serie);
}

  function limparCampos() {
  setNome("");
  setTelefone("");
  setSerie("");
  setIdEdicao(null);
}
  return (
    <ScrollView
  style={styles.container}
  contentContainerStyle={{ paddingBottom: 40 }}
>
      <Text style={styles.titulo}>Cadastro de Alunos</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      <MaskInput
  style={styles.input}
  placeholder="Telefone"
  value={telefone}
  onChangeText={(masked) =>
    setTelefone(masked)
  }
  mask={[
    "(",
    /\d/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ]}
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

      <TouchableOpacity
  style={styles.botaoLimpar}
  onPress={limparCampos}
  >
  <Text style={styles.textoBotao}>Limpar Campos</Text>
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
  style={styles.botaoEditar}
  onPress={() => editarAluno(item)}
>
  <Text style={styles.textoBotao}>Editar</Text>
</TouchableOpacity>

<TouchableOpacity
  style={styles.botaoExcluir}
  onPress={() => excluirAluno(item.id)}
>
  <Text style={styles.textoBotao}>Excluir</Text>
</TouchableOpacity>
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

botaoEditar: {
  backgroundColor: "#f0ad4e",
  padding: 10,
  borderRadius: 8,
  marginTop: 10,
},

botaoLimpar: {
  backgroundColor: "#6c757d",
  padding: 15,
  borderRadius: 8,
  marginBottom: 20,
},
});