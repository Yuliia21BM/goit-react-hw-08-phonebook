// import { Box } from '../Box';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import { chatngeFilterValue } from '../redux/contacts/filterSlice';
import { useState, useEffect } from 'react';
import { useDebounce } from 'components/utiles';
import { Box, Text, Input } from '@chakra-ui/react';

const filterId = nanoid();

export const Filter = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('');
  const debounsedfilterValue = useDebounce(filter, 500);

  useEffect(() => {
    dispatch(chatngeFilterValue(debounsedfilterValue));
  }, [debounsedfilterValue, dispatch]);

  const handleFilterChange = e => {
    setFilter(e.currentTarget.value.toLowerCase());
  };
  return (
    <Box display="flex" flexDirection="column">
      <Text fontSize="xl" mb="10px" as="cite">
        Finde contact by name
      </Text>
      <Input
        variant="flushed"
        placeholder="John Doe"
        _placeholder={{ opacity: 1, color: 'teal.700' }}
        width="400px"
        value={filter}
        type="text"
        id={filterId}
        onChange={handleFilterChange}
      />
    </Box>
  );
};
