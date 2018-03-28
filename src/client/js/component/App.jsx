// App.jsx
'use strict';
import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Home from './Home.jsx';
import MainContent from './MainContent.jsx';
import SubNavContent from './SubNavContent.jsx';
import '../../css/app.less';

export const App = (props) => (
  <div className='app'>
    <nav className='main-nav'>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/mainContent1'>MainContent1</Link></li>
        <li><Link to='/mainContent2'>MainContent2</Link></li>
        <li><Link to='/subNavContent'>SubNavContent</Link></li>
      </ul>
    </nav>
    <Switch>
      <Route path='/' exact render={Home} />
      <Route path='/mainContent1' render={props => (<MainContent data={1} />)} />
      <Route path='/mainContent2' render={props => (<MainContent data={2} />)} />
      <Route path='/subNavContent' render={props => (<SubNavContent />)} />
    </Switch>
  </div>
);

export default App;
