import React from 'react';

const Navigation = ({ activePage, onNavigate, requestsCount }) =>
  React.createElement(
    'nav',
    { className: 'nav' },
    React.createElement('div', { className: 'nav__logo' }, 'Госуслуги'),
    React.createElement(
      'div',
      { className: 'nav__links' },
      [
        ['home', 'Главная'],
        ['requests', `Заявки${requestsCount ? ` (${requestsCount})` : ''}`],
        ['help', 'Помощь'],
      ].map(([key, label]) =>
        React.createElement(
          'button',
          {
            key,
            type: 'button',
            className: `nav__link ${activePage === key ? 'is-active' : ''}`,
            onClick: () => onNavigate(key),
          },
          label
        )
      )
    )
  );

export default Navigation;
