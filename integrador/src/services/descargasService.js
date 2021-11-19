
import { REST_SERVER_URL } from './_constantes'
import axios from 'axios'

class DescargasService {
    async getDescargasUsuario(userId) {
        return await axios.get(`${REST_SERVER_URL}/api/descargas/byUsuario/${userId}`)
    }

    async getEncuestaDescarga(descargaId) {
        return await axios.get(`${REST_SERVER_URL}/api/descargas/${descargaId}/getEncuesta/`)
    }

    async enviarEncuestaDescarga(descargaId, postBody, cb) {
        await axios.post(`${REST_SERVER_URL}/api/descargas/${descargaId}/setEncuesta/`, postBody)
        .then(setTimeout(cb, 500)) //TODO: Optimizar espera no solo 500ms fijos
    }

    async eliminarEncuestaDescarga(descargaId, cb) {
        await axios.delete(`${REST_SERVER_URL}/api/descargas/${descargaId}/eliminarEncuesta`)
        .then(setTimeout(cb, 500)) //TODO: Optimizar espera no solo 500ms fijos
    }

    async getReporteDescargasUsuario(userId, reqBody) {
        console.log(reqBody)
        const listaFiltros = []
        for (const [key, value] of Object.entries(reqBody)){
            console.log(`${key} - ${value}`)
            if (value != null && value !== "") {
                listaFiltros.push(`${key}=${value}`)
            }
        }
        var filtros = ""
        if (listaFiltros.length > 0) {
            filtros = `?${listaFiltros.join('&')}`
        }
        console.log(`${REST_SERVER_URL}/api/descargas/reporte/byUsuario/${userId}` + filtros)
        return await axios.get(`${REST_SERVER_URL}/api/descargas/reporte/byUsuario/${userId}` + filtros)
    }
}

export const descargasService = new DescargasService()