import { SimpleGrid, Box,} from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react"
const TablaDescargas = () => {
  return (
    <SimpleGrid columns={1} spacingX="40px" spacingY="20px" h="60%" >
      <HStack >

        <Box bg="blue" w="30%"></Box>
        <Box bg="blue" w="30%"></Box>
        <Box bg="blue" w="30%"></Box>

      </HStack>
    </SimpleGrid>
  );
};
export default TablaDescargas;
