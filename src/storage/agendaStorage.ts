import AsyncStorage from "@react-native-async-storage/async-storage";

const CHAVE_AGENDA = "@aulasocial_agenda";

export async function salvarAulas(aulas: any[]) {
  try {
    await AsyncStorage.setItem(
      CHAVE_AGENDA,
      JSON.stringify(aulas)
    );
  } catch (error) {
    console.log("Erro ao salvar agenda", error);
  }
}

export async function carregarAulas() {
  try {
    const dados = await AsyncStorage.getItem(
      CHAVE_AGENDA
    );

    if (!dados) {
      return [];
    }

    return JSON.parse(dados);
  } catch (error) {
    console.log("Erro ao carregar agenda", error);
    return [];
  }
}