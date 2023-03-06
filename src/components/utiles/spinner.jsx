import { ThreeCircles } from 'react-loader-spinner';
import { Flex } from '@chakra-ui/react';

export const Spinner = () => {
  return (
    <Flex w="100%" justifyContent="center" alignItems="center" padding="30px">
      <ThreeCircles
        height="100"
        width="100"
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor="black"
        innerCircleColor="#23aa9f"
        middleCircleColor="white"
      />
    </Flex>
  );
};
