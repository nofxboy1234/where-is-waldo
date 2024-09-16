import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import PopupMenu from './components/PopupMenu';
import SearchImage from './components/SearchImage';

function App() {
  const [count, setCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  function showMenu(e) {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setShowPopup((showPopup) => !showPopup);
  }

  function hideMenu(e) {}

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

      <SearchImage
        onClick={(e) => {
          // hideMenu(e);
          showMenu(e);
        }}
      >
        {showPopup ? <PopupMenu /> : null}
      </SearchImage>

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
