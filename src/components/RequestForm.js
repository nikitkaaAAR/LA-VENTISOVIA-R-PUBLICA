import React from '../react.js';
import { loadDrafts, saveDrafts, STORAGE_KEYS_MAP } from '../storage.js';

const RequestForm = ({ service, onSubmit }) => {
  const draftKey = service?.id || 'general';
  const initialDrafts = React.useMemo(() => loadDrafts(), []);
  const initial = initialDrafts[draftKey] || {};
  const [citizenName, setCitizenName] = React.useState(initial.citizenName || '');
  const [contact, setContact] = React.useState(initial.contact || '');
  const [comment, setComment] = React.useState(initial.comment || '');

  React.useEffect(() => {
    const allDrafts = loadDrafts();
    saveDrafts({
      ...allDrafts,
      [draftKey]: { citizenName, contact, comment },
    });
  }, [citizenName, contact, comment, draftKey]);

  React.useEffect(() => {
    const allDrafts = loadDrafts();
    const nextDraft = allDrafts[draftKey] || {};
    setCitizenName(nextDraft.citizenName || '');
    setContact(nextDraft.contact || '');
    setComment(nextDraft.comment || '');
  }, [draftKey]);

  React.useEffect(() => {
    const handleStorage = (event) => {
      if (event.storageArea !== window.localStorage) return;
      if (event.key && event.key !== STORAGE_KEYS_MAP.drafts) return;

      const allDrafts = loadDrafts();
      const nextDraft = allDrafts[draftKey] || {};
      setCitizenName(nextDraft.citizenName || '');
      setContact(nextDraft.contact || '');
      setComment(nextDraft.comment || '');
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [draftKey]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ serviceId: service?.id, serviceTitle: service?.title, citizenName, contact, comment });
    const allDrafts = loadDrafts();
    if (allDrafts[draftKey]) {
      const nextDrafts = { ...allDrafts };
      delete nextDrafts[draftKey];
      saveDrafts(nextDrafts);
    }
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
