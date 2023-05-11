const pool = require('../../db.js')
const bcrypt = require('bcrypt');

async function auth(object) {
    const data = {
        message:    'ERROR',
        statusCode: 400,
    };

    const password = object.password;
    console.log(password);
    const nickName = object.nickName;
    const params = [ nickName ]

    const query = `SELECT u."userPassword" 
               FROM users u
               WHERE u."userNickName" = $1` ;
    const client = await pool.connect();

    try {
        const result = await client.query(query, params);
        console.log(result.rows[0]);
        if (bcrypt.compareSync(password, result.rows[0].userPassword)) {
            data.message = 'success';
            data.statusCode = 200;
        }
        else {
            data.message = 'Wrong password';
        }
    } catch(err) {
        console.error(err.message, err.stack);
    } finally {
        client.release();
        console.log('Release client');
    }

    return data;
};

module.exports = {
    auth: auth,
    test: test
}