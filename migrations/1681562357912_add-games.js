exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('games', {
        gameId: {
            type: 'bigserial',
            primaryKey: true
        },
        gameName: {
            type: 'varchar(100)',
            notNull: true
        },
        gameDate: {
            type: 'date',
        },
        gameDescription: {
            type: 'varchar(1000)',
        }
    }, {
        ifNotExists: true
    });
};

exports.down = pgm => { };
