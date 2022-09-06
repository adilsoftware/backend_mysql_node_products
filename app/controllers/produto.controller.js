const Produto = require("../models/produto.model.js");

// Cria e salva um novo Produto
exports.create = (req, res) => {
  // Valida a requisição
  if (!req.body) {
    res.status(400).send({
      message: "O conteúdo não pode ficar vazio!"
    });
  }

  
//Cria um produto
  const produto = new Produto({
    name: req.body.name,
    price: req.body.price,
    published: req.body.published || false
  });

// Salva o produto no banco de dados
  Produto.create(produto, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao criar o Produto."
      });
    else res.send(data);
  });
};

// Recupera todos os Produtos do banco de dados (com condição).
exports.findAll = (req, res) => {
  const name = req.query.name;

  Produto.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao recuperar os produtos."
      });
    else res.send(data);
  });
};

// Encontra um único Produto por Id
exports.findOne = (req, res) => {
  Produto.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Produto não encontrado com id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Erro ao recuperar o produto com id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// encontra todos os produtos publicados
exports.findAllPublished = (req, res) => {
  Produto.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao recuperar os produtos."
      });
    else res.send(data);
  });
};

// Atualiza um Produto identificado pelo id na requisição
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "O conteúdo não pode ficar vazio!"
    });
  }

  console.log(req.body);

  Produto.updateById(
    req.params.id,
    new Produto(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Produto não encontrado com id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Erro ao atualizar o produto com id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Excluir um Produto com o id especificado na solicitação
exports.delete = (req, res) => {
  Produto.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Produto não encontrado com id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Não foi possível excluir o produto com id " + req.params.id
        });
      }
    } else res.send({ message: `Produto foi deletado com sucesso!` });
  });
};

// Excluir todos os produtos do banco de dados.
exports.deleteAll = (req, res) => {
  Produto.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao remover todos os produtos."
      });
    else res.send({ message: `Todos os produtos foram excluídos com sucesso!` });
  });
};
