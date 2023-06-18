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
    const query = `SELECT u."userNickName",
                          s."speedrunTime",
                          to_char(TO_TIMESTAMP(s."speedrunDate"::double precision / 1000), 'HH24:MI:SS.MS') AS "speedrunDate",
                          u."userCountry"
                   FROM speedruns s
                          INNER JOIN users u on u."userId" = s."speedrunUser"
                          INNER JOIN games g on g."gameId" = s."speedrunGame"
                   WHERE g."gameId" = $1 AND s."speedrunStatus" = $2
                   ORDER BY s."speedrunTime"
                   LIMIT $3 OFFSET $4`;

    const result = await client.query(query, params);
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

module.exports = {
  showSpeedruns: showSpeedruns
}
