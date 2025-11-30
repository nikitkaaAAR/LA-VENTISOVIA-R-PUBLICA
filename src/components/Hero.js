const Badge = ({ text }) => React.createElement('span', { className: 'badge' }, text);

const Hero = ({ onNavigate }) =>
const Badge = ({ text }) =>
  React.createElement('span', { className: 'badge' }, text);

const Hero = () =>
  React.createElement(
    'header',
    { className: 'hero' },
    React.createElement(
      'div',
      { className: 'hero__content' },
      React.createElement(Badge, { text: 'Цифровые госуслуги 24/7' }),
      React.createElement(
        'h1',
        null,
        'Все государственные услуги —',
        React.createElement('br', null),
        'в одном месте'
      ),
      React.createElement(
        'p',
        { className: 'hero__lead' },
        'Оформляйте документы, записывайтесь на приём и проверяйте статус заявлений онлайн. Без очередей и сложностей.'
      ),
      React.createElement(
        'div',
        { className: 'hero__actions' },
        React.createElement('button', { className: 'btn btn-primary', onClick: () => onNavigate('requests') }, 'Мои заявки'),
        React.createElement('button', { className: 'btn btn-ghost', onClick: () => onNavigate('help') }, 'Инструкции')
        React.createElement('button', { className: 'btn btn-primary' }, 'Войти'),
        React.createElement('button', { className: 'btn btn-ghost' }, 'Зарегистрироваться')
      ),
      React.createElement(
        'ul',
        { className: 'hero__features' },
        ['Уведомления о статусе', 'Поддержка в чате', 'Быстрый поиск услуг'].map((item) =>
          React.createElement('li', { key: item }, item)
        )
      )
    ),
    React.createElement('div', { className: 'hero__visual' },
      React.createElement('div', { className: 'glass-card' },
        React.createElement('div', { className: 'glass-card__title' }, 'Недавние действия'),
        React.createElement('ul', { className: 'glass-card__list' },
          [
            ['Записались на приём в МФЦ', 'Сегодня, 14:00'],
            ['Проверка статуса паспорта', 'В обработке'],
            ['Оплачена госпошлина', 'Успешно'],
          ].map(([title, subtitle]) =>
            React.createElement('li', { key: title },
              React.createElement('div', { className: 'list-item__title' }, title),
              React.createElement('div', { className: 'list-item__subtitle' }, subtitle)
            )
          )
        )
      )
    )
  );

export default Hero;
