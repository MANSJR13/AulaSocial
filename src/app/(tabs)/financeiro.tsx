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
import {
  carregarLancamentos,
  salvarLancamentos,
} from "../../storage/financeiroStorage";

type Lancamento = {
  id: number;
  aluno: string;
  data: string;
  descricao: string;
  valor: string;
  status: string;
};

export default function FinanceiroScreen() {
  const [aluno, setAluno] = useState("");
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [status, setStatus] = useState("");

  const [filtroAluno, setFiltroAluno] = useState("");
  const [filtroMes, setFiltroMes] = useState("");

  const [lancamentos, setLancamentos] = useState<Lancamento[]>([]);
  const mascaraData = [
  /\d/,
  /\d/,
  "/",
  /\d/,
  /\d/,
  "/",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

  useEffect(() => {
  async function buscarLancamentos() {
    const dados =
      await carregarLancamentos();

    setLancamentos(dados);
  }

  buscarLancamentos();
}, []);

useEffect(() => {
  salvarLancamentos(lancamentos);
}, [lancamentos]);

  function salvarLancamento() {
    if (!aluno.trim()) {
      alert("Informe o aluno");
      return;
    }

    if (!valor.trim()) {
      alert("Informe o valor");
      return;
    }

    const novoLancamento: Lancamento = {
      id: Date.now(),
      aluno,
      data,
      descricao,
      valor,
      status,
    };

    setLancamentos([...lancamentos, novoLancamento]);

    limparCampos();
  }

  function limparCampos() {
    setAluno("");
    setData("");
    setDescricao("");
    setValor("");
    setStatus("");
  }

  function excluirLancamento(id: number) {
    setLancamentos(
      lancamentos.filter((item) => item.id !== id)
    );
  }

  const lancamentosFiltrados = lancamentos.filter(
  (item) =>
    item.aluno
      .toLowerCase()
      .includes(filtroAluno.toLowerCase()) &&
    item.data.includes(filtroMes)
);

  const totalRecebido = lancamentos
    .filter((item) => item.status === "Pago")
    .reduce(
      (total, item) =>
        total + Number(item.valor.replace(",", ".")),
      0
    );

  const totalPendente = lancamentos
    .filter((item) => item.status === "Pendente")
    .reduce(
      (total, item) =>
        total + Number(item.valor.replace(",", ".")),
      0
    );

  return (
   <ScrollView
  style={styles.container}
  contentContainerStyle={{ paddingBottom: 40 }}
>
      <Text style={styles.titulo}>Financeiro</Text>

      <View style={styles.dashboard}>
        <Text style={styles.dashboardTexto}>
          💰 Recebido: R$ {totalRecebido.toFixed(2)}
        </Text>

        <Text style={styles.dashboardTexto}>
          ⏳ Pendente: R$ {totalPendente.toFixed(2)}
        </Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Aluno"
        value={aluno}
        onChangeText={setAluno}
      />

 <MaskInput
  style={styles.input}
  placeholder="Data"
  value={data}
  onChangeText={(masked) =>
    setData(masked)
  }
  mask={mascaraData}
/>

      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />

      <TextInput
        style={styles.input}
        placeholder="Valor"
        value={valor}
        onChangeText={setValor}
        keyboardType="numeric"
      />

      <Text style={styles.subtitulo}>
        Status
      </Text>

      <View style={styles.containerStatus}>
        <TouchableOpacity
          style={styles.botaoPago}
          onPress={() => setStatus("Pago")}
        >
          <Text style={styles.textoBotao}>
            Pago
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoPendente}
          onPress={() => setStatus("Pendente")}
        >
          <Text style={styles.textoBotao}>
            Pendente
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.statusSelecionado}>
        Status: {status || "Não informado"}
      </Text>

      <TouchableOpacity
        style={styles.botaoSalvar}
        onPress={salvarLancamento}
      >
        <Text style={styles.textoBotao}>
          Salvar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoLimpar}
        onPress={limparCampos}
      >
        <Text style={styles.textoBotao}>
          Limpar Campos
        </Text>
      </TouchableOpacity>

      <Text style={styles.subtitulo}>
        Filtros
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Buscar por aluno"
        value={filtroAluno}
        onChangeText={setFiltroAluno}
      />

    <TextInput
  style={styles.input}
  placeholder="Filtrar por mês (06/2026)"
  value={filtroMes}
  onChangeText={setFiltroMes}
/>

      <FlatList
        data={lancamentosFiltrados}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Text style={styles.tituloCard}>
              LANÇAMENTO {index + 1}
            </Text>

            <Text>
              <Text style={styles.label}>
                Aluno:
              </Text>{" "}
              {item.aluno}
            </Text>

            <Text>
              <Text style={styles.label}>
                Data:
              </Text>{" "}
              {item.data}
            </Text>

            <Text>
              <Text style={styles.label}>
                Descrição:
              </Text>{" "}
              {item.descricao}
            </Text>

            <Text>
              <Text style={styles.label}>
                Valor:
              </Text>{" "}
              R$ {item.valor}
            </Text>

            <Text>
              <Text style={styles.label}>
                Status:
              </Text>{" "}
              {item.status}
            </Text>

            <TouchableOpacity
              style={styles.botaoExcluir}
              onPress={() =>
                excluirLancamento(item.id)
              }
            >
              <Text style={styles.textoBotao}>
                Excluir
              </Text>
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

  dashboard: {
    backgroundColor: "#e3f2fd",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },

  dashboardTexto: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },

  subtitulo: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },

  containerStatus: {
    flexDirection: "row",
    marginBottom: 10,
  },

  botaoPago: {
    flex: 1,
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 8,
    marginRight: 5,
  },

  botaoPendente: {
    flex: 1,
    backgroundColor: "#ffc107",
    padding: 12,
    borderRadius: 8,
    marginLeft: 5,
  },

  statusSelecionado: {
    marginBottom: 15,
    fontWeight: "bold",
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
    marginBottom: 10,
  },

  tituloCard: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E88E5",
    marginBottom: 10,
  },

  label: {
    fontWeight: "bold",
  },

  botaoExcluir: {
    backgroundColor: "#d9534f",
    padding: 10,
    borderRadius: 8,
    marginTop: 15,
  },
});