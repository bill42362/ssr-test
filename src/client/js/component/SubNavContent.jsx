// SubNavContent.jsx
'use strict';
import React from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import Counter from '../container/Counter.js';
import '../../css/sub-nav-content.less';

export const SubNavContent = (props) => (
  <div className='sub-nav-content'>
    <nav className='sub-nav'>
      <ul>
        <li><Link to={'/subNavContent/counter'}>counter</Link></li>
        <li><Link to={'/subNavContent/bb'}>bb</Link></li>
      </ul>
    </nav>
    <Switch>
      <Route path='/subNavContent' exact render={() => <Redirect to={'/subNavContent/counter'} />}/>
      <Route path={`/subNavContent/counter`} render={props => (
        <div className='sub-nav-content-body'>
          <Counter />
        </div>
      )}/>
      <Route path={`/subNavContent/bb`} render={props => (
        <div className='sub-nav-content-body'>
          bb
        </div>
      )}/>
    </Switch>
  </div>
);

export default SubNavContent;
