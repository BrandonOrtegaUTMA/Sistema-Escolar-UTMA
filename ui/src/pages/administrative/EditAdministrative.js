import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import Service from '../../services/Service';


function EditAdministrative() {
    const [adminData, setAdminData] = useState({});  
    const { id } = useParams();
    const [documents, setDocuments] = useState({});

    useEffect(()=>{
        Swal.fire("Administrativo", "Cargando administrativo...");
        Swal.showLoading();
        Service.get('/administrative/'+id)
        .then((result)=>{
            if(result.data){              
                setAdminData(result.data.data);                
                Swal.close();                
            }else{
                Swal.fire("Adminisrtrativo", "Ocurrió un error al cargar el administrativo", "error");
            }
        })
        
    },[])

    const onChange = (e)=>{
        const data = adminData;
        data[e.target.name] = e.target.value;
        setAdminData({...adminData,...data});
    }
    
    const onChangeDocuments = (e) => {
        const data = documents;
        data[e.target.name] = e.target.value;
        setDocuments(data);        
    } 

    const submit = (e) => {
        adminData['documents'] = documents;
        e.preventDefault();
        Swal.fire("Administrativo", "Guardando registro...");
        Swal.showLoading();
        Service.put("/administrative/"+id,adminData,false)
        .then((result)=>{
            Swal.close();
            if(result.data){
                window.location.href="/administrative/list";
            }else{
                Swal.fire("Administrativo", "Ocurrió un error al guardar al administrativo", "error");
            }
        })
    }
  return (
    <div id="edit-administrative-form">
        <Row>
            <Col xs={12} md={{span:8,offset:2}}>
                <Card>
                    <Card.Body>
                        <Card.Title>Agregar administrativo</Card.Title>
                        <Form onSubmit={submit} autoComplete="off">
                            <Form.Group className="mb-3">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" placeholder="Nombre" name="name" onChange={onChange} defaultValue={adminData.name} required/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Apellido paterno</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese el apellido paterno" name="firstLastName" defaultValue={adminData.firstLastName} onChange={onChange} required/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Apellido Materno</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese el apellido materno" name="secondLastName" onChange={onChange} defaultValue={adminData.secondLastName} required/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Correo Electrónico</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese el correo electrónico" name="email" onChange={onChange} defaultValue={adminData.email} required/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Edad</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese la edad" name="age" onChange={onChange} defaultValue={adminData.age} required/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Fecha de nacimiento</Form.Label>
                                <Form.Control type="date" placeholder="Ingrese la feca de nacimiento" name="birthDate" onChange={onChange} defaultValue={adminData.birthDate ? new Date(adminData.birthDate).toISOString().split('T')[0] : ''} required/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Número de teléfono</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese el número de teléfono" name="phone" onChange={onChange} defaultValue={adminData.phone} required/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Número de teléfono de emergencias</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese el número de teléfono de emergencias" name="emergenciesPhone" onChange={onChange} defaultValue={adminData.emergenciesPhone} required/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Domicilio</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese el domicilio" name="address" onChange={onChange} defaultValue={adminData.address} required/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Cargo</Form.Label>
                                <Form.Select name="position" value={adminData.position} onChange={onChange} required>
                                    <option></option>
                                    <option value="JC">Jefe de carrera</option>
                                    <option value="CE">Control Escolar</option>
                                    <option value="C">Cajas</option>
                                </Form.Select>
                            </Form.Group>
                            <h5 className="mt-5"><b>Documentos</b></h5>
                            <Form.Group className="mb-3">
                                <Form.Label>Acta de nacimiento</Form.Label>
                                <Form.Control type="file" name="act_nac" onChange={onChangeDocuments}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Certificado de estudios</Form.Label>
                                <Form.Control type="file" name="cerf_stdy" onChange={onChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>CURP</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese la CURP" name="curp" onChange={onChangeDocuments} defaultValue={adminData.documents?.curp ? adminData.documents.curp : ''} required/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Número de seguro social</Form.Label>
                                <Form.Control type="number" placeholder="Ingrese el número de seguro social" name="socialSecurityNumber" onChange={onChangeDocuments} defaultValue={adminData.documents ? adminData.documents.socialSecurityNumber : ''}  required/>
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

export default EditAdministrative;
