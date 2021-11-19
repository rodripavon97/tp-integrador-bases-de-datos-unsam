
import { REST_SERVER_URL } from './_constantes'
import axios from 'axios'

class DescargasService {
    async getDescargasUsuario(userId) {
        return await axios.get(`${REST_SERVER_URL}/api/descargas/byUsuario/${userId}`)
    }

    async getEncuestaDescarga(descargaId) {
        return await axios.get(`${REST_SERVER_URL}/api/descargas/${descargaId}/getEncuesta/`)
    }
}

export const descargasService = new DescargasService()