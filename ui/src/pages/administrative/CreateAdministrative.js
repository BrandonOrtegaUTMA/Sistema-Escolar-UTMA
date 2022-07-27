import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Service from '../../services/Service';


function CreateTeacher() {
    const [formData, setFormData] = useState({});  
    const [documents, setDocuments] = useState({});


    const onChangeDocuments = (e) => {
        const data = documents;
        data[e.target.name] = e.target.value;
        setDocuments(data);        
    } 

    const onChange = (e)=>{        
        const data = formData;
        data[e.target.name] = e.target.value;       
        setFormData(data);
    }

    const submit = (e) => {
        formData['documents'] = documents;             
        e.preventDefault();
        Swal.fire("Administrativo", "Guardando registro...");
        Swal.showLoading();
        Service.post("/administrative", formData, false)
        .then(response =>{
            if(response.data){
                window.location.href = '/administrative/list'
            }else if (response.status === 402) {
                Swal.fire("Error al crear administrativo", "La dirección de correo ya existe", "error");
            }else{
                Swal.fire("Nuevo administrativo", "Ocurrió un error al guardar al administrativo", "error");
            }
        })
    }

  return (
    <div id="administrative-form">
        <Row>
            <Col xs={12} md={{span:8,offset:2}}>
                <Card>
                    <Card.Body>
                        <Card.Title>Agregar administrativo</Card.Title>
                        <Form onSubmit={submit}  autoComplete="off">
                            <Form.Group className="mb-3">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" placeholder="Nombre" name="name" onChange={onChange} required/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Apellido paterno</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese el apellido paterno" name="firstLastName" onChange={onChange} required/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Apellido Materno</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese el apellido materno" name="secondLastName" onChange={onChange} required/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Correo Electrónico</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese el correo electrónico" name="email" onChange={onChange} required/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Edad</Form.Label>
                                <Form.Control type="number" placeholder="Ingrese la edad" name="age" onChange={onChange} required/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Fecha de nacimiento</Form.Label>
                                <Form.Control type="date" placeholder="Ingrese la feca de nacimiento" name="birthDate" onChange={onChange} required/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Número de teléfono</Form.Label>
                                <Form.Control type="number" placeholder="Ingrese el número de teléfono" name="phone" onChange={onChange} required/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Número de teléfono de emergencias</Form.Label>
                                <Form.Control type="number" placeholder="Ingrese el número de teléfono de emergencias" name="emergenciesPhone" onChange={onChange} required/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Domicilio</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese el domicilio" name="address" onChange={onChange} required/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Cargo</Form.Label>
                                <Form.Select name="position" onChange={onChange} required>
                                    <option></option>
                                    <option value="JC">Jefe de carrera</option>
                                    <option value="CE">Control Escolar</option>
                                    <option value="C">Cajas</option>
                                </Form.Select>
                            </Form.Group>
                            <h5 className="mt-5"><b>Documentos</b></h5>
                            <Form.Group className="mb-3">
                                <Form.Label>Acta de nacimiento</Form.Label>
                                <Form.Control type="file" name="act_nac" onChange={onChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Certificado de estudios</Form.Label>
                                <Form.Control type="file" name="cerf_stdy" onChange={onChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>CURP</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese la CURP" name="curp" onChange={onChangeDocuments} required/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Número de seguro social</Form.Label>
                                <Form.Control type="number" placeholder="Ingrese el número de seguro social" name="socialSecurityNumber" onChange={onChangeDocuments} required/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Fotografías</Form.Label>
                                <Form.Control type="file" name="photos" onChange={onChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Comprobante de domicilio</Form.Label>
                                <Form.Control type="file" name="comp_domic" onChange={onChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Carta de recomendacion</Form.Label>
                                <Form.Control type="file" name="cart_recom" onChange={onChange}/>
                            </Form.Group>
                            <Row className="mt-5">
                                <Col xs={12} md={2}>
                                    <Button variant="primary" type="submit" className="w-100">
                                        Guardar administrativo
                                    </Button>
                                </Col>
                                <Col xs={12} md={2}>
                                    <Button variant="warning" type="reset" className="w-100">
                                        Vaciar
                                    </Button> 
                                </Col>
                                <Col xs={12} md={2}>
                                    <a className="ml-3 btn btn-danger w-100" href="/administrative/list">
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

export default CreateTeacher;
