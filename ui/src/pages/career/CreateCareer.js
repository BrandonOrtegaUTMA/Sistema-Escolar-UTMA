import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Service from '../../services/Service'


function CreateCareer() {
    const [formData, setFormData] = useState({});  
    const [headCareers, setHeadCareers] = useState([]);

    useEffect(() => {
        getJC();
    }, [])
    

    const onChange = (e)=>{
        const data = formData;
        data[e.target.name] = e.target.value;
        setFormData(data);
    }

    const submit = (e) => {
        e.preventDefault();
        Swal.fire("Carrera", "Guardando registro...");
        Swal.showLoading();
        Service.post('/career', formData, false)
        .then(response =>{
            if(response.data){
                window.location.href = '/career/list'
            }else{
                Swal.fire(
                    'Error',
                    'Algo salio mal al intentar guardar la carrera',
                    'error'
                )
            }
        })
    }

    const getJC = () => {
        Service.get(`/administrative?position=${'JC'}`)
        .then((result)=>{
            if(result.data){
                setHeadCareers(result.data.data);
            }
        })
    }
  return (
    <div id="career-form">
        <Row>
            <Col xs={12} md={{span:8,offset:2}}>
                <Card>
                    <Card.Body>
                        <Card.Title>Agregar carrera</Card.Title>
                        <Form onSubmit={submit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese el nombre de la carrera" name="name" onChange={onChange} required/>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Jefe de carrera</Form.Label>
                                <Form.Select name="head_career" onChange={onChange}>
                                    <option></option>
                                    {
                                        headCareers.map((JC, key) =>(
                                            <option value={JC._id} key={key}>{JC.name} {JC.firstLastName}</option>
                                        ))
                                    }
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Tipo de carrera</Form.Label>
                                <Form.Select name="type_career" onChange={onChange}>
                                    <option></option>
                                    <option value="TSU">TSU</option>
                                    <option value="ING">Ingenieria</option>
                                </Form.Select>
                            </Form.Group>
                            <Row className="mt-5">
                                <Col xs={12} md={2}>
                                    <Button variant="primary" type="submit" className="w-100">
                                        Guardar Carrera
                                    </Button>
                                </Col>
                                <Col xs={12} md={2}>
                                    <Button variant="warning" type="reset" className="w-100">
                                        Vaciar
                                    </Button> 
                                </Col>
                                <Col xs={12} md={2}>
                                    <a className="ml-3 btn btn-danger w-100" href="/career/list">
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

export default CreateCareer;
