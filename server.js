const express = require("express");
// const bodyParser = require("body-parser"); /* descontinuada */
const cors = require("cors");

const app = express();

var corsOptions = {
 //origin: "http://localhost:4200" // use este código para liberar só para esta url
  header: ("Access-Control-Allow-Origin", "*")   // usar este para todos
};

app.use(cors(corsOptions));

// analisa solicitações de tipo de conteúdo - application/json
app.use(express.json()); /* bodyParser.json() está obsoleto */

// analisa solicitações de tipo de conteúdo - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() está obsoleto */

//rota simples
app.get("/", (req, res) => {
  res.json({ message: "Bem-vindo ao aplicativo bezkoder." });
});

require("./app/routes/produto.routes.js")(app);

// define a porta, escuta as requisições
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`O servidor está rodando na porta: http://localhost:${PORT}/api/products`);
});
