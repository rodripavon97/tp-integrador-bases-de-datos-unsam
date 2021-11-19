import { Avatar } from "@chakra-ui/avatar";
import { Badge, Box, Flex, HStack, Text } from "@chakra-ui/layout";

export default function HeaderUsuario () {
    return (
        <Flex as="header" direction="row" padding="1rem 1.5rem" alignItems="center" justifyContent="space-between" fontSize="large" bgColor="blue.500">
            <Flex>
                <Avatar
                    border="solid 0.2em black"
                    src="assets/img/def_avatar.png"
                />
                <Box ml="3" alignSelf="center">
                    <Text fontWeight="bold">
                    Carlos Gomez
                    </Text>
                </Box>
            </Flex>
        </Flex>
    )
}