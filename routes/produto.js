import express from "express";
import { db } from "../db.js";

const router = express.Router();


// CADASTRAR PRODUTO
router.post("/produto", async (req, res) => {
  const { nome, descricao, preco } = req.body;

  try {
    const [result] = await db.query(
      "INSERT INTO produtos (nome, descricao, preco) VALUES (?, ?, ?)",
      [nome, descricao, preco]
    );

    res.json({
      message: "Produto cadastrado com sucesso!",
      id: result.insertId,
      nome,
      descricao,
      preco
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao cadastrar produto." });
  }
});


//  LISTAR TODOS OS PRODUTOS
router.get("/produto", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, nome, descricao, preco FROM produtos"
    );

    res.json(rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao listar produtos." });
  }
});


// 📌 BUSCAR PRODUTO POR ID (SELECIONAR PRODUTO)
router.get("/produto/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query(
      "SELECT id, nome, descricao, preco FROM produtos WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }

    res.json(rows[0]); // retorna produto selecionado

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar produto." });
  }
});


// 📌 ADICIONAR PRODUTO AO CARRINHO
router.post("/carrinho/adicionar", async (req, res) => {
  const { usuario_id, produto_id, quantidade } = req.body;

  try {
    // Verifica se o produto existe
    const [produto] = await db.query(
      "SELECT * FROM produtos WHERE id = ?",
      [produto_id]
    );

    if (produto.length === 0) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }

    // Adiciona ao carrinho
    await db.query(
      "INSERT INTO carrinho (usuario_id, produto_id, quantidade) VALUES (?, ?, ?)",
      [usuario_id, produto_id, quantidade]
    );

    res.json({
      message: "Produto adicionado ao carrinho!",
      produto_id,
      quantidade
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao adicionar ao carrinho." });
  }
});


export default router;
