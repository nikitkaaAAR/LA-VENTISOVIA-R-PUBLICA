const ServiceCard = ({ title, description, action, onOpen }) =>
const services = [
  {
    title: 'Паспорта и документы',
    description: 'Подайте заявку на паспорт, загранпаспорт или восстановление документов.',
    action: 'Оформить',
  },
  {
    title: 'Транспорт и штрафы',
    description: 'Оплачивайте штрафы ГИБДД, налоги, оформляйте ОСАГО онлайн.',
    action: 'Проверить штрафы',
  },
  {
    title: 'Здоровье',
    description: 'Запись к врачу, электронные карты, результаты анализов.',
    action: 'Записаться к врачу',
  },
  {
    title: 'Соцподдержка',
    description: 'Пособия, маткапитал, выплаты семьям и льготникам.',
    action: 'Узнать о выплатах',
  },
  {
    title: 'Образование',
    description: 'Запись в детский сад и школу, электронный дневник, аттестаты.',
    action: 'Перейти в раздел',
  },
  {
    title: 'МФЦ онлайн',
    description: 'Получайте услуги МФЦ удалённо и отслеживайте статус заявлений.',
    action: 'Открыть услуги',
  },
];

const ServiceCard = ({ title, description, action }) =>
  React.createElement(
    'article',
    { className: 'card' },
    React.createElement('h3', null, title),
    React.createElement('p', null, description),
    React.createElement('div', { className: 'card__actions' },
      React.createElement('button', { className: 'btn btn-secondary', onClick: onOpen }, action),
      React.createElement('button', { className: 'btn btn-ghost', onClick: onOpen }, 'Подробнее')
    )
  );

const ServiceGrid = ({ services, onSelectService }) =>
  React.createElement(
    'section',
    { className: 'services', id: 'all-services' },
    React.createElement(
      'div',
      { className: 'section__header' },
      React.createElement(
        'div',
        null,
    React.createElement('button', { className: 'btn btn-secondary' }, action)
  );

const ServiceGrid = () =>
  React.createElement(
    'section',
    { className: 'services' },
    React.createElement('div', { className: 'section__header' },
      React.createElement('div', null,
        React.createElement('p', { className: 'section__eyebrow' }, 'Популярные сервисы'),
        React.createElement('h2', null, 'Выберите нужную услугу')
      ),
      React.createElement('a', { href: '#all-services', className: 'link' }, 'Смотреть все')
    ),
    React.createElement(
      'div',
      { className: 'services__grid' },
      services.length
        ? services.map((service) =>
            React.createElement(ServiceCard, { key: service.id, ...service, onOpen: () => onSelectService(service.id) })
          )
        : React.createElement(
            'p',
            { className: 'services__empty' },
            'Услуги по запросу не найдены. Попробуйте другой поиск или выберите тег выше.'
          )
      services.map((service) => React.createElement(ServiceCard, { key: service.title, ...service }))
    )
  );

export default ServiceGrid;
