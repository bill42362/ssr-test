// SubNavContent.jsx
'use strict';
import React from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import '../../css/sub-nav-content.less';

const subNavLinks = [
  {key: 'aa', display: 'aa-display'},
  {key: 'bb', display: 'bb-display'},
  {key: 'cc', display: 'cc-display'},
];

export const SubNavContent = (props) => (
  <div className='sub-nav-content'>
    <nav className='sub-nav'>
      <ul>
        {subNavLinks.map(subNavLink => (
          <li key={subNavLink.key}>
            <Link to={`/subNavContent/${subNavLink.key}`}>{subNavLink.display}</Link>
          </li>
        ))}
      </ul>
    </nav>
    <Switch>
      <Route path='/subNavContent' exact render={() => <Redirect to={`/subNavContent/${subNavLinks[0].key}`} />}/>
      {subNavLinks.map(subNavLink => (
        <Route path={`/subNavContent/${subNavLink.key}`} key={subNavLink.key} render={props => (
          <div className='sub-nav-content-body'>
            SubNavContentBody display: {subNavLink.display}
          </div>
        )}/>
      ))}
    </Switch>
  </div>
);

export default SubNavContent;
