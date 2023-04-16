exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('users_games', {
        userId: {
            type: 'bigserial',
            references: 'users',
            referencesConstraintName: 'users_games_users_userid_fk',
        },
        gameId: {
            type: 'bigserial',
            references: 'games',
            referencesConstraintName: 'users_games_games_gameid_fk',
        },
    }, {
        ifnotExists: true
    });
};

exports.down = pgm => { };
