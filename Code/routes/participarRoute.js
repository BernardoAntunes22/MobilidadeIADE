var express = require("express");
var router = express.Router();
const participar = require("../models/participarModel");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  let participars = await participar.select();
  res.send(participars);
});

router.get("/getById/:participars", async function (req, res, next) {
  let participars = await participar.getById(req.params.participars);
  res.send(participars);
});

router.post("/", async function (req, res, next) {
  try {
    let participars = await participar.create(req.body);
    res.send(participars);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put("/:id", async function (req, res, next) {
  console.log(req.body);
  let participar = await participar.update(req.params.id, req.body);
  res.send(participar);
});

router.delete("/:id", async function (req, res, next) {
  let participar = await participar.delete(req.params.id);
  res.send({ rowsAffected: participar });
});

module.exports = router;
