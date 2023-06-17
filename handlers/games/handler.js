const pool = require('../../db.js')

async function showGames(object) {
  const data = {
      message:    'ERROR',
      statusCode: 400,
  };
  const limit = 10;
  let page = object.page || 1;
  let offset = page * limit - limit;
  let params = [ limit, offset ];
  const query = `SELECT *
           FROM games g
           ORDER BY g."gameName"
           LIMIT $1 OFFSET $2`;

  const client = await pool.connect();
  try {
      const result = await client.query(query, params);
      data.message = { data: result.rows };
      data.statusCode = 200;
  } catch(err) {
      console.error(err.message, err.stack);
  } finally {
      client.release();
      console.log('Release client');
  }
  return data;
}

async function addGame(object) {
  const data = {
    message:    'ERROR',
    statusCode: 400,
  };

  let isBegin = false
  const client = await pool.connect();

  try {
    client.query('BEGIN');
    isBegin = true;

    const addGame = await client.query(`INSERT INTO games ("gameName", "gameDate", "gameDescription", "imageURL")
                                        VALUES ($1, $2, $3, $4)`, [ object.name, object.date, object.description, object.imageURL ]);
    if (addGame.rowCount > 0) {
      client.query('COMMIT');
      isBegin = false
      data.message = 'success';
      data.statusCode = 200;
    }
    else {
      client.query('ROLLBACK');
      isBegin = false;
      console.log('Не удалось добавить новую игру');
      data.message = 'Не удалось добавить новую игру';
    }

  } catch (err) {
    if(isBegin) {
      client.query('ROLLBACK');
    }
    console.error(err.message, err.stack);
  } finally {
    client.release();
    console.log('Release client');
  }

  return data;
}

module.exports = {
    showGames: showGames,
    addGame:   addGame,
}
