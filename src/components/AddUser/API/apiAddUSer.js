import axios from 'axios';
import config from '../../../../config'

export default async function apiAddUser(newUser) {
    try {
        const response = await axios.post(`${config.API_URL}/addUser`, newUser);
        return response.data;
    } catch (error) {
        console.error('Error al agregar usuario:', error);
        throw error;
    }
}
