const bcrypt = require('bcrypt');
const crypto = require('crypto');
const pool = require('../../db.js');
const mailer = require('../../services/mailer');

async function auth(object) {
  const data = {
      message:    'ERROR',
      statusCode: 400,
  };

  const password = object.password;
  const nickName = object.nickName;
  const params = [ nickName ];

  const client = await pool.connect();

    try {
      const query = `SELECT u."userPassword"
               FROM users u
               WHERE u."userNickName" = $1` ;
      const result = await client.query(query, params);

      const isSuccess = await bcrypt.compare(password, result.rows[0].userPassword).then(function(result) {
        console.log(result)
        return result;
      });
      if (isSuccess) {
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

async function register (object) {
    const data = {
        message:    'ERROR',
        statusCode: 400,
    };

    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(object.userPassword, 10, function(err, hash) {
          if (err) {
            console.log('Ошибка при хэшировании пароля');
            reject(err)
          };
          resolve(hash);
        });
    });

    let isBegin = false;

    const client = await pool.connect();
    const token = crypto.randomBytes(32).toString("hex");

    try {
      client.query('BEGIN');
      isBegin = true;

      const getUser = await client.query(`SELECT *
                                          FROM users u
                                          WHERE u."userNickName" = $1 OR u."userEmail" = $2`, [ object.userNickName, object.userEmail ]);
      if (getUser.rowCount > 0) {
        console.log('Ошибка при регестрации. Никнейм или почта заняты');
        data.message = 'Никнейм или аочта заняты';
        return data;
      }

      const addUser = await client.query(`INSERT INTO users ("userNickName", "userEmail", "userPassword", "userCountry", "uuid")
                                          VALUES ($1, $2, $3, $4, $5)
                                          RETURNING "userId"`, [ object.userNickName, object.userEmail, hashedPassword, object.userCountry, token ]);
      if (addUser.rowCount > 0) {
        const userId = addUser.rows[0].userId;
        const message = `${ process.env.EMAIL_BASEURL }/auth/verify/${ userId }/${ token }`;
        console.log(message)
        const isEmailSuccess = await mailer.sendEmail(object.userEmail, 'verify email', message);

        if (isEmailSuccess) {
          client.query('COMMIT');
          isBegin = false
          data.message = 'success';
          data.statusCode = 200;
        }
        else {
            console.log('Не удалось отправить email');
        }
      }
      else {
        client.query('ROLLBACK');
        isBegin = false;
        console.log('Не удалось добавить нового пользователя');
        data.message = 'Не удалось добавить нового пользователя';
      }
    } catch (err) {
      if (isBegin) {
        client.query('ROLLBACK');
      }
      console.error(err.message, err.stack);
    } finally {
      client.release();
      console.log('Release client');
    }

  return data;
}

async function verify (object) {
    const data = {
        message:    'ERROR',
        statusCode: 400,
    };

    const client = await pool.connect();

    try {
        const checkUser = await client.query(`SELECT * FROM users u
                                              WHERE u."userId" = $1
                                              AND u."uuid" = $2
                                              AND u."userVerify" = false`, [ object.userId, object.token ]);

        if (checkUser.rowCount > 0) {
            const changeUserStatus = await client.query(`UPDATE users SET "userRole" = 3, "userVerify" = true
                                                         WHERE "userId" = $1`, [ object.userId ]);
            if (changeUserStatus.rowCount > 0) {
                data.message = 'success';
                data.statusCode = 200;
            }
            else {
                console.log('Не удалось изменить статус юзера');
            }
        }
        else {
            console.log('Не удалось верифицировать юзера');
        }

    } catch (err) {
        console.error(err.message, err.stack);
    } finally {
        client.release();
        console.log('Release client');
    }

    return data;
};

module.exports = {
    auth:     auth,
    register: register,
    verify:   verify,
}
