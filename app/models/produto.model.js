const sql = require("./db.js");

// constructor
const Produto = function(produto) {
  this.name = produto.name;
  this.price = produto.price;
  this.published = produto.published;
};

Produto.create = (newProduto, result) => {
  sql.query("INSERT INTO products SET ?", newProduto, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created produto: ", { id: res.insertId, ...newProduto });
    result(null, { id: res.insertId, ...newProduto });
  });
};

Produto.findById = (id, result) => {
  sql.query(`SELECT * FROM products WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found produto: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Produto with the id
    result({ kind: "not_found" }, null);
  });
};

Produto.getAll = (name, result) => {
  let query = "SELECT * FROM products";

  if (name) {
    query += ` WHERE name LIKE '%${name}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("products: ", res);
    result(null, res);
  });
};

Produto.getAllPublished = result => {
  sql.query("SELECT * FROM products WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("products: ", res);
    result(null, res);
  });
};

Produto.updateById = (id, produto, result) => {
  sql.query(
    "UPDATE products SET name = ?, price = ?, published = ? WHERE id = ?",
    [produto.name, produto.price, produto.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Produto with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated produto: ", { id: id, ...produto });
      result(null, { id: id, ...produto });
    }
  );
};

Produto.remove = (id, result) => {
  sql.query("DELETE FROM products WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Produto with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted produto with id: ", id);
    result(null, res);
  });
};

Produto.removeAll = result => {
  sql.query("DELETE FROM products", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} products`);
    result(null, res);
  });
};

module.exports = Produto;
