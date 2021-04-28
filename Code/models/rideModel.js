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

module.exports.create = async (ride) => {
  try {
    let res = await pool.query("INSERT INTO Reserva SET ?", ride);
    return { C_id: res.insertId, ...ride };
  } catch (err) {
    console.log(
      "An errror has occured while trying to INSERT into Reservas.\n Dumping Stack.\n",
      err.stack
    );
  }
};

module.exports.update = async (id, ride) => {
  try {
    let keys = Object.keys(ride);
    let vals = Object.values(ride);
    let indexId = keys.indexOf("M_id");
    if (indexId != -1) {
      keys.splice(indexId, 1);
      vals.splice(indexId, 1);
    }
    let res = await pool.query(
      "UPDATE Ride SET " + keys.join(" = ? ,") + " = ? WHERE M_id = ?",
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
    let res = await pool.query("DELETE FROM Ride WHERE M_id = ?", id);
    return res.affectedRows;
  } catch (err) {
    console.log(
      "An errror has occured while trying to DELETE FROM Rides.\n Dumping Stack.\n",
      err.stack
    );
    return err.message;
  }
};
