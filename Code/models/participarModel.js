var pool = require("./connection");

module.exports.select = async () => {
  try {
    let res = await pool.query("SELECT * FROM Participar");
    return res;
  } catch (err) {
    console.log(
      "An errror has occured while trying to SELECT FROM Participars.\n Dumping Stack.\n",
      err.stack
    );
    return err.message;
  }
};

module.exports.getById = async (id) => {
  try {
    let res = await pool.query("SELECT * FROM Participar where C_id = ?", id);
    return res;
  } catch (err) {
    console.log(
      "An errror has occured while trying to SELECT FROM Participars.\n Dumping Stack.\n",
      err.stack
    );
    return err.message;
  }
};

module.exports.create = async (participar) => {
  try {
      let res = await pool.query('INSERT INTO Participar (P_lat, P_long, Ride_id, C_id) values(?,?,?,?) ', [participar.P_lat, participar.P_long, participar.Ride_id, participar.C_id]);
      return res;
  }
  catch (err) {
      console.log('An errror has occured while trying to INSERT into Participars.\n Dumping Stack.\n', err.stack);
      return err.message;
  }
};

module.exports.update = async (id, participar) => {
  try {
    let keys = Object.keys(participar);nom
    let vals = Object.values(participar);
    let indexId = keys.indexOf("R_id");
    if (indexId != -1) {
      keys.splice(indexId, 1);
      vals.splice(indexId, 1);
    }
    let res = await pool.query(
      "UPDATE Participar SET " + keys.join(" = ? ,") + " = ? WHERE R_id = ?",
      [...vals, id]
    );
    if (res.affectedRows == 0) return "No Participars updated";
    else return "Participars updated.";
  } catch (err) {
    console.log(
      "An errror has occured while trying to UPDATE Participars.\n Dumping Stack.\n",
      err.stack
    );
    return err.message;
  }
};

module.exports.delete = async (id) => {
  try {
    let res = await pool.query("DELETE FROM Participar WHERE R_id = ?", id);
    return res.affectedRows;
  } catch (err) {
    console.log(
      "An errror has occured while trying to DELETE FROM Participars.\n Dumping Stack.\n",
      err.stack
    );
    return err.message;
  }
};
