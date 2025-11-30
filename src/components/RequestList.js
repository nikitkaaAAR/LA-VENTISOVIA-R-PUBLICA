const RequestList = ({ requests, onStatusChange, onCreateAnother }) =>
  React.createElement(
    'section',
    { className: 'requests' },
    React.createElement(
      'div',
      { className: 'section__header' },
      React.createElement('div', null,
        React.createElement('p', { className: 'section__eyebrow' }, 'База заявок'),
        React.createElement('h2', null, 'Сохранённые обращения')
      ),
      React.createElement('button', { className: 'btn btn-secondary', onClick: onCreateAnother }, 'Создать новую')
    ),
    requests.length
      ? React.createElement(
          'ul',
          { className: 'requests__list' },
          requests.map((request) =>
            React.createElement(
              'li',
              { key: request.id, className: 'requests__item' },
              React.createElement('div', { className: 'requests__header' },
                React.createElement('div', null,
                  React.createElement('p', { className: 'requests__service' }, request.serviceTitle || 'Свободная заявка'),
                  React.createElement('p', { className: 'requests__meta' },
                    new Date(request.createdAt).toLocaleString('ru-RU', { dateStyle: 'medium', timeStyle: 'short' })
                  )
                ),
                React.createElement('div', { className: 'requests__status' },
                  ['новая', 'в работе', 'завершена'].map((status) =>
                    React.createElement('button', {
                      key: status,
                      type: 'button',
                      className: `chip chip--button ${request.status === status ? 'chip--active' : ''}`,
                      onClick: () => onStatusChange(request.id, status),
                    }, status)
                  )
                )
              ),
              React.createElement('div', { className: 'requests__body' },
                React.createElement('p', null, request.citizenName),
                React.createElement('p', { className: 'requests__meta' }, request.contact),
                request.comment ? React.createElement('p', null, request.comment) : null
              )
            )
          )
        )
      : React.createElement('p', { className: 'requests__empty' }, 'Заявок пока нет. Создайте первую через любую услугу.')
  );

export default RequestList;
