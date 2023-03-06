import { Flex, Heading, Image, Text } from '@chakra-ui/react';
import { BsEmojiSmileUpsideDown } from 'react-icons/bs';
import GiffPage from '../../images/giphy.gif';

import { Container } from 'components/utiles';
const HomePage = () => {
  return (
    <Container>
      <Flex p={'30px'} flexDirection="column" gap="30px" alignItems="center">
        <Flex
          flexDirection={'column'}
          justifyContent={'center'}
          gap={'20px'}
          alignItems={'center'}
        >
          <Heading
            size="lg"
            display={'flex'}
            gap={'10px'}
            alignItems={'center'}
            as="cite"
          >
            Hi <BsEmojiSmileUpsideDown />
          </Heading>
          <Heading as="cite" size="xl">
            I am your personal ContactBook
          </Heading>
        </Flex>
        <Image src={GiffPage} alt="funny dog writes a notes" width="500px" />
        <Text as="cite">Here you can save all your contacts</Text>
      </Flex>
    </Container>
  );
};

export default HomePage;
