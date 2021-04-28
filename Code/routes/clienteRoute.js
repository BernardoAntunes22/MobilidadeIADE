var express = require("express");
var router = express.Router();
const Cliente = require("../models/clienteModel");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  let clientes = await Cliente.select();
  res.send(clientes);
});

router.post("/", async function (req, res, next) {
  try {
    let tipoBarco = await Barco.selectById(req.body.B_id);
    req.body.R_clienteLugar = tipoBarco.B_size;
    let clientes = await Cliente.create(req.body);
    res.send(clientes);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put("/:id", async function (req, res, next) {
  console.log(req.body);
  let cliente = await Cliente.update(req.params.id, req.body);
  res.send(cliente);
});

router.delete("/:id", async function (req, res, next) {
  let cliente = await Cliente.delete(req.params.id);
  res.send({ rowsAffected: cliente });
});

module.exports = router;
