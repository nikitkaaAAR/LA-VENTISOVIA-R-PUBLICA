import React from 'react';
import RequestForm from './RequestForm.js';

const ServiceDetail = ({ service, onBack, onSubmitRequest }) => {
  if (!service) {
    return React.createElement(
      'section',
      { className: 'service-detail' },
      React.createElement('p', { className: 'services__empty' }, 'Выберите услугу на главной странице.'),
      React.createElement('button', { className: 'btn btn-secondary', onClick: onBack }, 'Назад')
    );
  }

  return React.createElement(
    'section',
    { className: 'service-detail' },
    React.createElement(
      'div',
      { className: 'service-detail__header' },
      React.createElement('div', null,
        React.createElement('p', { className: 'section__eyebrow' }, 'Детали услуги'),
        React.createElement('h2', null, service.title),
        React.createElement('p', { className: 'service-detail__lead' }, service.description)
      ),
      React.createElement('div', { className: 'service-detail__meta' },
        React.createElement('p', null, `Сроки: ${service.processing}`),
        React.createElement('p', null, `Необходимо: ${(service.requirements || []).join(', ')}`)
      )
    ),
    React.createElement(
      'div',
      { className: 'service-detail__body' },
      React.createElement(
        'div',
        { className: 'service-detail__panel' },
        React.createElement('h3', null, 'Что входит'),
        React.createElement('ul', { className: 'service-detail__list' },
          [
            'Автоматическая проверка данных',
            'Уведомления об изменении статуса',
            'Оплата госпошлины онлайн',
            'Получение результата в личном кабинете',
          ].map((item) => React.createElement('li', { key: item }, item))
        ),
        React.createElement('h3', null, 'Документы'),
        React.createElement('ul', { className: 'service-detail__list service-detail__list--inline' },
          (service.requirements || []).map((item) => React.createElement('li', { key: item }, item))
        ),
        React.createElement('div', { className: 'service-detail__actions' },
          React.createElement('button', { className: 'btn btn-primary', onClick: () => onSubmitRequest({ serviceId: service.id, serviceTitle: service.title }) }, 'Сохранить черновик'),
          React.createElement('button', { className: 'btn btn-ghost', onClick: onBack }, 'Вернуться на главную')
        )
      ),
      React.createElement(RequestForm, { service, onSubmit: onSubmitRequest })
    )
  );
};

export default ServiceDetail;
