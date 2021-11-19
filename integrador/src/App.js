import './App.css';
import {ChakraProvider, List} from '@chakra-ui/react'
import MisDescargas from './pages/MisDescargas';
import { Box, Flex, HStack, ListItem } from '@chakra-ui/layout';
import HeaderUsuario from './components/headerUsuario';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom"
import Reporte from './pages/Reporte';
import Proximamente from './pages/Proximamente';

function App() {
  return (
    <ChakraProvider>
      <Box w="100vw" bgColor="gray.400">
        <Flex direction="column" h="100vh" justifyContent="space-between">
          <HeaderUsuario h={3} />
          <HStack flexGrow="1" h="80%" >
            <Router>
              <Box bg="blue.800" w="20%" h="100%">
                <List color="white">
                  <ListItem><Link to="/misEncuestas">* Mis Encuestas</Link></ListItem>
                  <ListItem><Link to="/reporte">* Reporte de Descargas</Link></ListItem>
                </List>
              </Box>
              <Box maxH="100%" h="100%" w="full" overflow="auto">
                  <Switch>
                    <Route exact path="/">
                      <Redirect
                        to="/misEncuestas"
                      />
                    </Route>
                    <Route path="/misEncuestas">
                      <MisDescargas/>
                    </Route>
                    <Route path="/reporte">
                      <Reporte />
                    </Route>
                    <Route path="/*">
                      <Proximamente />
                    </Route>
                  </Switch>
              </Box>
            </Router>
          </HStack>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}

export default App;
