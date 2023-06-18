/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.addColumns('speedruns', {
    speedrunStatus: {
      type: 'integer',
      default: 1,
    },
    speedrunDate: {
      type: 'date',
      default: pgm.func('now()'),
    },
  }, {
    ifNotExists: true
  });
};

exports.down = pgm => {};
