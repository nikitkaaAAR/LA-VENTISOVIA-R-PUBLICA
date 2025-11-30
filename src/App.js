import React, { useEffect, useMemo, useState } from 'react';
import Navigation from './components/Navigation.js';
import Hero from './components/Hero.js';
import SearchBar from './components/SearchBar.js';
import ServiceGrid from './components/ServiceGrid.js';
import ServiceDetail from './components/ServiceDetail.js';
import RequestList from './components/RequestList.js';
import Timeline from './components/Timeline.js';
import Highlights from './components/Highlights.js';
import Footer from './components/Footer.js';
import { loadRequests, loadUIState, saveRequests, saveUIState, STORAGE_KEYS_MAP } from './storage.js';

const services = [
  {
    id: 'passport',
    title: 'Паспорта и документы',
    description: 'Подайте заявку на паспорт, загранпаспорт или восстановление документов.',
    action: 'Оформить',
    tags: ['паспорт', 'документы', 'загранпаспорт'],
    requirements: ['Фото 3x4', 'СНИЛС', 'Оплаченная госпошлина'],
    processing: '5-10 рабочих дней после подачи заявления',
  },
  {
    id: 'fines',
    title: 'Транспорт и штрафы',
    description: 'Оплачивайте штрафы ГИБДД, налоги, оформляйте ОСАГО онлайн.',
    action: 'Проверить штрафы',
    tags: ['штрафы', 'транспорт', 'гибдд', 'осаго'],
    requirements: ['Номер автомобиля', 'Серия и номер ВУ'],
    processing: 'Оплата и квитанция — мгновенно',
  },
  {
    id: 'health',
    title: 'Здоровье',
    description: 'Запись к врачу, электронные карты, результаты анализов.',
    action: 'Записаться к врачу',
    tags: ['здоровье', 'врач', 'поликлиника'],
    requirements: ['Полис ОМС', 'Паспорт', 'Контакты'],
    processing: 'Подтверждение записи в течение 15 минут',
  },
  {
    id: 'support',
    title: 'Соцподдержка',
    description: 'Пособия, маткапитал, выплаты семьям и льготникам.',
    action: 'Узнать о выплатах',
    tags: ['выплаты', 'пособия', 'маткапитал'],
    requirements: ['Свидетельства о рождении', 'Реквизиты счёта'],
    processing: 'Решение в среднем за 10 рабочих дней',
  },
  {
    id: 'education',
    title: 'Образование',
    description: 'Запись в детский сад и школу, электронный дневник, аттестаты.',
    action: 'Перейти в раздел',
    tags: ['детский сад', 'школа', 'образование'],
    requirements: ['Документы ребёнка', 'Медицинская карта'],
    processing: 'Приоритетная запись за 1–3 дня',
  },
  {
    id: 'mfc',
    title: 'МФЦ онлайн',
    description: 'Получайте услуги МФЦ удалённо и отслеживайте статус заявлений.',
    action: 'Открыть услуги',
    tags: ['мфц', 'заявление', 'документы'],
    requirements: ['Паспорт', 'Адрес регистрации'],
    processing: 'Статус обновляется автоматически',
  },
];

const App = () => {
  const uiState = loadUIState();
  const [query, setQuery] = useState(uiState.query || '');
  const [activePage, setActivePage] = useState(uiState.activePage || 'home');
  const [selectedServiceId, setSelectedServiceId] = useState(uiState.selectedServiceId || null);
  const [requests, setRequests] = useState(() => loadRequests());

  useEffect(() => {
    saveRequests(requests);
  }, [requests]);

  useEffect(() => {
    saveUIState({ query, activePage, selectedServiceId });
  }, [query, activePage, selectedServiceId]);

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.storageArea !== window.localStorage) return;

      if (event.key === null || event.key === STORAGE_KEYS_MAP.requests) {
        setRequests(loadRequests());
      }
      if (event.key === null || event.key === STORAGE_KEYS_MAP.ui) {
        const nextUi = loadUIState();
        setQuery(nextUi.query || '');
        setActivePage(nextUi.activePage || 'home');
        setSelectedServiceId(nextUi.selectedServiceId || null);
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const filteredServices = useMemo(() => {
    if (!query.trim()) return services;
    const normalized = query.toLowerCase();
    return services.filter(({ title, description, tags }) => {
      const haystack = `${title} ${description} ${(tags || []).join(' ')}`.toLowerCase();
      return haystack.includes(normalized);
    });
  }, [query]);

  const handleSearchSubmit = (value) => {
    const nextQuery = value.trim();
    setQuery(nextQuery);
    handleNavigate('home');
    const servicesBlock = document.querySelector('.services');
    if (servicesBlock) {
      window.scrollTo({ top: servicesBlock.offsetTop - 20, behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceId) => {
    setSelectedServiceId(serviceId);
    handleNavigate('service');
  };

  const handleCreateRequest = (payload) => {
    const id = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Date.now();
    setRequests((prev) => [
      {
        id,
        status: 'новая',
        createdAt: new Date().toISOString(),
        ...payload,
      },
      ...prev,
    ]);
    handleNavigate('requests');
  };

  const handleStatusChange = (requestId, nextStatus) => {
    setRequests((prev) => prev.map((item) => (item.id === requestId ? { ...item, status: nextStatus } : item)));
  };

  const handleDeleteRequest = (requestId) => {
    setRequests((prev) => prev.filter((item) => item.id !== requestId));
  };

  const selectedService = services.find((service) => service.id === selectedServiceId);

  useEffect(() => {
    if (activePage === 'service' && !selectedService) {
      handleNavigate('home');
    }
  }, [activePage, selectedService]);

  const handleNavigate = (next) => {
    setActivePage(next);
    if (next !== 'service') setSelectedServiceId(null);
  };

  const renderPage = () => {
    if (activePage === 'service') {
      return React.createElement(ServiceDetail, {
        service: selectedService,
        onBack: () => handleNavigate('home'),
        onSubmitRequest: handleCreateRequest,
      });
    }

    if (activePage === 'requests') {
      return React.createElement(RequestList, {
        requests,
        onStatusChange: handleStatusChange,
        onDelete: handleDeleteRequest,
        onCreateAnother: () => {
          handleNavigate('home');
        },
      });
    }

    if (activePage === 'help') {
      return React.createElement(
        'section',
        { className: 'help' },
        React.createElement('div', { className: 'section__header' },
          React.createElement('div', null,
            React.createElement('p', { className: 'section__eyebrow' }, 'Поддержка'),
            React.createElement('h2', null, 'Помощь и инструкции')
          ),
          React.createElement('p', { className: 'section__note' }, 'Ответы на популярные вопросы и контакты поддержки.')
        ),
        React.createElement('ul', { className: 'faq' },
          [
            ['Как проверить статус заявки?', 'Откройте раздел «Заявки» и переключайте статусы вручную — они сохраняются в базе браузера.'],
            ['Где мои сохранённые данные?', 'Все заявки хранятся в localStorage этого устройства и доступны при следующем визите.'],
            ['Как перейти к услуге?', 'Используйте поиск или нажмите «Подробнее» на карточке услуги, чтобы открыть детальную страницу и подать заявку.'],
          ].map(([q, a]) =>
            React.createElement('li', { key: q, className: 'faq__item' },
              React.createElement('h3', null, q),
              React.createElement('p', null, a)
            )
          )
        ),
        React.createElement('div', { className: 'support-card' },
          React.createElement('div', null,
            React.createElement('h3', null, 'Нужна помощь оператора?'),
            React.createElement('p', null, 'Позвоните 8-800-100-70-10 или напишите в чат — ответим за 5 минут.')
          ),
          React.createElement('button', { className: 'btn btn-primary' }, 'Открыть чат с поддержкой')
        )
      );
    }

    return [
      React.createElement(Hero, { key: 'hero', onNavigate: handleNavigate }),
      React.createElement(SearchBar, {
        key: 'search',
        query,
        onQueryChange: setQuery,
        onSearch: handleSearchSubmit,
        onSelectTag: (tag) => {
          setQuery(tag);
          handleSearchSubmit(tag);
        },
      }),
      React.createElement(ServiceGrid, {
        key: 'grid',
        services: filteredServices,
        onSelectService: handleSelectService,
      }),
      React.createElement(Timeline, { key: 'timeline' }),
      React.createElement(Highlights, { key: 'highlights' }),
    ];
  };

  return React.createElement(
    'div',
    { className: 'page' },
    React.createElement(Navigation, { activePage, onNavigate: handleNavigate, requestsCount: requests.length }),
    renderPage(),
    React.createElement(Footer, null)
  );
};

export default App;
