exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('genres', {
        genreId: {
            type: 'serial',
            primaryKey: true
        },
        genreValue: {
            type: 'varchar(100)',
            notNull: true,
            unique: true
        }
    }, {
        ifNotExists: true
    });
    pgm.sql('INSERT INTO public.genres ("genreValue") VALUES (\'Платформер\');');
    pgm.sql('INSERT INTO public.genres ("genreValue") VALUES (\'Шутер\');');
    pgm.sql('INSERT INTO public.genres ("genreValue") VALUES (\'Стратегия\');');
};

exports.down = pgm => { };
