import { Card, Checkbox, Flex, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import type { TTodoItem } from '../../types/index';
// import './TodoItem.css';
type Props = {
  item: TTodoItem;
  onCheckedTodo: () => void;
};

const useTodoItem = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return {
    increment,
    decrement,
    count,
  };
};

const useTodoItem2 = (id: string) => {
  useEffect(() => {
    console.log(id);
  }, []);
};

export const TodoItem = ({ item, onCheckedTodo }: Props) => {
  const { increment, decrement, count } = useTodoItem();
  useTodoItem2(item.id);

  return (
    <Card.Root size="sm">
      <Flex align="center">
        {/* <Card.Header alignItems="center">
          <Heading size="md">
            {title}
          </Heading>
        </Card.Header> */}
        <Card.Body
          flexDirection="row"
          // justifyContent="space-between"
          color="fg.muted"
        >
          {/* <button onClick={() => {}}>{isChecked ? '✅' : '❌'} </button> */}
          <Heading size="md" paddingRight={8}>
            {item.title} - {item.description}
          </Heading>
          <Checkbox.Root
            checked={item.isChecked}
            onCheckedChange={onCheckedTodo}
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
          </Checkbox.Root>
        </Card.Body>
      </Flex>
    </Card.Root>
  );
};
