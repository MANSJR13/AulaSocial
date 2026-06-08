import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Início",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="alunos"
        options={{
          title: "Alunos",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="people"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="agenda"
        options={{
          title: "Agenda",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="calendar"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="relatorio"
        options={{
          title: "Relatórios",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="document-text"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="financeiro"
        options={{
          title: "Financeiro",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="cash"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}