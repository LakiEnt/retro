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



module.exports = {
    showGames: showGames,
}