import express from "express";
import bcrypt from "bcrypt";
import { db } from "../db.js";

const router = express.Router();

// ROTA PARA REGISTRAR USUÁRIO
router.post("/register", async (req, res) => {
  const { nome, numero, cpf, senha } = req.body;

  if (!nome || !numero || !cpf || !senha) {
    return res.status(400).json({ error: "Preencha todos os campos!" });
  }

  try {
    // Criptografar senha
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    // Inserir no banco
    await db.query(
      "INSERT INTO users (nome, numero, cpf, senha) VALUES (?, ?, ?, ?)",
      [nome, numero, cpf, senhaCriptografada]
    );

    res.status(201).json({ message: "Usuário registrado com sucesso!" });

  } catch (error) {
    console.error(error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ error: "CPF já cadastrado!" });
    }

    res.status(500).json({ error: "Erro ao registrar usuário." });
  }
});

export default router;