import React,{useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Pagination from 'react-bootstrap/Pagination';
import './tableUserStyle.css';
import Chart from '../Chart/Chart';
import EditUser from '../EditUser/EditUser';
import DeleteUser from '../DeleteUser/DeleteUser';
import apiGetUser from './API/apiGetUser';
export default function TableUser( ) {
    const [users, setUsers] = useState([]);
    const [chartVisible, setChartVisible] = useState(false);
    const [editUserVisible, setEditUserVisible] = useState(false);
    const [selectUser, setSelectUser] = useState({});
    const [deleteUserVisible, setDeleteUserVisible]= useState(false)
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await apiGetUser(); // Llamar a la API correctamente
                setUsers(data);
                console.log("Usuarios cargados:", data);
            } catch (error) {
                console.error("Error al obtener los usuarios:", error);
            }
        };

        fetchUsers();
    }, []);

    const [activePage, setActivePage] = useState(1);
    const itemsPerPage = 10; 
    const totalPages = Math.ceil(users.length / itemsPerPage);

    const indexOfLastUser = activePage * itemsPerPage;
    const indexOfFirstUser = indexOfLastUser - itemsPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    
    const handleSelectUser = (user) => {
        console.log("user",user);
        setSelectUser(user);
        setChartVisible(true);
    };
    const handleEditUser = (user) => { 
        setSelectUser(user);
        setEditUserVisible(true);
    };
    const handleDeleteUser=(user)=>{
        setSelectUser(user);
        setDeleteUserVisible(true);
    }

  return (
    <div >
        <Table striped bordered hover className='tableContainer'>
        <thead >
            <tr>
                <th className='cellTh'>id</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Telefono</th>
                <th className='actions'>Acciones</th>
            </tr>
        </thead>
        <tbody>
            {currentUsers.map((user) => (                
                <tr key={user.id} className="clickableRow" onClick={(e) => {
                    if (!e.target.closest(".actions")) {
                        handleSelectUser(user);
                    }
                }}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td className="actions">
                    <button className="btnEdit" onClick={(e) => {
                        e.stopPropagation(); 
                        handleEditUser(user);
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                        </svg>
                    </button>

                    <button className="btnDelete" onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteUser(user)
                        }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                        </svg>
                    </button>
                </td>
            </tr>
        ))}

        </tbody>
        </Table>
        <Pagination className='pagination'>
            <Pagination.First onClick={() => setActivePage(1)} disabled={activePage === 1} />
            <Pagination.Prev onClick={() => setActivePage(activePage - 1)} disabled={activePage === 1} />

            {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item 
                    key={index + 1} 
                    active={index + 1 === activePage}
                    onClick={() => setActivePage(index + 1)}
                >
                    {index + 1}
                </Pagination.Item>
            ))}

            <Pagination.Next onClick={() => setActivePage(activePage + 1)} disabled={activePage === totalPages} />
            <Pagination.Last onClick={() => setActivePage(totalPages)} disabled={activePage === totalPages} />
        </Pagination>
        {chartVisible && 
            <Chart 
                chartVisible={chartVisible}
                user={selectUser}
                setChartVisible={setChartVisible}
            />
        }
        {editUserVisible&&
            <EditUser
                editUserVisible={editUserVisible}
                user={selectUser}
                setEditUserVisible={setEditUserVisible}
            />
        }
        {deleteUserVisible &&
            <DeleteUser
                deleteUserVisible={deleteUserVisible}
                user={selectUser}
                setDeleteUserVisible={setDeleteUserVisible}
            />
        }
    </div>
  )
}
