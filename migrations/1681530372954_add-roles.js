exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('roles', {
        roleId: {
            type: 'serial',
            primaryKey: true,
        },
        roleValue: {
            type: 'varchar(100)',
            notNull: true,
            unique: true
        },
    }, {
        ifNotExists: true
    });
    pgm.sql('INSERT INTO public.roles ("roleValue") VALUES (\'Администратор\');');
    pgm.sql('INSERT INTO public.roles ("roleValue") VALUES (\'Модератор\');');
    pgm.sql('INSERT INTO public.roles ("roleValue") VALUES (\'Верифицированный пользователь\');');
    pgm.sql('INSERT INTO public.roles ("roleValue") VALUES (\'Неверифицированный пользователь\');');
};

exports.down = pgm => { };
