import React, { useState } from 'react';

const ButtonCount = () => {
  const [ count, setCount ] = useState(0);
  const [ count2, setCount2 ] = useState(0);
  const onCount = () => {
    setCount(count + 1);
    setCount2(count2 + 2)
  }
  return (
    <React.Fragment>
    <div className="ButtonCount">
      <div>Count: {count2}, Count2: {count}</div>
      <div>
        <button onClick = {() => onCount()}>Increment</button>
      </div>
    </div>
    </React.Fragment>
  );
};

export default ButtonCount;