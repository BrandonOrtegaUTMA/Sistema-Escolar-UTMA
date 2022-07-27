import React, {useState} from 'react';
import {Row, Col, Card, Form, Button, Modal} from 'react-bootstrap';
import Swal from 'sweetalert2';
import Logo from '../../assets/images/Logo.png';
import Service from '../../services/Service';

function Login(){

    const [loginData, setLoginData] = useState({
        email:'',
        password:''
    });
    const [showRecover, setRecover] = useState(false);
    const [email, setEmail] = useState('');
   

    const onSubmit = (e) => {
        e.preventDefault();
        Service.post('/user/login',loginData,false).then(res=>{
            if(res.status === 200){
                localStorage.setItem('token', res.data.data);
                window.location.href = '/'
            }else{
                Swal.fire('Error', 'Por favor verifica tu información, datos erroneos', 'error');
            }
        })
    }

    const onChange = (e) => {
        let data = loginData;
        data[e.target.name] = e.target.value;
        setLoginData(data);
    }

    const emailHandle = (e)=>{
        setEmail(e.target.value);
    }

    const confirmRecover = () => {
        Service.post('/recover-password',{email},false).then(res=>{
            console.log("Respuesta del recover-password xd",res);
        })
    }

    return (
        <div id="login-container">
            <Row className="w-100">
                <Col xs={12} md={{span:10,offset:1}} lg={{span:6,offset:3}}>
                    <Card>
                        <Card.Body>
                            <div className='text-center'>
                                <img className="logo mb-3" src={Logo}></img>
                                <Card.Title>Iniciar sesión</Card.Title>
                            </div>
                            <Form onSubmit={onSubmit}>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Correo electrónico</Form.Label>
                                    <Form.Control type="email" name="email" placeholder="" onChange={onChange}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type="password" name="password" placeholder="" onChange={onChange}/>
                                </Form.Group>
                                <button type="button" className="mt-3 mb-3 ps-0 btn btn-link" onClick={()=>{setRecover(true)}}>Recuperar contraseña</button>
                                <div className="d-flex">
                                    <Button variant="primary" type="submit">
                                        Ingresar
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Modal show={showRecover} onHide={()=>{setRecover(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>Recuperar contraseña</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="email">
                        <Form.Label>
                            Ingrese su correo electrónico y enviaremos un correo con la
                            solicitud para la recuperación de contraseña.
                        </Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={emailHandle}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>{setRecover(false)}}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={confirmRecover}>
                        Solicitar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Login;
