import { Button } from "@chakra-ui/button"
import React, { useState, useEffect } from "react"
import { useDisclosure } from "@chakra-ui/hooks"
import { useToast } from "@chakra-ui/toast"
import TablaDescargas from "../components/tablaDescarga"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Textarea
} from "@chakra-ui/react"
import { Box, Heading, HStack, VStack } from "@chakra-ui/layout"
import { FormControl, FormLabel } from "@chakra-ui/form-control"

import Rating from "../components/Rating"

import { descargasService } from "../services/descargasService"
import { ID_USUARIO_DEMO } from "../services/_constantes"



export default function MisDescargas() {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [descargasUsuario, setDescargasUsuario] = useState([])

  const [puntajeEncuesta, setPuntajeEncuesta] = useState(0)
  const [resPositivoDescarga, setResPositivoDescarga] = useState('')
  const [resNegativoDescarga, setResNegativoDescarga] = useState('')
  const [resPositivoPlataforma, setResPositivoPlataforma] = useState('')
  const [resNegativoPlataforma, setResNegativoPlataforma] = useState('')

  const toast = useToast()

  const tryWithToast = (cb) => {
    try {
      cb()
    } catch (error) {
      console.log(error)
      toast({
        title: '¡Ha ocurrido un error!',
        status: 'error',
        description: 'No se ha podido conectar al backend.',
        position: 'top',
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    const traerDescargas = () => {
      tryWithToast ( async () => {
        const descargasUsuarioJSON = await descargasService.getDescargasUsuario(ID_USUARIO_DEMO)
        //console.log(descargasUsuarioJSON)
        const listaDescargas = []
        for (var descarga of descargasUsuarioJSON.data.data) {
          listaDescargas.push(descarga)
        }
        console.log(listaDescargas)
        setDescargasUsuario([...listaDescargas])
        // const pushearPanel = (panel, icono) => {
        //   exportPanels.push({
        //     title: panel.title,
        //     value: panel.value,
        //     icon: icono
        //   })
        // }
        // const exportPanels = []
        // for(panel of infoPanelsJSON.infoUsuarios) {
        //   pushearPanel(panel, MdGroups)
        // }
        // for(panel of infoPanelsJSON.infoRutinas) {
        //   pushearPanel(panel, FaDumbbell)
        // }
        // // console.log(infoPanels)
        // setInfoPanels([...exportPanels])
        // // console.log(infoPanels)
      }
    )
  }

    traerDescargas()
  }, [])

  function abrirModal (id_encuesta) {
    tryWithToast( async () => {
      const encuestaDescargaJSON = await descargasService.getDescargasUsuario(ID_USUARIO_DEMO)
      const encuestaDescarga = encuestaDescargaJSON.data.data
      setPuntajeEncuesta(encuestaDescarga.puntajeGlobalEncuesta)
      setResPositivoDescarga(encuestaDescarga.resumenPositivoDescarga)
      setResNegativoDescarga(encuestaDescarga.resumenNegativoDescarga)
      setResPositivoPlataforma(encuestaDescarga.resumenPositivoPlataforma)
      setResNegativoPlataforma(encuestaDescarga.resumenNegativoPlataforma)
      onOpen()
    } )
    // console.log("id_encuesta:" + id_encuesta)
    // setPuntajeEncuesta(2)
    // setResPositivoDescarga("Hola")
    // setResNegativoDescarga("Que")
    // setResPositivoPlataforma("Tal")
    // setResNegativoPlataforma("Como Te Va")
    // onOpen()
  }

  return (
    <Box p={2} bg="green.800" minH="100%">
      <Heading textAlign="center" color="white" pt={6} pb={12}>Mis Encuestas</Heading>

      {descargasUsuario.map( (desc) => <TablaDescargas idDescarga={desc.idDescarga} titulo={desc.titulo} fechaDescarga={desc.fechaDescarga} tipoContenido={desc.tipoContenido} puntajeEncuesta={desc.puntajeEncuesta} onButtonClick={() => abrirModal(desc.idDescarga)} /> )}

      {/* <TablaDescargas tipoContenido="Mus" puntajeEncuesta="5" />
      <TablaDescargas idDescarga="7" tipoContenido="Doc" puntajeEncuesta="2" onButtonClick={() => abrirModal(7)} />
      <TablaDescargas tipoContenido="Vid" puntajeEncuesta="0" />


      <Button onClick={onOpen}>...</Button> */}



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