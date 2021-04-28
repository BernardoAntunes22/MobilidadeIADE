var pool = require('./connection');



module.exports.selectByName = async (name) => {
    try {
        const admin = await pool.query('SELECT * FROM Administrador WHERE A_nome = ?', name);
        return admin;
    }
    catch (err) {
        console.log('An errror has occured while trying to SELECT FROM Administradors.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
    
};