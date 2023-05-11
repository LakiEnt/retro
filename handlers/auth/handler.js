const pool = require('../../db.js')
const bcrypt = require('bcrypt');

async function auth(object) {
    const data = {
        message:    'ERROR',
        statusCode: 400,
    };

    const password = object.password;
    const nickName = object.nickName;

    const query = `SELECT u."userPassword" 
               FROM users u
               WHERE u."userNickName" = $1` ;
    const client = await pool.connect();

    try {
        const result = await client.query(query, nickName);
        if (bcrypt.compareSync(password, result.rows[0].userPassword)) {
            data.message = 'success';
            data.statusCode = 200;
        }
    } catch(err) {
        console.error(err.message, err.stack);
    } finally {
        client.release();
        console.log('Release client');
    }

    return data;
}

module.exports = {
    auth: auth
}