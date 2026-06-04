import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("aulasocial.db");

export function inicializarBanco() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS alunos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      telefone TEXT,
      serie TEXT,
      observacao TEXT
    );
  `);
}

export default db;