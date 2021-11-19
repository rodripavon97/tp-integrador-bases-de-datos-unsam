import { HStack, VStack } from "@chakra-ui/react";
import { SimpleGrid, Box } from "@chakra-ui/react";
import { AspectRatio, Center } from "@chakra-ui/layout";
import Botones from "../components/botones.js";

const TablaDescargas = () => {
  return (
    <Center>
      <VStack w="60%">
        <HStack h={20} w="100%" spacing={0}>
          {/* <AspectRatio ratio={1}> */}
            <Box bg="tomato" w="20%" h="100%">
              Icono
            </Box>
          {/* </AspectRatio> */}
          <VStack bg="tomato" w="45%">
            <Box h="50%"> Titulo</Box>
            <Box h="50%"> Fecha</Box>
          </VStack>
            <VStack bg="tomato" w="45%">
              <Box h="50%"> Stars</Box>
              <Box h="50%"> <Botones/> </Box>
            </VStack>
        </HStack>
      </VStack>
    </Center>
  );
};
export default TablaDescargas;
