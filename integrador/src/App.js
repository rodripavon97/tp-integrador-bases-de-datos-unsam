import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import MisDescargas from "./pages/MisDescargas";
import {
  Box,
  Flex,
  Heading,
  HStack,
  ListItem,
  UnorderedList,
} from "@chakra-ui/layout";
import HeaderUsuario from "./components/headerUsuario";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  NavLink,
} from "react-router-dom";
import Reporte from "./pages/Reporte";
import Proximamente from "./pages/Proximamente";

function App() {
  return (
    <ChakraProvider>
      <Box w="100vw" bgColor="gray.400">
        <Flex direction="column" h="100vh" justifyContent="space-between">
          <HeaderUsuario h={3} />
          <HStack flexGrow="1" h="80%">
            <Router>
              <Box bg="blue.800" w="20%" h="100%" color="white">
                <Heading fontSize="xl" pl={2} py={3}>
                  Perfil
                </Heading>
                <UnorderedList pl={5}>
                  <ListItem>
                    <NavLink
                      activeClassName="sidebar-selected-link"
                      to="/misDatos"
                    >
                      Mis Datos
                    </NavLink>
                  </ListItem>
                  <ListItem>
                    <NavLink
                      activeClassName="sidebar-selected-link"
                      to="/seguridad"
                    >
                      Seguridad
                    </NavLink>
                  </ListItem>
                </UnorderedList>
                <Heading fontSize="xl" pl={2} py={3}>
                  Mis Comentarios
                </Heading>
                <UnorderedList pl={5}>
                  <ListItem>
                    <NavLink
                      activeClassName="sidebar-selected-link"
                      to="/misComentarios"
                    >
                      Comentarios
                    </NavLink>
                  </ListItem>
                  <ListItem>
                    <NavLink
                      activeClassName="sidebar-selected-link"
                      to="/misReplicas"
                    >
                      Replicas
                    </NavLink>
                  </ListItem>
                </UnorderedList>
                <Heading fontSize="xl" pl={2} py={3}>
                  Mis Descargas
                </Heading>
                <UnorderedList pl={5}>
                  <ListItem>
                    <NavLink
                      activeClassName="sidebar-selected-link"
                      to="/misEncuestas"
                    >
                      Mis Encuestas
                    </NavLink>
                  </ListItem>
                  <ListItem>
                    <NavLink
                      activeClassName="sidebar-selected-link"
                      to="/reporte"
                    >
                      Reporte de Descargas
                    </NavLink>
                  </ListItem>
                </UnorderedList>
              </Box>
              <Box maxH="100%" h="100%" w="full" overflow="auto">
                <Switch>
                  <Route exact path="/">
                    <Redirect to="/misEncuestas" />
                  </Route>
                  <Route path="/misEncuestas">
                    <MisDescargas />
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
