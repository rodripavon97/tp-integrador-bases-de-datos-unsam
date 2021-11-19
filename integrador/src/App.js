import './App.css';
import {ChakraProvider} from '@chakra-ui/react'
import MisDescargas from './pages/MisDescargas';
import { Box, Flex, HStack, VStack } from '@chakra-ui/layout';
import HeaderUsuario from './components/headerUsuario';

function App() {
  return (
    <ChakraProvider>
      <Box w="100vw" bgColor="gray.400">
        <Flex direction="column" h="100vh" justifyContent="space-between">
          <HeaderUsuario h={3} />
          <HStack flexGrow="1" h="100%">
            <Box bg="blue.800" w="20%" h="100%"/>
            <MisDescargas flexGrow="1" overflow="auto"/>
          </HStack>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}

export default App;
