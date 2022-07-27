import React, {useState,useEffect} from 'react';
import {Row, Col, Card, Form, Button} from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function ConfirmPassword(){

    const [loginData, setLoginData] = useState({
        password:'',
        password2:''
    });
    const [userData, setUserData] = useState({
        token:{}
    })
    const { token } = useParams('');

    useEffect(()=>{
        
    },[]);

    const onSubmit = (e) => {
        e.preventDefault();
    }

    const onChange = (e) => {
        let data = loginData;
        data[e.target.name] = e.target.value;
        setLoginData(data);
    }

    return (
        <div id="login-container">
            <Row className="w-100">
                <Col xs={12} md={{span:10,offset:1}} lg={{span:6,offset:3}}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Establecer nueva contraseña</Card.Title>
                            <Form onSubmit={onSubmit}>
                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Ingresar nueva contraseña</Form.Label>
                                    <Form.Control type="password" name="password" placeholder="" onChange={onChange}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="password2">
                                    <Form.Label>Repetir contraseña</Form.Label>
                                    <Form.Control type="password" name="password2" placeholder="" onChange={onChange}/>
                                </Form.Group>
                                <div className="d-flex">
                                    <Button variant="primary" type="submit">
                                        Guardar
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default ConfirmPassword;
