const ServiceCard = ({ title, description, action }) =>
  React.createElement(
    'article',
    { className: 'card' },
    React.createElement('h3', null, title),
    React.createElement('p', null, description),
    React.createElement('button', { className: 'btn btn-secondary' }, action)
  );

const ServiceGrid = ({ services }) =>
  React.createElement(
    'section',
    { className: 'services' },
    React.createElement(
      'div',
      { className: 'section__header' },
      React.createElement(
        'div',
        null,
        React.createElement('p', { className: 'section__eyebrow' }, 'Популярные сервисы'),
        React.createElement('h2', null, 'Выберите нужную услугу')
      ),
      React.createElement('a', { href: '#all-services', className: 'link' }, 'Смотреть все')
    ),
    React.createElement(
      'div',
      { className: 'services__grid' },
      services.length
        ? services.map((service) => React.createElement(ServiceCard, { key: service.title, ...service }))
        : React.createElement(
            'p',
            { className: 'services__empty' },
            'Услуги по запросу не найдены. Попробуйте другой поиск или выберите тег выше.'
          )
    )
  );

export default ServiceGrid;
