// MainContent.jsx
'use strict';
import React from 'react';
import '../../css/main-content.less';

export const MainContent = (props) => (
  <div className='main-content'>
    {`MainContent${props.data}`}
  </div>
);

export default MainContent;
