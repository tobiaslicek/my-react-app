import type { TTodoItem } from '../types';
import './App.css';
import { TodoItem } from './components/TodoItem';

const MOCK_DATA: TTodoItem[] = [
  { title: 'Dojít na nákup', id: '2', isChecked: true },
  { title: 'Zaplatit nájem', id: '3', isChecked: false },
];

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <h2>To do</h2>
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
      {/* <div>
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
      </p> */}
    </>
  );
}

export default App;
