import './App.css';
import {ChakraProvider} from '@chakra-ui/react'
import MisDescargas from './pages/MisDescargas';

function App() {
  return (
    <ChakraProvider>
      <MisDescargas/>
    </ChakraProvider>
  );
}

export default App;
