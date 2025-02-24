import React, { useState } from 'react';
import './App.css';

function App() {
  // Step 1: Declare state variables for count and background color
  const [count, setCount] = useState(0);
  const [bgColor, setBgColor] = useState('white'); // Default background color

  // Step 2: Create increment, decrement, and reset functions
  const increment = () => {
    setCount(count + 1);
    setBgColor('green'); // Flash green when incremented
    setTimeout(() => setBgColor('white'), 500); // Reset background after 500ms
  };

  const decrement = () => {
    setCount(count - 1);
    setBgColor('red'); // Flash red when decremented
    setTimeout(() => setBgColor('white'), 500); // Reset background after 500ms
  };

  const reset = () => {
    setCount(0);
    setBgColor('white'); // Reset background when reset
  };

  return (
    <div className="App" style={{ backgroundColor: bgColor }}>
      <h1>Counter App</h1>
      <p className="counter-display">Count: {count}</p>

      {/* Step 3: Buttons to increment, decrement, and reset */}
      <div className="buttons">
        <button className="increment" onClick={increment}>Increment</button>
        <button className="decrement" onClick={decrement}>Decrement</button>
        <button className="reset" onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default App;
