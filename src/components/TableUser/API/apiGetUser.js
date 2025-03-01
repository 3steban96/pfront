import axios from 'axios';
import config from '../../../../config'

export default async function apiGetUser() {
    try {
        const response = await axios.get(`${config.API_URL}/getUser`);
        const data=response.data
        return data;
    } catch (error) {
        console.error('Error al agregar usuario:', error);
        throw error;
    }
}
