import AsyncStorage from "@react-native-async-storage/async-storage";

const CHAVE_FINANCEIRO = "@aulasocial_financeiro";

export async function salvarLancamentos(
  lancamentos: any[]
) {
  try {
    await AsyncStorage.setItem(
      CHAVE_FINANCEIRO,
      JSON.stringify(lancamentos)
    );
  } catch (error) {
    console.log(
      "Erro ao salvar financeiro",
      error
    );
  }
}

export async function carregarLancamentos() {
  try {
    const dados = await AsyncStorage.getItem(
      CHAVE_FINANCEIRO
    );

    if (!dados) {
      return [];
    }

    return JSON.parse(dados);
  } catch (error) {
    console.log(
      "Erro ao carregar financeiro",
      error
    );

    return [];
  }
}