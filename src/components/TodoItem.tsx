import type { TTodoItem } from '../../types/index';
import './TodoItem.css';
export const TodoItem = ({ title, isChecked }: TTodoItem) => {
  return (
    <div className="container">
      <p className="title">{title}</p>
      <button className="btn" onClick={() => {}}>
        {isChecked ? '✅' : '❌'}
      </button>
    </div>
  );
};
