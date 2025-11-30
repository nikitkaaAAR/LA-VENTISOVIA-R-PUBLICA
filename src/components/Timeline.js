const steps = [
  {
    title: 'Авторизация',
    description: 'Войдите через ЕСИА или мобильное приложение. Безопасный вход защищает ваши данные.',
  },
  {
    title: 'Подача заявления',
    description: 'Выберите услугу, заполните данные и приложите документы. Умные подсказки не дадут ошибиться.',
  },
  {
    title: 'Оплата госпошлины',
    description: 'Мгновенная оплата банковскими картами и кошельками. Все квитанции сохраняются в личном кабинете.',
  },
  {
    title: 'Статусы и уведомления',
    description: 'Получайте пуш-уведомления о ходе рассмотрения и забирайте результат онлайн или в МФЦ.',
  },
];

const TimelineItem = ({ title, description, index }) =>
  React.createElement(
    'li',
    { className: 'timeline__item' },
    React.createElement('div', { className: 'timeline__index' }, `0${index + 1}`),
    React.createElement('div', { className: 'timeline__body' },
      React.createElement('h3', null, title),
      React.createElement('p', null, description)
    )
  );

const Timeline = () =>
  React.createElement(
    'section',
    { className: 'timeline' },
    React.createElement('p', { className: 'section__eyebrow' }, 'Как это работает'),
    React.createElement('h2', null, 'Получите услугу в четыре шага'),
    React.createElement('ul', { className: 'timeline__list' },
      steps.map((step, index) => React.createElement(TimelineItem, { key: step.title, index, ...step }))
    )
  );

export default Timeline;
