exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addColumns('users', {
        uuid: {
            type: 'string',
        },
        
    }, {
        ifNotExists: true
    });
};

exports.down = pgm => { };
