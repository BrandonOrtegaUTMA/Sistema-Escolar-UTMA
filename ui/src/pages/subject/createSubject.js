import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';


function CreateSubject() {
    const [formData, setFormData] = useState({});  

    useEffect(()=>{
        const data = {type_career:"TSU"}
        setFormData(data);
    },[])
    const onChange = (e)=>{
        const data = formData;
        data[e.target.name] = e.target.value;
        setFormData(data);
    }

    const submit = (e) =>{
        e.preventDefault();
        Swal.fire("Materia", "Guardando registro...");
        Swal.showLoading();
    }
  return (
    <div id="Subject-form">
        <Row>
            <Col xs={12} md={{span:8,offset:2}}>
                <Card>
                    <Card.Body>
                        <Card.Title>Agregar materia</Card.Title>
                        <Form onSubmit={submit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese el nombre de la materia" name="name" onChange={onChange} required/>
                            </Form.Group>
                            <Row className="mt-5">
                                <Col xs={12} md={2}>
                                    <Button variant="primary" type="submit" className="w-100">
                                        Guardar Materia
                                    </Button>
                                </Col>
                                <Col xs={12} md={2}>
                                    <Button variant="warning" type="reset" className="w-100">
                                        Vaciar
                                    </Button>    
                                </Col>
                                <Col xs={12} md={2}>
                                    <a className="ml-3 btn btn-danger w-100" href="">
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
  );
}

export default CreateSubject;
