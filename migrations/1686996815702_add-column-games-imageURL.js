/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.addColumns('games', {
    imageURL: {
      type: 'string',
    },
  }, {
    ifNotExists: true
  });
};

exports.down = pgm => {};
