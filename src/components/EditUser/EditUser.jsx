import React,{useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './editUserStyle.css';
import apiEditUser from './API/apiEditUSer';
import Alert from 'react-bootstrap/Alert';

export default function EditUser({ setEditUserVisible, user, editUserVisible }) {
    const [idUser, setIdUser] = useState(user?.id || '');
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [showAlert, setShowAlert] = useState(false); 

    useEffect(() => {
        setIdUser(user?.id || '');
        setName(user?.name || '');
        setEmail(user?.email || '');
        setPhone(user?.phone || '');
    }, [user]);

    const handleAcceptEdit = async () => {    
        const updatedUser = { idUser, name, email, phone };

        try {
            const response = await apiEditUser(updatedUser);
            if (response && response.success) { 
                setShowAlert(true); // Mostrar la alerta de éxito
                setTimeout(() => {  
                    setShowAlert(false);
                    setEditUserVisible(false); // Cerrar el modal después de 3s
                }, 3000);
            } else {
                console.error('Error en la respuesta del servidor:', response);
            }
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
        }
    };
     
    

  return (
    <div>
        <Modal show={editUserVisible}>
            <Modal.Header closeButton onHide={() => setEditUserVisible(false)}>
            <Modal.Title>Editar Usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {showAlert && (
                    <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                        Usuario actualizado exitosamente
                    </Alert>
                )}
            <Form>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Nombre:</Form.Label>
                    <Form.Label> {user.name}</Form.Label>
                    <Form.Control type="text" placeholder="Nombre" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Correo:</Form.Label>
                    <Form.Label> {user.email}</Form.Label>
                    <Form.Control type="email" placeholder="Correo" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPhone">
                    <Form.Label>Telefono:</Form.Label>
                    <Form.Label> {user.phone}</Form.Label>
                    <Form.Control type="text" placeholder="Telefono" />
                </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
            <button className='btnEdit'onClick={handleAcceptEdit}>Guardar</button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}
