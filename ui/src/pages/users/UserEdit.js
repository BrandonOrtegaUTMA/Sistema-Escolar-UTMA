import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Service from '../../services/Service';
import Swal from 'sweetalert2';

function UserEdit(){

    const [userData, setUserData] = useState({});
    const { id } = useParams('');

    useEffect(()=>{
        Swal.fire("Usuario", "Cargando usuario...");
        Swal.showLoading();
        Service.get('/user/'+id)
        .then((result)=>{
            if(result.data){              
                setUserData(result.data.data);                
                Swal.close();                
            }else{
                Swal.fire("Usuario", "Ocurrió un error al cargar el usuario", "error");
            }
        })
        
    },[]);

    const submit = (e) => {
        e.preventDefault();
        Swal.fire("Usuario", "Guardando registro...");
        Swal.showLoading();
        Service.put("/user/"+id,userData,false)
        .then((result)=>{
            Swal.close();
            if(result.data){
                window.location.href="/user/list";
            }else{
                Swal.fire("Usuario", "Ocurrió un error al guardar al usuario", "error");
            }
        })
    }

    const onChange = (e)=>{
        let data = userData;
        data[e.target.name] = e.target.value;
        setUserData({...userData,...data});
    }

    return (
        <div id="users-form">
            <Row>
                <Col xs={12} md={{span:8,offset:2}}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Nuevo usuario</Card.Title>
                            <Form onSubmit={submit}>
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control type="text" defaultValue={userData.name} placeholder="" name="name" onChange={onChange}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="lastName">
                                    <Form.Label>Apellido</Form.Label>
                                    <Form.Control type="text" defaultValue={userData.lastName} placeholder="" name="lastName" onChange={onChange}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Correo electrónico</Form.Label>
                                    <Form.Control type="email" defaultValue={userData.email} placeholder="" name="email" onChange={onChange}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="role">
                                    <Form.Label>Rol del usuario:</Form.Label>
                                    <Form.Select required name="role" onChange={onChange}>
                                        <option selected={userData.role == "Administrador"}>Administrador</option>
                                        <option selected={userData.role == "Usuario"}>Usuario</option>
                                    </Form.Select>
                                </Form.Group>
                                <Row className="mt-5">
                                    <Col xs={12} md={2}>
                                        <Button variant="primary" type="submit" className="w-100">
                                            Guardar
                                        </Button>
                                    </Col>
                                    <Col xs={12} md={2}>
                                        <a className="ml-3 btn btn-danger w-100" href="/users">
                                            Cancelar
                                        </a>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default UserEdit;
