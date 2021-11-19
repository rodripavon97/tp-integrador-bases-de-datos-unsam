import { Button } from "@chakra-ui/button"
import React from "react"
import { Box, Heading, HStack, VStack } from "@chakra-ui/layout"
import TablaDescargas from "../components/tablaDescarga"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"
import { FormControl } from "@chakra-ui/form-control"
import { FormLabel } from "@chakra-ui/form-control"
import { useDisclosure } from "@chakra-ui/hooks"
import { Textarea } from "@chakra-ui/react"
import Rating from "../components/Rating"
import { useState } from "react"
export default function MisDescargas() {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [puntajeEncuesta, setPuntajeEncuesta] = useState(0)
  const [resPositivoDescarga, setResPositivoDescarga] = useState('')
  const [resNegativoDescarga, setResNegativoDescarga] = useState('')
  const [resPositivoPlataforma, setResPositivoPlataforma] = useState('')
  const [resNegativoPlataforma, setResNegativoPlataforma] = useState('')

  function abrirModal (id_encuesta) {
    console.log("id_encuesta:" + id_encuesta)
    setPuntajeEncuesta(2)
    setResPositivoDescarga("Hola")
    setResNegativoDescarga("Que")
    setResPositivoPlataforma("Tal")
    setResNegativoPlataforma("Como Te Va")
    onOpen()
  }

  return (
    <Box p={2} bg="green.800" minH="100%">
      <Heading textAlign="center" color="white" pt={6} pb={12}>Mis Encuestas</Heading>

      <TablaDescargas tipoContenido="Mus" puntajeEncuesta="5" />
      <TablaDescargas idDescarga="7" tipoContenido="Doc" puntajeEncuesta="2" onButtonClick={() => abrirModal(7)} />
      <TablaDescargas tipoContenido="Vid" puntajeEncuesta="0" />


      <Button onClick={onOpen}>...</Button>



      <Modal  isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxW="70vw">
          <ModalHeader>Respondiendo encuesta sobre: "{`Titulo`}" (Fecha de Descarga: 12/11/2021)</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} pt={0}>
            <VStack>
              <Rating
                size={4}
                scale={5}
                fillColor="gold"
                strokeColor="black"
                initialValue={puntajeEncuesta}
              />

              <HStack spacing={6}>
                <FormControl>
                  <FormLabel minH="3em" fontSize="sm">
                    ¿Que cosas positivas encontraste sobre la descarga?
                  </FormLabel>
                  <Textarea
                    value={resPositivoDescarga}
                    variant="outline"
                    borderColor="black"
                    maxLength={140}
                    placeholder="..."
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel minH="3em" fontSize="sm">
                    ¿Que cosas positivas encontraste sobre la plataforma?
                  </FormLabel>
                  <Textarea
                    value={resPositivoPlataforma}
                    variant="outline"
                    borderColor="black"
                    maxLength={140}
                    placeholder="..."
                  />
                </FormControl>
              </HStack>

              <HStack spacing={6}>
                <FormControl>
                  <FormLabel minH="3em" fontSize="sm">
                    ¿Que cosas negativas encontraste sobre la descarga?
                  </FormLabel>
                  <Textarea
                    value={resNegativoDescarga}
                    variant="outline"
                    borderColor="black"
                    maxLength={140}
                    placeholder="..."
                  />

                </FormControl>

                <FormControl>
                  <FormLabel minH="3em" fontSize="sm">
                    ¿Que cosas negativas encontraste sobre la plataforma?
                  </FormLabel>
                  <Textarea
                    value={resNegativoPlataforma}
                    variant="outline"
                    borderColor="black"
                    maxLength={140}
                    placeholder="..."
                  />
                </FormControl>
              </HStack>
            </VStack>
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