import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './addUserStyle.css';
import apiAddUser from './API/apiAddUSer';
import { Alert } from 'react-bootstrap';
export default function AddUser({setAddUserVisible,addUserVisible}) {
    const [name, setName]= useState('');
    const [email, setEmail]= useState('');
    const [phone, setPhone]= useState('');
    const [showAlert, setShowAlert] = useState(false); 

    const handleAcceptAdd = async () => {
        const newUser = { name, email, phone };
        try {
            const response = await apiAddUser(newUser);
            if (response && response.userId) { 
                setName('');
                setEmail('');
                setPhone('');
                setAddUserVisible(false);
                setShowAlert(true); 
                setTimeout(() => {  
                    setShowAlert(false);
                    setAddUserVisible(false);
                }, 2000);
            } else {
                console.error('Error en la respuesta del servidor:', response);
            }           
        } catch (error) {
            console.error('Error al agregar usuario:', error);
        }
    };
  return (
    <div>
        <Modal show={addUserVisible}>
            <Modal.Header closeButton onHide={() => setAddUserVisible(false)}>
            <Modal.Title>Agregar usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {showAlert && (
                    <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                        Usuario agregado exitosamente
                    </Alert>
                )}
            <Form>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Nombre:</Form.Label>
                    <Form.Control type="text" placeholder="Nombre"value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Correo:</Form.Label>
                    <Form.Control type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPhone">
                    <Form.Label>Telefono:</Form.Label>
                    <Form.Control type="text" placeholder="Telefono" valu={phone} onChange={(e) => setPhone(e.target.value)}/>
                </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
            <button className='btnEdit'onClick={handleAcceptAdd}>Guardar</button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}
