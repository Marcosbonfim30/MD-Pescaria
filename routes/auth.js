import express from "express";
import bcrypt from "bcrypt";
import { db } from "../db.js";

const router = express.Router();

// LOGIN
router.post("/login", async (req, res) => {
  const { cpf, senha } = req.body;

  try {
    const [rows] = await db.query(
      "SELECT * FROM users WHERE cpf = ?",
      [cpf]
    );

    if (rows.length === 0) {
      return res.status(400).json({ error: "Usuário não encontrado." });
    }

    const usuario = rows[0];

    const senhaConfere = await bcrypt.compare(senha, usuario.senha);

    if (!senhaConfere) {
      return res.status(401).json({ error: "Senha incorreta." });
    }

    res.json({
      message: "Login autorizado!",
      id: usuario.id,           // id = numero de cadastro
      nome: usuario.nome,
      numero: usuario.numero
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro no login." });
  }
});

export default router;

router.get("/usuario/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query(
      "SELECT id, nome, numero, cpf FROM users WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar usuário." });
  }
});