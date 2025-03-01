import axios from 'axios';
import config from '../../../../config'

export default async function apiDeleteUser( id) {
    try {
        const response = await axios.delete(`${config.API_URL}/deleteUser/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al agregar usuario:', error);
        throw error;
    }
}
