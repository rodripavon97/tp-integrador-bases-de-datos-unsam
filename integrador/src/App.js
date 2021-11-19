import './App.css';
import {ChakraProvider} from '@chakra-ui/react'
import MisDescargas from './pages/MisDescargas';
import { Box } from '@chakra-ui/layout';

function App() {
  return (
    <ChakraProvider>
      <Box h="100vh" w="100vw" bgColor='gray.400'>
      <MisDescargas/>
      </Box>
    </ChakraProvider>
  );
}

export default App;
