import { Center, Text, VStack } from '@chakra-ui/layout'
import { WarningTwoIcon } from '@chakra-ui/icons'

export default function Reporte () {
  return (
    <Center p={2} h="full" bg="green.800">
        <VStack >
            <WarningTwoIcon color="yellow.400" fontSize={200} />
            <Text fontSize={30} fontStyle="italic" fontWeight="semibold" color="white">Proximamente Reporte!</Text>
        </VStack>
    </Center>
  )
}