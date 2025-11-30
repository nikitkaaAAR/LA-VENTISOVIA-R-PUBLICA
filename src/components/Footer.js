const Footer = () =>
  React.createElement(
    'footer',
    { className: 'footer' },
    React.createElement('div', { className: 'footer__logo' }, 'Госуслуги'),
    React.createElement(
      'div',
      { className: 'footer__links' },
      ['О проекте', 'Безопасность', 'Поддержка', 'Мобильное приложение'].map((item) =>
        React.createElement('a', { key: item, href: '#', className: 'link' }, item)
      )
    ),
    React.createElement('p', { className: 'footer__meta' }, 'Работаем для людей. 2025 © Госуслуги')
  );

export default Footer;
