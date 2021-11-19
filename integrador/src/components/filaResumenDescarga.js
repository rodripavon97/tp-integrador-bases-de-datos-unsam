import {
  HStack,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from "@chakra-ui/react";
import { Box, Button } from "@chakra-ui/react";
import { Center, Text } from "@chakra-ui/layout";
import { FcDocument, FcMusic, FcClapperboard, FcLinux } from "react-icons/fc";
import Rating from "./Rating.js";
import { FaTrashAlt } from "react-icons/fa"
import { Link } from "react-router-dom";


const FetchedIcon = (props) => {
  switch (props.name) {
    case 'Doc':
      return <FcDocument {...props} />
    case 'Mus':
      return <FcMusic {...props} />
    case 'Vid':
      return <FcClapperboard {...props} />
    default:
      return <FcLinux {...props} />
  }
}
export const HeaderResumenDescarga = () => {

  return (
    <Center pt={6} w="100%">
      <VStack w="80%">
        <HStack h={20} w="100%" spacing={0} alignItems="stretch" bg="#57cbc5" textAlign="center">
          <VStack w="55%" justifyContent="center" alignItems="center" border="solid 0.1em black">
            <Text fontWeight="600">Contenido</Text>
          </VStack>
          <VStack w="15%" justifyContent="center" alignItems="center" border="solid 0.1em black">
            <Text fontWeight="600">Fecha Publicación</Text>
          </VStack>
          <VStack w="15%" justifyContent="center" alignItems="center" border="solid 0.1em black">
            <Text fontWeight="600">Categoria(s)</Text>
          </VStack>
          <VStack w="15%" justifyContent="center" alignItems="center" border="solid 0.1em black">
            <Text fontWeight="600">Descargas en Período</Text>
          </VStack>
          <VStack w="15%" justifyContent="center" alignItems="center" border="solid 0.1em black">
            <Text fontWeight="600">Velocidad Prom. de Descarga</Text>
          </VStack>
        </HStack>
      </VStack>
    </Center>
  );
};

const FilaResumenDescarga = (props) => {

  return (
    <Center py={0} w="100%">
      <VStack w="80%">
        <HStack h={100} w="100%" spacing={0} alignItems="stretch" bg="#57cbc5">
          <Center w="15%" border="solid 0.1em black" borderRight="none">
            <FetchedIcon
              name={props.tipoContenido}
              fontSize="4em"
            />
          </Center>
          <VStack w="40%" justifyContent="center" alignItems="flex-start" border="solid 0.1em black" borderLeft="none">
            <Text fontWeight="600">{props.titulo}</Text>
            <Link to={`/descarga/${props.idDescarga}/comentarios`}><Text fontSize="0.8em" fontStyle="italic" textDecor="underline">Ver Comentarios</Text></Link>
          </VStack>
          <VStack w="15%" justifyContent="center" alignItems="center" border="solid 0.1em black">
            <Text>{props.fechaPub}</Text>
          </VStack>
          <VStack w="15%" justifyContent="center" alignItems="center" border="solid 0.1em black">
            {(props.categorias) ? props.categorias.split(", ").map( (cat) => <Text>{cat}</Text> ) : <></>}
          </VStack>
          <VStack w="15%" justifyContent="center" alignItems="center" border="solid 0.1em black">
            <Text>{props.descargasPeriodo}</Text>
          </VStack>
          <VStack w="15%" justifyContent="center" alignItems="center" border="solid 0.1em black">
            <Text>{props.promedioVel}</Text>
          </VStack>
        </HStack>
      </VStack>
    </Center>
  );
};
export default FilaResumenDescarga;
