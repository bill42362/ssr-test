// Counter.jsx
'use strict';
import React from 'react';
import '../../css/counter.less';

export const Counter = (props) => {
  const { count, addOne, minusOne, setNumber } = props;
  return <div className='counter'>
      <button className='counter-countrol-button' onClick={minusOne}>-</button>
      <input type='number' value={count} onChange={e => setNumber({number: e.target.value})} />
      <button className='counter-countrol-button' onClick={addOne}>+</button>
  </div>;
};

export default Counter;
