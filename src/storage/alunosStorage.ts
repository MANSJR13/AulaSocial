import AsyncStorage from "@react-native-async-storage/async-storage";
import { Aluno } from "../types/aluno";

const CHAVE_ALUNOS = "@aulasocial_alunos";

export async function salvarAlunos(alunos: Aluno[]) {
  try {
    await AsyncStorage.setItem(
      CHAVE_ALUNOS,
      JSON.stringify(alunos)
    );
  } catch (error) {
    console.log("Erro ao salvar alunos", error);
  }
}

export async function carregarAlunos(): Promise<Aluno[]> {
  try {
    const dados = await AsyncStorage.getItem(
      CHAVE_ALUNOS
    );

    if (!dados) {
      return [];
    }

    return JSON.parse(dados);
  } catch (error) {
    console.log("Erro ao carregar alunos", error);
    return [];
  }
}