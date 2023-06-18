/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('speedruns', {
        speedrunId: {
            type: 'bigserial',
            primaryKey: true,
        },
        speedrunUser: {
            type: 'integer',
            references: 'users',
            referencesConstraintName: 'speedruns_users_userid_fk',
            notNull: true,
        },
        speedrunGame: {
            type: 'integer',
            references: 'games',
            referencesConstraintName: 'speedruns_games_gameid_fk',
            notNull: true,
        },
        speedrunTime: {
            type: 'bigint',
            notNull: true,
        },
        speedrunUrl: {
            type: 'varchar(1000)',
            notNull: true
        },
    }, {
        ifnotExists: true
    });
};

exports.down = pgm => { };
