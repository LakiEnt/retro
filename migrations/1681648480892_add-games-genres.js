exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('games_genres', {
        gameId: {
            type: 'bigserial',
            references: 'games',
            referencesConstraintName: 'games_genres_games_gameid_fk',
        },
        genreId: {
            type: 'serial',
            references: 'genres',
            referencesConstraintName: 'games_genres_genres_genreid_fk',
        }
    }, {
        ifnotExists: true
    });
};

exports.down = pgm => { };
