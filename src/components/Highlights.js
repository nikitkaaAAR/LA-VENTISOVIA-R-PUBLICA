import React from 'react';

const Highlight = ({ title, description, accent }) =>
  React.createElement(
    'article',
    { className: 'highlight' },
    React.createElement('div', { className: 'highlight__accent' }, accent),
    React.createElement('h3', null, title),
    React.createElement('p', null, description)
  );

const Highlights = () =>
  React.createElement(
    'section',
    { className: 'highlights' },
    React.createElement('div', { className: 'section__header' },
      React.createElement('div', null,
        React.createElement('p', { className: 'section__eyebrow' }, 'Преимущества'),
        React.createElement('h2', null, 'Для людей. Про людей.')
      ),
      React.createElement('p', { className: 'section__note' }, 'Безопасно, прозрачно и удобно — так, как должны работать государственные услуги в 2025 году.')
    ),
    React.createElement('div', { className: 'highlights__grid' },
      [
        {
          title: 'Цифровая подпись в смартфоне',
          description: 'Подписывайте заявления за секунды — без флешек и ключей. Подпись защищена биометрией.',
          accent: 'ЭЦП',
        },
        {
          title: 'Умные рекомендации',
          description: 'Портал подскажет, какие услуги и льготы доступны именно вам, исходя из профиля.',
          accent: 'AI',
        },
        {
          title: 'Единый кабинет семьи',
          description: 'Управляйте документами детей и родителей с одного аккаунта. Добавляйте доверенных лиц.',
          accent: 'Family',
        },
      ].map((item) => React.createElement(Highlight, { key: item.title, ...item }))
    )
  );

export default Highlights;
