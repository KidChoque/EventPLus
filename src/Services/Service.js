import axios from "axios";

/**
 * Module to work with APIs 
 */

export const eventsResourse = '/Evento'


export const eventsTypeResource = '/TiposEvento'
export const loginResource = '/Login'


const apiPort = "7118";
const localApiUri = `https://localhost:${apiPort}/api`;
const externalApiUri = null;

const api = axios.create({
    baseURL:localApiUri
})

export default api;