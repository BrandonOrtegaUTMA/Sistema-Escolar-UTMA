import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import Service from '../../services/Service';


function CreateTeacher() {
    const [teacherData, setTeacherData] = useState({});  
    const { id } = useParams();
    const [documents, setDocuments] = useState({});

    useEffect(()=>{
        Swal.fire("Maestro", "Cargando maestro...");
        Swal.showLoading();
        Service.get('/teacher/'+id)
        .then((result)=>{
            if(result.data){              
                setTeacherData(result.data.data);                
                Swal.close();                
            }else{
                Swal.fire("Maestro", "Ocurrió un error al cargar el maestro", "error");
            }
        })
        
    },[])

    const onChange = (e)=>{
        const data = teacherData;
        data[e.target.name] = e.target.value;
        setTeacherData({...teacherData,...data});       
    }
    
    const onChangeDocuments = (e) => {
        const data = documents;
        data[e.target.name] = e.target.value;
        setDocuments(data);        
    } 

    const submit = (e) => {
        teacherData['documents'] = documents;
        e.preventDefault();
        Swal.fire("Maestro", "Guardando registro...");
        Swal.showLoading();
        Service.put("/teacher/"+id,teacherData,false)
        .then((result)=>{
            Swal.close();
            if(result.data){
                window.location.href="/teachers/list";
            }else{
                Swal.fire("Maestro", "Ocurrió un error al guardar al maestro", "error");
            }
        })
    }
  return (
    <div id="teacher-form">
        <Row>
            <Col xs={12} md={{span:8,offset:2}}>
                <Card>
                    <Card.Body>
                        <Card.Title>Editar maestro</Card.Title>
                        <Form onSubmit={submit} autoComplete="off">
                            <Form.Group className="mb-3">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" placeholder="Nombre del maestr@" name="name" onChange={onChange} defaultValue={teacherData.name} required/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Apellido paterno</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese el apellido paterno" name="firstLastName" onChange={onChange} defaultValue={teacherData.firstLastName} required/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Apellido Materno</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese el apellido materno" name="secondLastName" onChange={onChange} defaultValue={teacherData.secondLastName} required/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Correo Electrónico</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese el correo electrónico" name="email" onChange={onChange} defaultValue={teacherData.email} required/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Edad</Form.Label>
                                <Form.Control type="number" placeholder="Ingrese la edad" name="age" onChange={onChange} defaultValue={teacherData.age} required/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Fecha de nacimiento</Form.Label>
                                <Form.Control type="date" placeholder="Ingrese la feca de nacimiento" name="birthDate" onChange={onChange} defaultValue={teacherData.birthDate ? new Date(teacherData.birthDate).toISOString().split('T')[0] : ''} required/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Número de teléfono</Form.Label>
                                <Form.Control type="number" placeholder="Ingrese el número de teléfono" name="phone" onChange={onChange} defaultValue={teacherData.phone} required/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Número de teléfono de emergencias</Form.Label>
                                <Form.Control type="number" placeholder="Ingrese el número de teléfono de emergencias" name="emergenciesPhone" onChange={onChange} defaultValue={teacherData.emergenciesPhone} required/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Domicilio</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese el domicilio" name="address" onChange={onChange} defaultValue={teacherData.address} required/>
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
                                <Form.Control type="text" placeholder="Ingrese la CURP" name="curp" onChange={onChangeDocuments} defaultValue={teacherData.documents?.curp ? teacherData.documents.curp : ''} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Número de seguro social</Form.Label>
                                <Form.Control type="number" placeholder="Ingrese el número de seguro social" name="socialSecurityNumber" onChange={onChangeDocuments} defaultValue={teacherData.documents ? teacherData.documents.socialSecurityNumber : ''} required/>
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
                                        Guardar maestro
                                    </Button>
                                </Col>
                                <Col xs={12} md={2}>
                                    <Button variant="warning" type="reset" className="w-100">
                                        Vaciar
                                    </Button> 
                                </Col>
                                <Col xs={12} md={2}>
                                    <a className="ml-3 btn btn-danger w-100" href="/teachers/list">
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
