exports.shorthands = undefined;

exports.up = pgm => {
    pgm.alterColumn( 'users', 'userRole', { default: 4 } );
};

exports.down = pgm => { };
