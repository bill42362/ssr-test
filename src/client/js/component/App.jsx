// App.jsx
'use strict';
import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Home from './Home.jsx';
import '../../css/app.less';

export const App = (props) => (
  <div className='app'>
    <nav className='main-nav'>
      <Link to='/'>Home</Link>
      <Link to='/mainNav1'>MainNav1</Link>
      <Link to='/mainNav2'>MainNav2</Link>
    </nav>
    <Switch>
      <Route path='/' exact component={Home} />
    </Switch>
  </div>
);

export default App;
