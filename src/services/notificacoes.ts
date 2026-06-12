import * as Notifications from "expo-notifications";

export async function solicitarPermissao() {
  const { status } =
    await Notifications.requestPermissionsAsync();

  return status;
}

export async function agendarNotificacao(
  aluno: string,
  horario: string
) {
await Notifications.scheduleNotificationAsync({
  content: {
    title: "Aula Social",
    body: `Você possui aula com ${aluno} às ${horario}.`,
  },

  trigger: {
    type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
    seconds: 10,
  },
});
}