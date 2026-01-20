import { Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const TodoDetail = () => {
  const params = useParams();
  console.log(params.id);

  return (
    <Flex>
      <p>{params.id}</p>
    </Flex>
  );
};

export default TodoDetail;
