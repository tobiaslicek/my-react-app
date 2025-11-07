import type { TTodoItem } from '../../types/index';
export const TodoItem = ({ title, isChecked }: TTodoItem) => {
  return (
    <div>
      <p>{title}</p>
      <button onClick={() => {}}>{isChecked ? 'Nesplněno' : 'Hotovo'}</button>
    </div>
  );
};
