var express = require("express");
var router = express.Router();
const Ride = require("../models/rideModel");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  let rides = await Ride.select();
  res.send(rides);
});

router.post("/", async function (req, res, next) {
  try {
    let rides = await Ride.create(req.body);
    res.send(rides);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put("/:id", async function (req, res, next) {
  console.log(req.body);
  let ride = await Ride.update(req.params.id, req.body);
  res.send(ride);
});

router.delete("/:id", async function (req, res, next) {
  let ride = await Ride.delete(req.params.id);
  res.send({ rowsAffected: ride });
});

module.exports = router;
