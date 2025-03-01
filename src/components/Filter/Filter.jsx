import React,{useState, useEffect} from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown';
import './filterStyle.css'
export default function Filter() {
    const [users, setUsers] = useState([]);
    
  return (
    <div className='containerFilters'>
        <Container fluid>
            <Row className='justify-content-md-center'>
                <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                    <input type="text" placeholder="Buscar por nombre"className='inputSearch'/>
                </Col>
                <Col xl={2} lg={2} md={2} sm={3} xs={3}>
                    <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            nombre
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Ascendente</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Descendente</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col xl={2} lg={2} md={2} sm={3} xs={3}>
                    <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            correo
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Ascendente</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Descendente</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
        </Container>
    </div>
  )
}
