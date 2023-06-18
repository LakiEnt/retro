

const gameGenres = {
  1: 'Платформер',
  2: 'Шутер',
  3: 'Стратегия',
  4: 'Пошаговая',

  'Платформер': 1,
  'Шутер':      2,
  'Стратегия':  3,
  'Пошаговая':  4,
};

const speedrunStatuses = {
  1: 'На рассмотрении',
  2: 'Одобрен',
  3: 'Отклонён',

  'На рассмотрении': 1,
  'Одобрен':         2,
  'Отклонён':        3,
}

module.exports = {
  gameGenres:       gameGenres,
  speedrunStatuses: speedrunStatuses,
}
