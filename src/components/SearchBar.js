const SearchBar = ({ query, onQueryChange, onSearch, onSelectTag }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  return React.createElement(
    'section',
    { className: 'search' },
    React.createElement(
      'form',
      { className: 'search__box', onSubmit: handleSubmit },
      React.createElement('input', {
        type: 'text',
        value: query,
        onChange: (e) => onQueryChange(e.target.value),
        placeholder: 'Поиск по услугам: паспорт, водительское удостоверение, штрафы...',
        'aria-label': 'Поиск по услугам',
      }),
      React.createElement('button', { type: 'submit', className: 'btn btn-primary' }, 'Найти')
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
        React.createElement(
          'button',
          {
            key: tag,
            type: 'button',
            className: 'chip chip--button',
            onClick: () => onSelectTag(tag),
          },
          tag
        )
      )
    )
  );
};
        React.createElement('span', { key: tag, className: 'chip' }, tag)
      )
    )
  );

export default SearchBar;
