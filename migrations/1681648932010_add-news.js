exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('news', {
        newsId: {
            type: 'bigserial',
            primaryKey: true
        },
        newsText: {
            type: 'varchar(10000)',
            notNull: true
        },
        newsUser: {
            type: 'bigserial',
            references: 'users',
            referencesConstraintName: 'news_users_userid_fk',
            notNull: true,
        }
    }, {
        ifNotExists: true
    });
};

exports.down = pgm => { };
