const pool = require('../../db.js')
const constants = require('../../services/constants')


async function showMain() {
  const data = {
    message:    'ERROR',
    statusCode: 400,
  };

  const client = await pool.connect();
  try {
    const getLastSpeedrun = await client.query(`SELECT s."speedrunId",
                                                       u."userNickName",
                                                       to_char(TO_TIMESTAMP(s."speedrunTime"::double precision / 1000), 'HH24:MI:SS.MS') AS "speedrunTime",
                                                       to_char(s."speedrunDate", 'dd.mm.yyyy')                                           AS "speedrunDate",
                                                       u."userCountry",
                                                       s."speedrunUrl"
                                                FROM speedruns s
                                                       INNER JOIN users u on u."userId" = s."speedrunUser"
                                                WHERE s."speedrunStatus" = $1
                                                ORDER BY s."speedrunDate"
                                                LIMIT 1`, [constants.speedrunStatuses.Одобрен]);

    if (getLastSpeedrun.rowCount === 0) {
      console.log('Последний спидран не найден');
    }

    const getAllGames = await client.query(`SELECT * FROM games`, []);
    if (getAllGames.rowCount === 0) {
      console.log('Количество доступных игр на сайте не найдено');
    }

    const getRandomGame = await client.query(`SELECT * FROM games ORDER BY RANDOM() LIMIT 1`, []);
    if (getAllGames.rowCount === 0) {
      console.log('Игра дня не найдена');
    }

    data.message = {
      lastSpeedRun:  getLastSpeedrun.rows[0],
      allGamesCount: getAllGames.rowCount,
      gameOfDay:     getRandomGame.rows[0],
    }
    data.statusCode = 200;
  } catch(err) {
    console.error(err.message, err.stack);
  } finally {
    client.release();
    console.log('Release client');
  }
  return data;
}

module.exports = {
  showMain: showMain,
}
