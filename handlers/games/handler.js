const pool = require('../../db.js')
const constants = require('../../services/constants')

async function showGames(object) {
  const data = {
      message:    'ERROR',
      statusCode: 400,
  };
  const limit = 16;
  let page = object.page || 1;
  let offset = page * limit - limit;
  let params = [ limit, offset ];
  let genreId;

  const client = await pool.connect();
  try {
    const getRowCount = await client.query(`SELECT * FROM games`, []);
    const query = `SELECT g."gameId", g."gameName", to_char(g."gameDate", 'dd.mm.yyyy') AS "gameDate", g."gameDescription", g."imageURL"
                   FROM games g
                   ORDER BY g."gameName"
                   LIMIT $1 OFFSET $2`;

    const result = await client.query(query, params);
    for (let game of result.rows) {
      game.genres = [];
      const getGenres = await client.query(`SELECT gg."genreId"
                                            FROM games_genres gg
                                            WHERE "gameId" = $1`, [ game.gameId ]);
      if (getGenres.rowCount > 0) {
        for (const genre of getGenres.rows) {
          if (genre.genreId in constants.gameGenres) {
            game.genres.push(constants.gameGenres[genre.genreId]);
          }
        }
      }
      else {
        console.log(`Жанры для игры ${ game.gameName } (${ game.gameId }) не найдены`);
      }
    }
    data.rowCount = getRowCount.rowCount;
    data.message = result.rows;
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
                                        VALUES ($1, $2, $3, $4)
                                        RETURNING "gameId"`, [ object.name, object.date, object.description, object.imageURL ]);
    const gameId = addGame.rows[0].gameId;

    let isSuccessGenre = true;
    for (const genre of object.genres) {
      if (genre in constants.gameGenres) {
        const genreId = constants.gameGenres[genre];
        const addGameGenre = await client.query(`INSERT INTO games_genres ("gameId", "genreId") VALUES ($1, $2)`, [ gameId, genreId ]);
        if (addGameGenre.rowCount === 0) {
          console.log('Не удалось добавить жанр к игре');
          isSuccessGenre = false;
          break;
        }
      }
      else {
        console.log(`Жанр ${ genre } не найден`);
        isSuccessGenre = false;
        break;
      }
    }

    if (addGame.rowCount > 0 && isSuccessGenre) {
      client.query('COMMIT');
      isBegin = false
      data.message = 'success';
      data.statusCode = 200;
    }
    else {
      client.query('ROLLBACK');
      isBegin = false;
      if (!isSuccessGenre) {
        console.log('Не удалось добавить новую игру. Ошибка в жанрах');
        data.message = 'Не удалось добавить новую игру. Ошибка в жанрах';
      }
      else {
        console.log('Не удалось добавить новую игру');
        data.message = 'Не удалось добавить новую игру';
      }
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

async function showGame(object) {
  const data = {
    message:    'ERROR',
    statusCode: 400,
  };

  const client = await pool.connect();
  try {
    const query = `SELECT g."gameId", g."gameName", to_char(g."gameDate", 'dd.mm.yyyy') AS "gameDate", g."gameDescription", g."imageURL"
                   FROM games g
                   WHERE g."gameId" = $1
                   ORDER BY g."gameName"`;

    const result = await client.query(query, [ object.gameId ]);
    if (result.rowCount > 0) {
      result.rows[0].genres = [];
      const getGenres = await client.query(`SELECT gg."genreId"
                                          FROM games_genres gg
                                          WHERE "gameId" = $1`, [ result.rows[0].gameId ]);
      if (getGenres.rowCount > 0) {
        for (const genre of getGenres.rows) {
          if (genre.genreId in constants.gameGenres) {
            result.rows[0].genres.push(constants.gameGenres[genre.genreId]);
          }
        }
      }
      else {
        console.log(`Жанры для игры ${ result.rows[0].gameName } (${ result.rows[0].gameId }) не найдены`);
      }
      data.message = result.rows[0];
      data.statusCode = 200;
    }
    else {
      console.log(`Игра (id: ${ object.gameId }) не найдена`);
      data.message = `Игра (id: ${ object.gameId }) не найдена`;
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
  showGames: showGames,
  addGame:   addGame,
  showGame:  showGame,
}
