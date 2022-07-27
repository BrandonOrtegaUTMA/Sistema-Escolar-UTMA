import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Card, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Service from '../../services/Service'

function EditStudents() {
    const [studentData, setStudentData] = useState({});
    const {id} = useParams();
    const [careers, setCareers] = useState([]);
    const [quarters, setQuarters] = useState([]);

    useEffect(()=>{
        getStudent();
        getCareers('');
    },[]);

    const getStudent = () => {
        Swal.fire("Estudiante", "Cargando estudiante...");
        Swal.showLoading();
        Service.get('/students/'+id)
        .then((result)=>{
            if(result.data){
                setStudentData({...studentData,...result.data.student[0]});
                setQuarters(result.data.student[0].quarters)
                Swal.close();
            }else{
                Swal.fire("Estudiante", "Ocurrió un error al cargar al estudiante", "error");
            }
        })
    }

    const getCareers = (type_career) => {
        Swal.fire("Cargando...", "Cargando carreras");
        Swal.showLoading();
        Service.get(`/career?type_career=${type_career}`)
        .then((result)=>{
            if(result.data){
                setCareers(result.data.careers);
                Swal.close();
            }
        })
    }

    const updateQuarters =  (careerID) => {
        const career = careers.filter((item)=>{
            return item._id == careerID
        })
        setQuarters(career[0].quarters)
    }

    const submit = (e) => {
        e.preventDefault();
        Swal.fire("Estudiante", "Guardando registro...");
        Swal.showLoading();
        /*request("/api/quarter/"+id,{
            method: 'PUT',
            body: JSON.stringify(studentData)
        })
        .then((result)=>{
            Swal.close();
            if(result.data){
                window.location.href="/quarters";
            }else{
                Swal.fire("Cuatrimestre", "Ocurrió un error al guardar la cuatrimestre", "error");
            }
        })*/
    }

    const onChange = (e)=>{
        const data = studentData;
        if(e.target.name == 'type_career'){
            getCareers(e.target.value);
        }
        if(e.target.name == 'career'){
            updateQuarters(e.target.value)
        }
        data[e.target.name] = e.target.value;
        setStudentData({...studentData,...data});
    }
  return (
    <div id="students-form">
        <Row>
            <Col xs={12} md={{span:8,offset:2}}>
                <Card>
                    <Card.Body>
                        <Card.Title>Editar Estudiante {studentData.name} {studentData.apepat} {studentData.apemat} </Card.Title>
                        <Form onSubmit={submit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" defaultValue={studentData.name} name="name" onChange={onChange} required/>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Apellido paterno</Form.Label>
                                <Form.Control type="text" defaultValue={studentData.apepat} name="apepat" onChange={onChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Apellido materno</Form.Label>
                                <Form.Control type="text" defaultValue={studentData.apemat} name="apemat" onChange={onChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Correo electronico</Form.Label>
                                <Form.Control type="text" defaultValue={studentData.mail} name="mail" onChange={onChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Edad</Form.Label>
                                <Form.Control type="number" defaultValue={studentData.age} name="age" onChange={onChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Numero Telefonico</Form.Label>
                                <Form.Control type="number" defaultValue={studentData.phone} name="phone" onChange={onChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Numero de Emergencia</Form.Label>
                                <Form.Control type="number" defaultValue={studentData.phone_emergency} name="phone_emergency" onChange={onChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Domicilio</Form.Label>
                                <Form.Control type="text" defaultValue={studentData.address?.suburb} name="suburb" className="mb-1" onChange={onChange}/>
                                <Form.Control type="text" defaultValue={studentData.address?.street} name="street" className="mb-1" onChange={onChange}/>
                                <Form.Control type="number" defaultValue={studentData.address?.house_number} name="house_number" onChange={onChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Fecha de nacimiento</Form.Label>
                                <Form.Control type="date" defaultValue={studentData.DOB?.split('T')[0]} name="DOB" onChange={onChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Tipo de carrera</Form.Label>
                                <Form.Select name="type_career" value={studentData.type_career} onChange={onChange}>
                                    <option value="TSU">TSU</option>
                                    <option value="ING">Ingenieria</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Carrera</Form.Label>
                                <Form.Select name="career" value={studentData.career?._id} onChange={onChange}>
                                    {
                                        careers.map((career, key) =>(
                                            <option value={career._id} key={key}>{career.name}</option>
                                        ))
                                    }
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Grado</Form.Label>
                                <Form.Select name="grade" value={studentData.grade?._id} onChange={onChange}>
                                    {
                                        quarters.map((quarter, key) =>(
                                            <option value={quarter._id} key={key}>{quarter.number}</option>
                                        ))
                                    }
                                </Form.Select>
                            </Form.Group>
                            <h1>Documentación</h1>
                            <Form.Group className="mb-3" >
                                <Form.Label>Acta de nacimiento</Form.Label>
                                <Form.Control type="file"  name="birth_certificate" onChange={onChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Certificado de estudios</Form.Label>
                                <Form.Control type="file"  name="studies_certificate" onChange={onChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>EXANII</Form.Label>
                                <Form.Control type="file"  name="exanii" onChange={onChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>CURP</Form.Label>
                                <Form.Control type="file"  name="curp" onChange={onChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>No. Seguridad social</Form.Label>
                                <Form.Control type="file"  name="no_security" onChange={onChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Fotografias</Form.Label>
                                <Form.Control type="file"  name="photos" onChange={onChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Carta de buena conducta</Form.Label>
                                <Form.Control type="file"  name="letter_good_conduct" onChange={onChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Comprobante de domicilio</Form.Label>
                                <Form.Control type="file"  name="proof_of_address" onChange={onChange}/>
                            </Form.Group>
                            <Row className="mt-5">
                                <Col xs={12} md={2}>
                                    <Button variant="primary" type="submit" className="w-100">
                                        Guardar estudiante
                                    </Button>
                                </Col>
                                <Col xs={12} md={2}>
                                    <Button variant="warning" type="reset" className="w-100">
                                        Vaciar
                                    </Button> 
                                </Col>
                                <Col xs={12} md={2}>
                                    <a href={"/students/list"} className="btn btn-danger">
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

export default EditStudents;
