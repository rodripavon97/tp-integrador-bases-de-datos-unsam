import {
  Box,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select } from "@chakra-ui/select";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import FilaResumenDescarga, {
  HeaderResumenDescarga,
} from "../components/filaResumenDescarga";
import { descargasService } from "../services/descargasService";
import { ID_USUARIO_DEMO } from "../services/_constantes";

export default function Reporte() {
  const [fechaPubMin, setFechaPubMin] = useState(null);
  const [fechaPubMax, setFechaPubMax] = useState(new Date());
  const [fechaDescMin, setFechaDescMin] = useState(null);
  const [fechaDescMax, setFechaDescMax] = useState(new Date());
  const [tipoContenido, setTipoContenido] = useState("");
  const [categoria, setCategoria] = useState("");
  const [cantDescargasMin, setCantDescargasMin] = useState(null);
  const [cantDescargasMax, setCantDescargasMax] = useState(null);
  const [sortBy, setSortBy] = useState("");

  const [resultadosReporte, setResultadosReporte] = useState([]);

  async function getReporte() {
    const reporteJSON = await descargasService.getReporteDescargasUsuario(
      ID_USUARIO_DEMO,
      {
        fechaDescargaDesde:
          fechaDescMin === null
            ? null
            : fechaDescMin.toISOString().split("T")[0],
        fechaDescargaHasta:
          fechaDescMax === null
            ? null
            : fechaDescMax.toISOString().split("T")[0],
        fechaPubliDesde:
          fechaPubMin === null ? null : fechaPubMin.toISOString().split("T")[0],
        fechaPubliHasta:
          fechaPubMax === null ? null : fechaPubMax.toISOString().split("T")[0],
        tipoContenido: tipoContenido,
        categoria: categoria,
        minDescargas: cantDescargasMin,
        maxDescargas: cantDescargasMax,
        sortBy: sortBy,
      }
    );
    setResultadosReporte(reporteJSON.data.data);
  }

  useEffect(() => {
    getReporte();
  }, []);

  return (
    <Box p={2} bg="green.800" minH="100%" pb={16}>
      <Heading textAlign="center" color="white" pt={6} pb={12}>
        Reporte de Descargas
      </Heading>
      <VStack>
        <VStack h={240} w="100%" spacing={0} bg="#57cbc5">
          <Text fontSize="1.25em" pb={2} alignSelf="flex-start">
            Filtrar por:
          </Text>
          <HStack w="100%" alignItems="flex-start" fontSize="0.9em">
            <VStack
              w="30%"
              justifyContent="space-evenly"
              alignItems="flex-start"
            >
              <Box pl={8}>Fecha Publicación:</Box>
              <HStack pl={16}>
                <Text>Desde: </Text>
                <DatePicker
                  selected={fechaPubMin}
                  onChange={(date) => setFechaPubMin(date)}
                />
              </HStack>
              <HStack pl={16}>
                <Text>Hasta: </Text>
                <DatePicker
                  selected={fechaPubMax}
                  onChange={(date) => setFechaPubMax(date)}
                />
              </HStack>
            </VStack>
            <VStack
              w="30%"
              justifyContent="space-evenly"
              alignItems="flex-start"
            >
              <Box pl={8}>Fecha Descarga:</Box>
              <HStack pl={16}>
                <Text>Desde: </Text>
                <DatePicker
                  selected={fechaDescMin}
                  onChange={(date) => setFechaDescMin(date)}
                />
              </HStack>
              <HStack pl={16}>
                <Text>Hasta: </Text>
                <DatePicker
                  selected={fechaDescMax}
                  onChange={(date) => setFechaDescMax(date)}
                />
              </HStack>
            </VStack>
            <VStack
              w="40%"
              justifyContent="space-evenly"
              alignItems="flex-start"
            >
              <HStack w="80%" pl={16}>
                <Text>Tipo Contenido: </Text>
                <Select
                  size="sm"
                  value={tipoContenido}
                  onChange={(e) => setTipoContenido(e.target.value)}
                >
                  <option value="">Cualquiera</option>
                  <option value="Mus">Música</option>
                  <option value="Doc">Documento</option>
                </Select>
              </HStack>
              <HStack w="80%" pl={16}>
                <Text>Categoria: </Text>
                <Select
                  size="sm"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                >
                  <option value="">Cualquiera</option>
                  <option value="Rock">Rock</option>
                  <option value="Metal">Metal</option>
                  <option value="Emotivo">Emotivo</option>
                  <option value="Analisis">Analisis</option>
                  <option value="Ranking">Ranking</option>
                  <option value="Deporte">Deporte</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Pop">Pop</option>
                  <option value="Personal">Personal</option>
                  <option value="Cocina">Cocina</option>
                  <option value="Tutorial">Tutorial</option>
                </Select>
              </HStack>
              <HStack w="80%" pl={16}>
                <Text>Cant. Descargas: </Text>
                <Input
                  size="sm"
                  value={cantDescargasMin}
                  onChange={(e) => setCantDescargasMin(e.target.value)}
                />
                <Text> - </Text>
                <Input
                  size="sm"
                  value={cantDescargasMax}
                  onChange={(e) => setCantDescargasMax(e.target.value)}
                />
              </HStack>
            </VStack>
          </HStack>
          <Box alignSelf="flex-end" py={4} pr={16}>
            <Button onClick={getReporte}>Actualizar</Button>
          </Box>
        </VStack>
        <VStack w="100%" py={0}>
          <HeaderResumenDescarga />

          {resultadosReporte.map((fila) => (
            <FilaResumenDescarga
              key={"filaRes-" + fila.idContenido}
              w="100%"
              idDescarga={fila.idContenido}
              tipoContenido={fila.tipoContenido}
              titulo={fila.titulo}
              fechaPub={fila.fechaPub}
              categorias={fila.categorias}
              descargasPeriodo={fila.cantDescargasPorUsuario}
              promedioVel={fila.promVelocidadDescUsuario}
            />
          ))}

          {/* <FilaResumenDescarga
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
          /> */}
          {/* <WarningTwoIcon color="yellow.400" fontSize={200} />
            <Text fontSize={30} fontStyle="italic" fontWeight="semibold" color="white">Proximamente Reporte!</Text> */}
        </VStack>
      </VStack>
    </Box>
  );
}
