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
import { useDisclosure } from "@chakra-ui/hooks"
import { Center, ListItem, UnorderedList } from "@chakra-ui/layout";
import { FcDocument, FcMusic, FcClapperboard, FcLinux } from "react-icons/fc";
import Rating from "./Rating.js";
import { FaTrashAlt } from "react-icons/fa"
import { descargasService } from "../services/descargasService.js";


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

const TablaDescargas = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  async function borrarEncuesta (borrarEncuesta) {
    await descargasService.eliminarEncuestaDescarga(props.idDescarga, () => {
      props.onDelete()
      onClose()
    })
  }

  return (
    <>
      <Center py={3}>
        <VStack w="60%">
          <HStack h={20} w="100%" spacing={0} alignItems="stretch" bg="#57cbc5">
            <Center w="15%">
              <FetchedIcon
                name={props.tipoContenido}
                fontSize="4em"
              />
            </Center>
            <VStack w="40%" justifyContent="space-evenly" alignItems="flex-start">
              <Box>{props.titulo}</Box>
              <Box>{props.fechaDescarga}</Box>
            </VStack>
              <VStack w="40%" justifyContent="space-evenly">
                <Box justifyContent="center"> {/* FIXIT: Duele ese w */}
                  <Rating
                    size={1.25}
                    scale={5}
                    initialValue={props.puntajeEncuesta}
                    fillColor="gold"
                    strokeColor="black"
                    stackMy="0"
                  />
                </Box>
                <Box mt={0}>
                  <Button colorScheme="blue" size="xs" onClick={ props.onButtonClick }>
                    { (props.puntajeEncuesta > 0) ? "Ver/Editar" : "Responder" } Encuesta
                  </Button>
                </Box>
              </VStack>
              <Center w="15%">
                {
                  (props.puntajeEncuesta > 0) &&
                  <FaTrashAlt
                    fontSize="1.5em"
                    color="red"
                    onClick={onOpen}
                  />
                }
              </Center>
          </HStack>
        </VStack>
      </Center>

      <Modal onClose={onClose} isOpen={isOpen} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>¿Está seguro que desea borrar esta encuesta?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UnorderedList>
              <ListItem>Titulo: "{props.titulo}"</ListItem>
              <ListItem>Fecha de Descarga: {props.fechaDescarga}</ListItem>
            </UnorderedList>
          </ModalBody>
          <ModalFooter>
            <HStack>
              <Button colorScheme="red" onClick={() => borrarEncuesta(props.idDescarga)}>Borrar</Button>
              <Button onClick={onClose}>Cancelar</Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default TablaDescargas;
