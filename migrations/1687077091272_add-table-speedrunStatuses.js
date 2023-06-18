/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('speedrunStatuses', {
    statusId: {
      type: 'serial',
      primaryKey: true,
    },
    statusValue: {
      type: 'varchar(100)',
      notNull: true,
      unique: true
    },
  }, {
    ifNotExists: true
  });
  pgm.sql('INSERT INTO public."speedrunStatuses" ("statusValue") VALUES (\'На рассмотрении\');');
  pgm.sql('INSERT INTO public."speedrunStatuses" ("statusValue") VALUES (\'Одобрен\');');
  pgm.sql('INSERT INTO public."speedrunStatuses" ("statusValue") VALUES (\'Отклонён\');');
};

exports.down = pgm => {};
