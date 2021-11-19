import { Button } from "@chakra-ui/button";
import React from "react";
import { Box, HStack } from "@chakra-ui/layout";
import TablaDescargas from "../components/tablaDescarga";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { FormControl } from "@chakra-ui/form-control";
import { FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { useDisclosure } from "@chakra-ui/hooks";
import { Textarea } from "@chakra-ui/textarea";
export default function MisDescargas() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box p={2} bg="green.800">
      <TablaDescargas />
      <Button onClick={onOpen}>...</Button>
      <Modal  isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="70vw">
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <HStack spacing={6}>
              <FormControl>
                <FormLabel>
                  ¿Que cosas positivas encontraste sobre la descarga?
                </FormLabel>
                <Textarea maxLength={140}  placeholder="..." />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>
                  ¿Que cosas positivas encontraste sobre la plataforma?
                </FormLabel>
                <Textarea maxLength={140} placeholder="..." />
              </FormControl>
            </HStack>

            <HStack spacing={6}>
            <FormControl>
              <FormLabel>
                ¿Que cosas negativas encontraste sobre la descarga?
              </FormLabel>
              <Textarea maxLength={140}  placeholder="..." />

            </FormControl>

            <FormControl>
              <FormLabel>
                ¿Que cosas negativas encontraste sobre la plataforma?
              </FormLabel>
              <Textarea maxLength={140} placeholder="..." />
            </FormControl>
            </HStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
function InitialFocus() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      <Button ml={4} ref={finalRef}>
        I'll receive focus on close
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input ref={initialRef} placeholder="First name" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder="Last name" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
