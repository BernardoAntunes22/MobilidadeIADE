var pool = require("./connection");

module.exports.select = async () => {
  try {
    let res = await pool.query("SELECT * FROM Cliente");
    return res;
  } catch (err) {
    console.log(
      "An errror has occured while trying to SELECT FROM Clientes.\n Dumping Stack.\n",
      err.stack
    );
    return err.message;
  }
};

module.exports.selectByName = async (name) => {
  try {
      const cliente = await pool.query('SELECT * FROM Cliente WHERE C_Name = ?', name);
      return cliente;
  }
  catch (err) {
      console.log('An error has occured while trying to SELECT FROM Clientes.\n Dumping Stack.\n', err.stack);
      return err.message;
  }
};

module.exports.getById = async (id) => {
  try {
      const cliente = await pool.query('SELECT * FROM Cliente as C inner join Cod_Post as CP on C.C_id = CP.C_id WHERE C.C_id = 1 ?', id);
      return cliente;
  }
  catch (err) {
      console.log('An error has occured while trying to SELECT FROM Clientes.\n Dumping Stack.\n', err.stack);
      return err.message;
  }
};

module.exports.create = async (cliente) => {
  try {
    let res = await pool.query("INSERT INTO Reserva SET ?", cliente);
    return { C_id: res.insertId, ...cliente };
  } catch (err) {
    console.log(
      "An errror has occured while trying to INSERT into Reservas.\n Dumping Stack.\n",
      err.stack
    );
  }
};

module.exports.update = async (id, cliente) => {
  try {
    let keys = Object.keys(cliente);
    let vals = Object.values(cliente);
    let indexId = keys.indexOf("M_id");
    if (indexId != -1) {
      keys.splice(indexId, 1);
      vals.splice(indexId, 1);
    }
    let res = await pool.query(
      "UPDATE Cliente SET " + keys.join(" = ? ,") + " = ? WHERE M_id = ?",
      [...vals, id]
    );
    if (res.affectedRows == 0) return "No Clientes updated";
    else return "Clientes updated.";
  } catch (err) {
    console.log(
      "An errror has occured while trying to UPDATE Clientes.\n Dumping Stack.\n",
      err.stack
    );
    return err.message;
  }
};

module.exports.delete = async (id) => {
  try {
    let res = await pool.query("DELETE FROM Cliente WHERE M_id = ?", id);
    return res.affectedRows;
  } catch (err) {
    console.log(
      "An errror has occured while trying to DELETE FROM Clientes.\n Dumping Stack.\n",
      err.stack
    );
    return err.message;
  }
};
