import { Button } from "@chakra-ui/button";
import React, { useState, useEffect, useCallback } from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import { useToast } from "@chakra-ui/toast";
import TablaDescargas from "../components/tablaDescarga";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Textarea,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { Box, Heading, HStack, VStack } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";

import Rating from "../components/Rating";

import { descargasService } from "../services/descargasService";
import { ID_USUARIO_DEMO } from "../services/_constantes";

export default function MisDescargas() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [descargasUsuario, setDescargasUsuario] = useState([]);

  const [erroresEncuesta, setErroresEncuesta] = useState([]);

  const [idDescargaEncuesta, setIdDescargaEncuesta] = useState(0);
  const [puntajeEncuesta, setPuntajeEncuesta] = useState(0);
  const [tituloDescarga, setTituloDescarga] = useState("");
  const [fechaDescarga, setFechaDescarga] = useState("");
  const [resPositivoDescarga, setResPositivoDescarga] = useState("");
  const [resNegativoDescarga, setResNegativoDescarga] = useState("");
  const [resPositivoPlataforma, setResPositivoPlataforma] = useState("");
  const [resNegativoPlataforma, setResNegativoPlataforma] = useState("");

  const toast = useToast();

  const tryWithToast = useCallback(
    (cb) => {
      try {
        cb();
      } catch (error) {
        console.log(error);
        toast({
          title: "¡Ha ocurrido un error!",
          status: "error",
          description: "No se ha podido conectar al backend.",
          position: "top",
          isClosable: true,
        });
      }
    },
    [toast]
  );

  const traerDescargas = useCallback(() => {
    tryWithToast(async () => {
      const descargasUsuarioJSON = await descargasService.getDescargasUsuario(
        ID_USUARIO_DEMO
      );
      //console.log(descargasUsuarioJSON)
      const listaDescargas = [];
      for (var descarga of descargasUsuarioJSON.data.data) {
        listaDescargas.push(descarga);
      }
      //console.log(listaDescargas)
      setDescargasUsuario([...listaDescargas]);
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
    });
  }, [tryWithToast]);

  useEffect(() => {
    traerDescargas();
  }, [traerDescargas]);

  function abrirModal(id_encuesta) {
    tryWithToast(async () => {
      const encuestaDescargaJSON = await descargasService.getEncuestaDescarga(
        id_encuesta
      );
      var encuestaDescarga = encuestaDescargaJSON.data.data;
      //console.log(encuestaDescarga)
      encuestaDescarga = encuestaDescarga[0];
      setIdDescargaEncuesta(id_encuesta);
      setTituloDescarga(encuestaDescarga.titulo);
      setFechaDescarga(encuestaDescarga.fechaDescarga);
      setPuntajeEncuesta(encuestaDescarga.puntajeGlobalEncuesta);
      setResPositivoDescarga(encuestaDescarga.resumenPositivoDescarga);
      setResNegativoDescarga(encuestaDescarga.resumenNegativoDescarga);
      setResPositivoPlataforma(encuestaDescarga.resumenPositivoPlataforma);
      setResNegativoPlataforma(encuestaDescarga.resumenNegativoPlataforma);
      onOpen();
    });
    // console.log("id_encuesta:" + id_encuesta)
    // setPuntajeEncuesta(2)
    // setResPositivoDescarga("Hola")
    // setResNegativoDescarga("Que")
    // setResPositivoPlataforma("Tal")
    // setResNegativoPlataforma("Como Te Va")
    // onOpen()
  }

  function submitEncuesta() {
    const errores = [];
    if (puntajeEncuesta <= 0) {
      errores.push("Necesita poner un puntaje de 1 a 5 en la encuesta");
    }
    if (errores.length > 0) {
      setErroresEncuesta([...errores]);
      return;
    }
    try {
      descargasService.enviarEncuestaDescarga(
        idDescargaEncuesta,
        {
          puntajeGlobalExperiencia: puntajeEncuesta,
          resPositivoDescarga: resPositivoDescarga,
          resNegativoDescarga: resNegativoDescarga,
          resPositivoPlataforma: resPositivoPlataforma,
          resNegativoPlataforma: resNegativoPlataforma,
        },
        () => {
          traerDescargas();
          onClose();
        }
      );
    } catch (e) {
      errores.push("Problema con backend: " + e.message);
      setErroresEncuesta([...errores]);
      return;
    }
  }

  return (
    <Box p={2} bg="green.800" minH="100%" pb={16}>
      <Heading textAlign="center" color="white" pt={6} pb={12}>
        Mis Encuestas
      </Heading>

      {descargasUsuario.map((desc) => (
        <TablaDescargas
          key={desc.idDescarga}
          idDescarga={desc.idDescarga}
          titulo={desc.titulo}
          fechaDescarga={desc.fechaDescarga}
          tipoContenido={desc.tipoContenido}
          puntajeEncuesta={desc.puntajeEncuesta}
          onButtonClick={() => abrirModal(desc.idDescarga)}
          onDelete={traerDescargas}
        />
      ))}

      {/* <TablaDescargas tipoContenido="Mus" puntajeEncuesta="5" />
      <TablaDescargas idDescarga="7" tipoContenido="Doc" puntajeEncuesta="2" onButtonClick={() => abrirModal(7)} />
      <TablaDescargas tipoContenido="Vid" puntajeEncuesta="0" />


      <Button onClick={onOpen}>...</Button> */}

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxW="70vw">
          <ModalHeader>
            Respondiendo encuesta sobre: "{tituloDescarga}" (Fecha de Descarga:{" "}
            {fechaDescarga})
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} pt={0}>
            <VStack>
              {erroresEncuesta.map((err) => (
                <Alert status="error">
                  <AlertIcon />
                  {err}
                </Alert>
              ))}
              <Rating
                size={4}
                scale={5}
                fillColor="gold"
                strokeColor="black"
                initialValue={puntajeEncuesta}
                rating={puntajeEncuesta}
                setRating={setPuntajeEncuesta}
              />

              <HStack spacing={6}>
                <FormControl>
                  <FormLabel minH="3em" fontSize="sm">
                    ¿Que cosas positivas encontraste sobre la descarga?
                  </FormLabel>
                  <Textarea
                    value={resPositivoDescarga}
                    onChange={(e) => setResPositivoDescarga(e.target.value)}
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
                    onChange={(e) => setResPositivoPlataforma(e.target.value)}
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
                    onChange={(e) => setResNegativoDescarga(e.target.value)}
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
                    onChange={(e) => setResNegativoPlataforma(e.target.value)}
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
            <Box>
              <Button onClick={submitEncuesta} colorScheme="blue" mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
