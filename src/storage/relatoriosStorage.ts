import AsyncStorage from "@react-native-async-storage/async-storage";

const CHAVE_RELATORIOS = "@aulasocial_relatorios";

export async function salvarRelatorios(relatorios: any[]) {
  try {
    await AsyncStorage.setItem(
      CHAVE_RELATORIOS,
      JSON.stringify(relatorios)
    );
  } catch (error) {
    console.log("Erro ao salvar relatórios", error);
  }
}

export async function carregarRelatorios() {
  try {
    const dados = await AsyncStorage.getItem(
      CHAVE_RELATORIOS
    );

    if (!dados) {
      return [];
    }

    return JSON.parse(dados);
  } catch (error) {
    console.log("Erro ao carregar relatórios", error);
    return [];
  }
}