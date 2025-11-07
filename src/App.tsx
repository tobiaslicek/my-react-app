import { useState } from 'react';
import type { TTodoItem } from '../types';
import './App.css';
import reactLogo from './assets/react.svg';
import { TodoItem } from './components/TodoItem';
import viteLogo from '/vite.svg';

const MOCK_DATA: TTodoItem[] = [
  { title: 'x', id: '2', isChecked: true },
  { title: 'y', id: '3', isChecked: true },
];

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {MOCK_DATA.map((i) => {
        return (
          <TodoItem
            key={i.id}
            title={i.title}
            id={i.id}
            isChecked={i.isChecked}
          />
        );
      })}
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
