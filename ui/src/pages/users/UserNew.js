import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Service from '../../services/Service';

function UserNew(){

    const [userData, setUserData] = useState({});

    const submit = (e) => {
        e.preventDefault();
        if( !userData['name']
        || !userData['lastName']
        || !userData['email'] 
        || !userData['role']){
            Swal.fire("Usuario", "Es necesario completar todos los campos", "error");
        }else{
            Swal.fire("Usuario", "Guardando registro...");
            Swal.showLoading();
            Service.post("/user", userData, false)
            .then(response =>{
                if(response.data){
                    window.location.href = '/user/list'
                }else if (response.status === 402) {
                    Swal.fire("Error al crear al usuario", "La dirección de correo ya existe", "error");
                }else{
                    Swal.fire("Nuevo usuario", "Ocurrió un error al guardar al usuario", "error");
                }
            })
           
        }
    }

    const onChange = (e)=>{
        let data = userData;
        data[e.target.name] = e.target.value;
        setUserData(data);
    }

    return (
        <div id="users-form">
            <Row>
                <Col xs={12} md={{span:8,offset:2}}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Nuevo usuario</Card.Title>
                            <Form onSubmit={submit} autoComplete="off">
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Label>Nombre(s):</Form.Label>
                                    <Form.Control type="text" placeholder="" name="name" onChange={onChange}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="lastName">
                                    <Form.Label>Apellido(s):</Form.Label>
                                    <Form.Control type="text" placeholder="" name="lastName" onChange={onChange}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Correo electrónico</Form.Label>
                                    <Form.Control type="email" placeholder="" name="email" onChange={onChange}/>
                                <Form.Group className="mb-3 mt-3" controlId="role">
                                    <Form.Label>Rol del usuario:</Form.Label>
                                    <Form.Select required name="role" onChange={onChange}>
                                        <option></option>
                                        <option>Administrador</option>
                                        <option>Maestro</option>
                                    </Form.Select>
                                </Form.Group>
                                </Form.Group>
                                <Row className="mt-5">
                                    <Col xs={12} md={3}>
                                        <Button variant="primary" type="submit" className="w-100">
                                            Enviar invitación
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

export default UserNew;
