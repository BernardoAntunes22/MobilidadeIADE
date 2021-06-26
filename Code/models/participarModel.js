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

module.exports.getRideById = async (id) => {
  try {
    let res = await pool.query("SELECT * FROM Participar as P inner join Ride as R on R.Ride_id = P.Ride_id where P.P_estado = 'Aceite-Pendente' and P.C_id = ?", id);
    return res;
  } catch (err) {
    console.log(
      "An errror has occured while trying to SELECT FROM Participars.\n Dumping Stack.\n",
      err.stack
    );
    return err.message;
  }
};

module.exports.getFullInf = async (id) => {
  try {
    let res = await pool.query("SELECT * FROM Participar as P inner join Ride as R on R.Ride_id = P.Ride_id inner join Cliente as C on P.C_id = C.C_id where P.P_estado = 'Pendente' and P.Ride_id = ?", id);
    return res;
  } catch (err) {
    console.log(
      "An errror has occured while trying to SELECT FROM Participars.\n Dumping Stack.\n",
      err.stack
    );
    return err.message;
  }
};

module.exports.getRideByParticipated = async (id) => {
  try {
    let res = await pool.query("SELECT * FROM Participar as P inner join Ride as R on R.Ride_id = P.Ride_id where P.Ride_id = ?", id);
    return res;
  } catch (err) {
    console.log(
      "An errror has occured while trying to SELECT FROM Participars.\n Dumping Stack.\n",
      err.stack
    );
    return err.message;
  }
};

module.exports.accepted = async (id) => {
  try {
    let res = await pool.query("SELECT * FROM Participar as P inner join Ride as R on R.Ride_id = P.Ride_id inner join Cliente as C on P.C_id = C.C_id where P.P_estado = 'Aceite-confirmado' and P.C_id = ?", id);
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
      let res = await pool.query('INSERT INTO Participar (P_lat, P_long, P_estado, P_date, Ride_id, C_id) values(?,?,?,?,?,?) ', [participar.P_lat, participar.P_long, participar.P_estado, participar.P_date, participar.Ride_id, participar.C_id]);
      return res;
  }
  catch (err) {
      console.log('An errror has occured while trying to INSERT into Participars.\n Dumping Stack.\n', err.stack);
      return err.message;
  }
};


module.exports.update = async (id, participar) => {
  try {
      let res = await pool.query('UPDATE Participar SET P_estado = ?, P_date = ? WHERE P_id = ?', [participar.P_estado, participar.P_date, id]);
      return res;
  }
  catch (err) {
      console.log('An errror has occured while trying to Update into Participars.\n Dumping Stack.\n', err.stack);
      return err.message;
  }
};

/*module.exports.update = async (id, participar) => {
  try {
    let keys = Object.keys(participar);
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
};*/

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
