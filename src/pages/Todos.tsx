import { Heading } from '@chakra-ui/react';
import { useState } from 'react';
import { AddTodoForm } from '../components/AddTodoForm';
import { TodoItem } from '../components/TodoItem';
import type { TTodoItem } from '../../types';

const MOCK_DATA: TTodoItem[] = [
  {
    title: 'Dojít na nákup',
    description: 'Test descr',
    id: '2',
    isChecked: true,
  },
  {
    title: 'Zaplatit nájem',
    description: 'Test descr 2',
    id: '3',
    isChecked: false,
  },
];

function Todos() {
  const [todos, setTodos] = useState<TTodoItem[]>(MOCK_DATA);

  return (
    <>
      <Heading size="3xl">Todo</Heading>

      <AddTodoForm
        onAddTodo={(item) => {
          setTodos((prev) => [...prev, item]);
          setTodos([...todos, item]);
        }}
      />

      {todos.map((i) => {
        return (
          <TodoItem
            key={i.id}
            item={i}
            onCheckedTodo={() => {
              setTodos((prev) =>
                prev.map((item) => {
                  // return { ...item, isChecked: !item.isChecked };
                  return item.id === i.id
                    ? { ...item, isChecked: !item.isChecked }
                    : item;
                }),
              );
            }}
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

export default Todos;
