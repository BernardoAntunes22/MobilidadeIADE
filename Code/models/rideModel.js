var pool = require("./connection");

module.exports.select = async () => {
  try {
    let res = await pool.query("SELECT * FROM Ride");
    return res;
  } catch (err) {
    console.log(
      "An errror has occured while trying to SELECT FROM Rides.\n Dumping Stack.\n",
      err.stack
    );
    return err.message;
  }
};

module.exports.getById = async (id) => {
  try {
    let res = await pool.query("SELECT * FROM Ride where C_id = ?", id);
    return res;
  } catch (err) {
    console.log(
      "An errror has occured while trying to SELECT FROM Rides.\n Dumping Stack.\n",
      err.stack
    );
    return err.message;
  }
};

module.exports.getByRide = async (id) => {
  try {
    let res = await pool.query("SELECT * FROM Ride where Ride_id = ?", id);
    return res;
  } catch (err) {
    console.log(
      "An errror has occured while trying to SELECT FROM Rides.\n Dumping Stack.\n",
      err.stack
    );
    return err.message;
  }
};



module.exports.create = async (ride) => {
  try {
      let res = await pool.query('INSERT INTO Ride (DateS, HourS, R_lat, R_long, nPassengers, matriculaC, C_id) values(?,?,?,?,?,?,?) ', [ride.DateS, ride.HourS, ride.R_lat, ride.R_long, ride.nPassengers, ride.matriculaC, ride.C_id]);
      return res;
  }
  catch (err) {
      console.log('An errror has occured while trying to INSERT into Reservas.\n Dumping Stack.\n', err.stack);
      return err.message;
  }
};

module.exports.update = async (id, ride) => {
  try {
    let keys = Object.keys(ride);nom
    let vals = Object.values(ride);
    let indexId = keys.indexOf("R_id");
    if (indexId != -1) {
      keys.splice(indexId, 1);
      vals.splice(indexId, 1);
    }
    let res = await pool.query(
      "UPDATE Ride SET " + keys.join(" = ? ,") + " = ? WHERE R_id = ?",
      [...vals, id]
    );
    if (res.affectedRows == 0) return "No Rides updated";
    else return "Rides updated.";
  } catch (err) {
    console.log(
      "An errror has occured while trying to UPDATE Rides.\n Dumping Stack.\n",
      err.stack
    );
    return err.message;
  }
};

module.exports.delete = async (id) => {
  try {
    let res = await pool.query("DELETE FROM Ride WHERE R_id = ?", id);
    return res.affectedRows;
  } catch (err) {
    console.log(
      "An errror has occured while trying to DELETE FROM Rides.\n Dumping Stack.\n",
      err.stack
    );
    return err.message;
  }
};
