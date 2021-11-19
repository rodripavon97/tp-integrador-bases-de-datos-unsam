import { Box, Center, Heading, HStack, ListItem, Text, UnorderedList, VStack } from '@chakra-ui/layout'
import { WarningTwoIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Select } from '@chakra-ui/select'
import { Input } from '@chakra-ui/input'
import { Button } from '@chakra-ui/button'
import FilaResumenDescarga, { HeaderResumenDescarga } from '../components/filaResumenDescarga'

export default function Reporte () {
  const [fechaPubMin, setFechaPubMin] = useState(null);
  const [fechaPubMax, setFechaPubMax] = useState(new Date());
  const [fechaDescMin, setFechaDescMin] = useState(null);
  const [fechaDescMax, setFechaDescMax] = useState(new Date());

  const [filtrosBusqueda, setFiltrosBusqueda] = useState({
    fechaPubMin: null,
    fechaPubMax: null,
    fechaDescMin: null,
    fechaDescMax: null,
    tipoContenido: null,
    categoria: null,
    cantDescargasMin: null,
    cantDescargasMax: null,
    sortBy: ""
  })

  return (
    <Box p={2} bg="green.800" minH="100%" pb={16}>
      <Heading textAlign="center" color="white" pt={6} pb={12}>Reporte de Descargas</Heading>
        <VStack >
          <VStack h={240} w="100%" spacing={0} bg="#57cbc5">
            <Text fontSize="1.25em" pb={2} alignSelf="flex-start">Filtrar por:</Text>
            <HStack w="100%" alignItems="flex-start" fontSize="0.9em">
              <VStack w="30%" justifyContent="space-evenly" alignItems="flex-start">
                <Box pl={8}>Fecha Publicación:</Box>
                <HStack pl={16}><Text>Desde: </Text><DatePicker  selected={fechaPubMin} onChange={(date) => setFechaPubMin(date)} /></HStack>
                <HStack pl={16}><Text>Hasta: </Text><DatePicker  selected={fechaPubMax} onChange={(date) => setFechaPubMax(date)} /></HStack>
              </VStack>
              <VStack w="30%" justifyContent="space-evenly" alignItems="flex-start">
                <Box pl={8}>Fecha Descarga:</Box>
                <HStack pl={16}><Text>Desde: </Text><DatePicker selected={fechaDescMin} onChange={(date) => setFechaDescMin(date)} /></HStack>
                <HStack pl={16}><Text>Hasta: </Text><DatePicker  selected={fechaDescMax} onChange={(date) => setFechaDescMax(date)} /></HStack>
              </VStack>
              <VStack w="40%" justifyContent="space-evenly" alignItems="flex-start">
                <HStack w="80%" pl={16}><Text>Tipo Contenido: </Text><Select size="sm" /></HStack>
                <HStack w="80%" pl={16}><Text>Categoria: </Text><Select size="sm" /></HStack>
                <HStack w="80%" pl={16}>
                  <Text>Cant. Descargas: </Text>
                  <Input size="sm" />
                  <Text> - </Text>
                  <Input size="sm" />
                </HStack>
              </VStack>
            </HStack>
            <Box alignSelf="flex-end" py={4} pr={16}>
              <Button>Actualizar</Button>
            </Box>
          </VStack>
          <VStack w="100%" py={0} >
            <HeaderResumenDescarga />
            <FilaResumenDescarga
              w="100%"
              idDescarga="3"
              tipoContenido="Vid"
              titulo="Curso de React"
              fechaPub="2020-8-10"
              categorias="N/A"
              descargasPeriodo="3"
              promedioVel="600"
            />
            <FilaResumenDescarga
              w="100%"
              idDescarga="3"
              tipoContenido="Vid"
              titulo="Curso de React"
              fechaPub="2020-8-10"
              categorias="Rock, Cocina, Tutorial"
              descargasPeriodo="3"
              promedioVel="600"
            />
            {/* <WarningTwoIcon color="yellow.400" fontSize={200} />
            <Text fontSize={30} fontStyle="italic" fontWeight="semibold" color="white">Proximamente Reporte!</Text> */}
          </VStack>
        </VStack>
    </Box>
  )
}