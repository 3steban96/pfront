import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TableUser from '../../components/TableUser/TableUser';
import Filter from '../../components/Filter/Filter';
import AddUser from '../../components/AddUser/AddUser';
export default function Dashboard() {
  const [addUserVisible, setAddUserVisible]=useState(false)

  const handleAddUserModal=()=>{
    setAddUserVisible(true);
  }
  return (
    <div>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#addUser" onClick={handleAddUserModal}>Agergar Usuario</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      <Container>
        <Filter/>
        <TableUser/>
      </Container>
    {addUserVisible &&
      <AddUser
        addUserVisible={addUserVisible}
        setAddUserVisible={setAddUserVisible}
      />
    }
    </div>
  )
}
