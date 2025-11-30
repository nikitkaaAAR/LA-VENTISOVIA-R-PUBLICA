const RequestForm = ({ service, onSubmit }) => {
  const [citizenName, setCitizenName] = React.useState('');
  const [contact, setContact] = React.useState('');
  const [comment, setComment] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ serviceId: service?.id, serviceTitle: service?.title, citizenName, contact, comment });
    setCitizenName('');
    setContact('');
    setComment('');
  };

  return React.createElement(
    'form',
    { className: 'form', onSubmit: handleSubmit },
    React.createElement('h3', null, 'Подать заявку онлайн'),
    React.createElement('p', { className: 'form__hint' }, 'Данные сохранятся в локальной базе и будут доступны после перезагрузки.'),
    React.createElement(
      'label',
      { className: 'form__field' },
      React.createElement('span', null, 'ФИО'),
      React.createElement('input', {
        type: 'text',
        required: true,
        value: citizenName,
        onChange: (e) => setCitizenName(e.target.value),
        placeholder: 'Введите полное имя',
      })
    ),
    React.createElement(
      'label',
      { className: 'form__field' },
      React.createElement('span', null, 'Контакт для связи'),
      React.createElement('input', {
        type: 'text',
        required: true,
        value: contact,
        onChange: (e) => setContact(e.target.value),
        placeholder: '+7 (999) 123-45-67 или email',
      })
    ),
    React.createElement(
      'label',
      { className: 'form__field' },
      React.createElement('span', null, 'Комментарий'),
      React.createElement('textarea', {
        rows: 3,
        value: comment,
        onChange: (e) => setComment(e.target.value),
        placeholder: 'Укажите пожелания или номер дела',
      })
    ),
    React.createElement('button', { type: 'submit', className: 'btn btn-primary form__submit' }, 'Отправить и сохранить')
  );
};

export default RequestForm;
