import Hero from './components/Hero.js';
import SearchBar from './components/SearchBar.js';
import ServiceGrid from './components/ServiceGrid.js';
import Timeline from './components/Timeline.js';
import Highlights from './components/Highlights.js';
import Footer from './components/Footer.js';

const App = () =>
  React.createElement(
    'div',
    { className: 'page' },
    React.createElement(Hero, null),
    React.createElement(SearchBar, null),
    React.createElement(ServiceGrid, null),
    React.createElement(Timeline, null),
    React.createElement(Highlights, null),
    React.createElement(Footer, null)
  );

export default App;
