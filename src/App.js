const { useMemo, useState } = React;

const services = [
  {
    title: 'Паспорта и документы',
    description: 'Подайте заявку на паспорт, загранпаспорт или восстановление документов.',
    action: 'Оформить',
    tags: ['паспорт', 'документы', 'загранпаспорт'],
  },
  {
    title: 'Транспорт и штрафы',
    description: 'Оплачивайте штрафы ГИБДД, налоги, оформляйте ОСАГО онлайн.',
    action: 'Проверить штрафы',
    tags: ['штрафы', 'транспорт', 'гибдд', 'осаго'],
  },
  {
    title: 'Здоровье',
    description: 'Запись к врачу, электронные карты, результаты анализов.',
    action: 'Записаться к врачу',
    tags: ['здоровье', 'врач', 'поликлиника'],
  },
  {
    title: 'Соцподдержка',
    description: 'Пособия, маткапитал, выплаты семьям и льготникам.',
    action: 'Узнать о выплатах',
    tags: ['выплаты', 'пособия', 'маткапитал'],
  },
  {
    title: 'Образование',
    description: 'Запись в детский сад и школу, электронный дневник, аттестаты.',
    action: 'Перейти в раздел',
    tags: ['детский сад', 'школа', 'образование'],
  },
  {
    title: 'МФЦ онлайн',
    description: 'Получайте услуги МФЦ удалённо и отслеживайте статус заявлений.',
    action: 'Открыть услуги',
    tags: ['мфц', 'заявление', 'документы'],
  },
];

import Hero from './components/Hero.js';
import SearchBar from './components/SearchBar.js';
import ServiceGrid from './components/ServiceGrid.js';
import Timeline from './components/Timeline.js';
import Highlights from './components/Highlights.js';
import Footer from './components/Footer.js';

const App = () => {
  const [query, setQuery] = useState('');

  const filteredServices = useMemo(() => {
    if (!query.trim()) return services;
    const normalized = query.toLowerCase();
    return services.filter(({ title, description, tags }) => {
      const haystack = `${title} ${description} ${(tags || []).join(' ')}`.toLowerCase();
      return haystack.includes(normalized);
    });
  }, [query]);

  const handleSearchSubmit = (value) => {
    setQuery(value);
    window.scrollTo({ top: document.querySelector('.services').offsetTop - 20, behavior: 'smooth' });
  };

  return React.createElement(
    'div',
    { className: 'page' },
    React.createElement(Hero, null),
    React.createElement(SearchBar, {
      query,
      onQueryChange: setQuery,
      onSearch: handleSearchSubmit,
      onSelectTag: setQuery,
    }),
    React.createElement(ServiceGrid, { services: filteredServices }),
    React.createElement(Timeline, null),
    React.createElement(Highlights, null),
    React.createElement(Footer, null)
  );
};

export default App;
