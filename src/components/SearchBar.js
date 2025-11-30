const SearchBar = () =>
  React.createElement(
    'section',
    { className: 'search' },
    React.createElement(
      'div',
      { className: 'search__box' },
      React.createElement('input', {
        type: 'text',
        placeholder: 'Поиск по услугам: паспорт, водительское удостоверение, штрафы...',
        'aria-label': 'Поиск по услугам',
      }),
      React.createElement('button', { className: 'btn btn-primary' }, 'Найти')
    ),
    React.createElement(
      'div',
      { className: 'search__tags' },
      ['Паспорт', 'Штрафы ГИБДД', 'Запись к врачу', 'Соцвыплаты', 'МФЦ'].map((tag) =>
        React.createElement('span', { key: tag, className: 'chip' }, tag)
      )
    )
  );

export default SearchBar;
