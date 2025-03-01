import axios from 'axios';
import config from '../../../../config'

export default async function apiEditUser(updatedUser) {
    const id= updatedUser.idUser
    try {
        const response = await axios.patch(`${config.API_URL}/editUser/${id}`, updatedUser);
        return response.data;
    } catch (error) {
        console.error('Error al agregar usuario:', error);
        throw error;
    }
}
