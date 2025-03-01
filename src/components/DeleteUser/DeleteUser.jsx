import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import apiDeleteUser from './API/apiDeleteUser';
import './deleteUserStyle.css';

export default function DeleteUser({ setDeleteUserVisible, user, deleteUserVisible, onUserDeleted }) {
  const idUser = user?.id;
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');

  const handleAcceptDelete = async () => {
    try {
      const response = await apiDeleteUser(idUser);

      if (response.success) {
        setAlertMessage('Usuario eliminado correctamente.');
        setAlertVariant('success');
        setShowAlert(true);

        onUserDeleted(idUser);

        setDeleteUserVisible(false);
      } else {
        setAlertMessage('Error al eliminar usuario.');
        setAlertVariant('danger');
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      setAlertMessage('Hubo un problema con el servidor.');
      setAlertVariant('danger');
      setShowAlert(true);
    }
  };

  return (
    <Modal show={deleteUserVisible} onHide={() => setDeleteUserVisible(false)}>
      <Modal.Header closeButton>
        <Modal.Title>¿Deseas eliminar este usuario?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showAlert && <Alert variant={alertVariant}>{alertMessage}</Alert>}
        <Form>
          <Form.Group className="mb-3">
            <Form.Label><strong>Nombre:</strong> {user?.name}</Form.Label>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label><strong>Correo:</strong> {user?.email}</Form.Label>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button className="btnEdit" onClick={() => setDeleteUserVisible(false)}>Cancelar</button>
        <button className="btnEdit" onClick={handleAcceptDelete}>Aceptar</button>
      </Modal.Footer>
    </Modal>
  );
}
