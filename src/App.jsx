import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  function showMenu(e) {
    const canvas = e.target;

    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    ctx.fillRect(x, y, 50, 50);
  }

  function hideMenu(e) {
    const canvas = e.target;

    // const rect = canvas.getBoundingClientRect();
    // const ctx = canvas.getContext('2d');
    // ctx.clearRect(rect.x, rect.y, 150, 150);

    canvas.width = canvas.width;
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>

      <canvas
        width={150}
        height={150}
        onClick={(e) => {
          hideMenu(e);
          showMenu(e);
        }}
      ></canvas>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
