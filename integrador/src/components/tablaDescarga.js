import { HStack, VStack } from "@chakra-ui/react";
import { Box, Button } from "@chakra-ui/react";
import { Center } from "@chakra-ui/layout";
import { FcDocument, FcMusic, FcClapperboard, FcLinux } from "react-icons/fc";
import Rating from "./Rating.js";


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

  return (
    <Center py={3}>
      <VStack w="60%">
        <HStack h={20} w="100%" spacing={0} alignItems="stretch">
          {/* <AspectRatio ratio={1}> */}
            <Center bg="tomato" w="20%">
              <FetchedIcon
                name={props.tipoContenido}
                fontSize="4em"
              />
            </Center>
          {/* </AspectRatio> */}
          <VStack bg="tomato" w="45%" justifyContent="space-evenly" alignItems="flex-start">
            <Box> Titulo</Box>
            <Box> Fecha</Box>
          </VStack>
            <VStack bg="tomato" w="45%" justifyContent="space-evenly">
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
        </HStack>
      </VStack>
    </Center>
  );
};
export default TablaDescargas;
