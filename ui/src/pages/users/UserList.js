import { useState, useEffect } from 'react';
import { Row, Col, Table, Card, Modal, Button } from 'react-bootstrap';
import Service from '../../services/Service';
import Swal from 'sweetalert2';

function UserList(){

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});
    const [showRemove, setRemove] = useState(false);

    useEffect(()=>{
        getUsers();
    },[]);

    const getUsers = () => {
        Swal.fire('Cargando...', 'Cargando usuarios');
        Swal.showLoading();
        Service.get('/user')
        .then((result)=>{
            if(result.data){
                setUsers(result.data.data);
                Swal.close()              
            }
        })
    }

    const toggle = (user,status) => {
       
    }

    const confirmRemove = (user) => {    
        setSelectedUser(user);
        setRemove(true);
    }

    const removeUser = () => {
        setRemove(false);
        Swal.fire("Usuario","Eliminando usuario...");
        Swal.showLoading();
        Service.delete('/user/'+selectedUser._id)
        .then((result)=>{
            if(result.data){
                getUsers();
                Swal.close();
            }else{
                Swal.fire("Usuarios", result.error.message.error ,"error");
            }
        })
    }
    const status = (status) => {
        if(status){
            return "Activo"
        }else{
            return "Inactivo"
        }
    }

    return (
        <div id="users-list">
            <Row>
                <Col xs={12} md={{span:10,offset:1}}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                Usuarios
                            </Card.Title>
                            <div className='text-end mt-3 mb-3'>
                                <a className="btn btn-primary" href="/user/new">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
                                        <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                        <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                                    </svg>
                                </a>
                            </div>
                            <div className='table-responsive'>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Correo</th>
                                            <th>Rol</th>
                                            <th>Estatus</th>
                                            <th>Opciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            users.map((user,key)=>(                                    
                                                <tr key={key}>
                                                    <td>{user.name+" "+user.lastName}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.role}</td>
                                                    <td>{status(user.status)}</td>
                                                    <td>
                                                        <div className="table-options d-flex">
                                                            <a href={"/user/edit/"+user._id} className="btn btn-secondary">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                                </svg>
                                                            </a>
                                                            <button onClick={()=>{confirmRemove(user)}} className="btn btn-danger ms-2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                                                </svg>
                                                            </button>
                                                            {
                                                                user.status && (
                                                                    <button onClick={()=>{toggle(user,{status:false})}} className="btn btn-secondary ms-2">
                                                                        Desactivar
                                                                    </button>
                                                                )
                                                            }
                                                            {
                                                                !user.status && (
                                                                    <button onClick={()=>{toggle(user,{status:true})}} className="btn btn-secondary ms-2">
                                                                        Activar
                                                                    </button>
                                                                )
                                                            }
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Modal show={showRemove} onHide={()=>{setRemove(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>Eliminar usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Está seguro de eliminar el usuario {selectedUser?.name+" "+selectedUser?.lastName}?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>{setRemove(false)}}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={removeUser}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default UserList;
