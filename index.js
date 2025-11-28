import express from "express";
import path from "path";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import produtoRoutes from "./routes/produto.js";


const app = express();
app.use(express.json());

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.get("/login",(req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html", ));
});

app.get("/registro",(req, res) => {
    res.sendFile(path.join(__dirname, "public", "register.html", ));
});

app.get("/login",(req, res) => {
    res.sendFile(path.join(__dirname, "public", "produto.html", ));
});

app.get("/login",(req, res) => {
    res.sendFile(path.join(__dirname, "public", "carrinho.html", ));
});

app.get("/", (req, res) => {
  res.send("API rodando!")
})

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
