import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { carregarAulas } from "../../storage/agendaStorage";
import { carregarAlunos } from "../../storage/alunosStorage";
import { carregarLancamentos } from "../../storage/financeiroStorage";
import { carregarRelatorios } from "../../storage/relatoriosStorage";

export default function DashboardScreen() {
  const [totalAlunos, setTotalAlunos] = useState(0);
  const [totalAulas, setTotalAulas] = useState(0);
  const [totalRelatorios, setTotalRelatorios] =
    useState(0);

  const [totalRecebido, setTotalRecebido] =
    useState(0);

  const [totalPendente, setTotalPendente] =
    useState(0);

  useEffect(() => {
    async function carregarDashboard() {
      const alunos = await carregarAlunos();
      const aulas = await carregarAulas();
      const relatorios =
        await carregarRelatorios();

      const lancamentos =
        await carregarLancamentos();

      setTotalAlunos(alunos.length);
      setTotalAulas(aulas.length);
      setTotalRelatorios(relatorios.length);

      const recebido = lancamentos
        .filter(
          (item: any) => item.status === "Pago"
        )
        .reduce(
          (total: number, item: any) =>
            total +
            Number(
              item.valor.replace(",", ".")
            ),
          0
        );

      const pendente = lancamentos
        .filter(
          (item: any) =>
            item.status === "Pendente"
        )
        .reduce(
          (total: number, item: any) =>
            total +
            Number(
              item.valor.replace(",", ".")
            ),
          0
        );

      setTotalRecebido(recebido);
      setTotalPendente(pendente);
    }

    carregarDashboard();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingBottom: 40,
      }}
    >
      <Text style={styles.titulo}>
        AulaSocial
      </Text>

      <View style={styles.card}>
        <Text style={styles.valor}>
          👨‍🎓 {totalAlunos}
        </Text>

        <Text>Total de Alunos</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.valor}>
          📅 {totalAulas}
        </Text>

        <Text>Aulas Agendadas</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.valor}>
          📝 {totalRelatorios}
        </Text>

        <Text>Relatórios Criados</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.valor}>
          💰 R$ {totalRecebido.toFixed(2)}
        </Text>

        <Text>Total Recebido</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.valor}>
          ⏳ R$ {totalPendente.toFixed(2)}
        </Text>

        <Text>Total Pendente</Text>
      </View>
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

  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
  },

  valor: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#1E88E5",
  },
});