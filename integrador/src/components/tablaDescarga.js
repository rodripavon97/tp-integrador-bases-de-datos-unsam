import {HStack, VStack} from "@chakra-ui/react"
import { SimpleGrid, Box } from "@chakra-ui/react";
import { AspectRatio } from "@chakra-ui/layout";

const TablaDescargas = () => {
  return (
      <SimpleGrid columns={1} spacingX="40px" spacingY="20px">
        <HStack h={20}>
        <AspectRatio ratio={1}>
        <Box bg="tomato" w="20%"> Icono</Box>
        </AspectRatio>
        <VStack bg="tomato" w="45%">
        <Box h="50%"> Titulo</Box>
        <Box h="50%"> Fecha</Box>
        </VStack>
        <Box bg="tomato" w="35%"> c</Box>
        </HStack>
      </SimpleGrid>
  );
};
export default TablaDescargas;
