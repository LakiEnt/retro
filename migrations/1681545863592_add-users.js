exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('users', {
        userId: {
            type: 'bigserial',
            primaryKey: true,
        },
        userNickName: {
            type: 'varchar(50)',
            unique: true,
        },
        userEmail: {
            type: 'varchar(100)',
        },
        userPassword: {
            type: 'varchar(250)',
        },
        userRole: {
            type: 'integer',
            references: 'roles',
            referencesConstraintName: 'users_roles_roleid_fk',
            default: 3
        },
        userCountry: {
            type: 'varchar(250)'
        },
        userVerify: {
            type: 'boolean',
            default: false,
            comment: 'Пользователь не подтвердил почту',
        },
    }, {
        ifNotExists: true,
    });
    pgm.sql('INSERT INTO public.users ("userNickName", "userEmail", "userPassword", "userRole", "userCountry", "userVerify") VALUES (\'Antzu_\', \'antzu2002@gmail.com\', \'$2b$10$HI10bChAvcsCatUvnvYFOejcy2ltzmE3CBL/sHm7NrBqaeT8tVyEu\', 1, \'Russian Federation\', true);')
};

exports.down = pgm => { };
