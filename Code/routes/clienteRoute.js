var express = require("express");
var router = express.Router();
const Cliente = require("../models/clienteModel");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  let clientes = await Cliente.select();
  res.send(clientes);
});

router.get("/getById/:clientes", async function (req, res, next) {
  let clientes = await Cliente.getById(req.params.clientes);
  res.send(clientes);
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



router.get("/login/:name", async function(req, res) {
  let name = req.params.name;
  let clientes = await Cliente.selectByName(name);


  let response = 'Failed';
  if(clientes.length > 0){
    response = clientes[0];
    response.accountType = "Cliente";
  }

  res.send(response);
});


module.exports = router;
