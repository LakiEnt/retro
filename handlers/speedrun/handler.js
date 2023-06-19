const pool = require('../../db.js');
const constants = require('../../services/constants')

async  function showSpeedruns(object) {
  const data = {
    message:    'ERROR',
    statusCode: 400,
  };
  const limit = 25;
  let page = object.page || 1;
  let offset = page * limit - limit;
  let params = [ object.gameId, constants.speedrunStatuses.Одобрен, limit, offset ];

  const client = await pool.connect();
  try {
    const getRowCount = await client.query(`SELECT * FROM speedruns s WHERE s."speedrunGame" = $1 AND s."speedrunStatus" = $2`, [ object.gameId, constants.speedrunStatuses.Одобрен]);
    const query = `SELECT s."speedrunId",
                          u."userNickName",
                          to_char(TO_TIMESTAMP(s."speedrunTime"::double precision / 1000), 'HH24:MI:SS.MS') AS "speedrunTime",
                          to_char(s."speedrunDate", 'dd.mm.yyyy')                                           AS "speedrunDate",
                          u."userCountry",
                          s."speedrunUrl"
                   FROM speedruns s
                          INNER JOIN users u on u."userId" = s."speedrunUser"
                   WHERE s."speedrunGame" = $1 AND s."speedrunStatus" = $2
                   ORDER BY s."speedrunTime"
                   LIMIT $3 OFFSET $4`;

    const result = await client.query(query, params);
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

async function addSpeedrun(object) {
  const data = {
    message:    'ERROR',
    statusCode: 400,
  };

  let isBegin = false
  const client = await pool.connect();

  try {
    client.query('BEGIN');
    isBegin = true;

    const addSpeedrun = await client.query(`INSERT INTO speedruns ("speedrunUser", "speedrunGame", "speedrunTime", "speedrunUrl")
                                        VALUES ($1, $2, $3, $4)`, [ object.speedrunUser, object.speedrunGame, object.speedrunTime, object.speedrunUrl ]);

    if (addSpeedrun.rowCount > 0) {
      client.query('COMMIT');
      isBegin = false
      data.message = 'success';
      data.statusCode = 200;
    }
    else {
      client.query('ROLLBACK');
      isBegin = false;
      console.log('Не удалось добавить спидран в базу');
      data.message = 'Не удалось добавить спидран в базу';
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
  showSpeedruns: showSpeedruns,
  addSpeedrun:   addSpeedrun,
}
