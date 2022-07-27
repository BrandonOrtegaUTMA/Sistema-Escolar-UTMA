import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Service from '../../services/Service'


function CreateStudent() {
    const [formData, setFormData] = useState({});
    const [documents, setDocuments] = useState([]);
    const [careers, setCareers] = useState([]);
    const [quarters, setQuarters] = useState([]);

    useEffect(()=>{
        document.addEventListener("wheel", function(event){
            const element = document.activeElement;
            if(element && element.type === "number"){
                element.blur();
            }
        });
    },[])
    const onChange = (e)=>{
        const data = formData;
        if(e.target.name == 'type_career'){
            getCareers(e.target.value);
        }
        if(e.target.name == 'career'){
            const career = careers.filter((item)=>{
                return item._id == e.target.value
            })
            setQuarters(career[0].quarters)
        }
        data[e.target.name] = e.target.value;
        setFormData(data);
    }

    const getCareers = (typeCareer) => {
        Service.get(`/career?type_career=${typeCareer}`)
        .then((result)=>{
            if(result.data){
                setCareers(result.data.careers);
            }
        })
    }

    const addDocuments =  (e) =>{
        const document = documents;
        const file = e.target.files[0];
        file.field_name = e.target.name
        document.push(file);
        setDocuments(document);
    }

    const submit = (e) => {
        e.preventDefault();
        Swal.fire("Cuenta", "Guardando registro...");
        Swal.showLoading();
        const data = new FormData();
        for(let key in formData) {
            data.append(key, formData[key] )
        }
        for(let file of documents){
            data.append('documents', file, file.field_name)
        }
        Service.post('/students',data,true).then(res =>{
            if(res.status == 200){
                window.location.href = '/students/list';
            }else{
                Swal.fire('Error','Algo salio mal al intentar guardar el estudiante','error');
            }
        })
    }
  return (
    <div id="students-form">
        <Row>
            <Col xs={12} md={{span:8,offset:2}}>
                <Card>
                    <Card.Body>
                        <Card.Title>Agregar estudiante</Card.Title>
                        <Form onSubmit={submit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese el nombre del estudiante" name="name" onChange={onChange} required/>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Apellido paterno</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese el apellido paterno" name="apepat" onChange={onChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Apellido materno</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese el apellido materno" name="apemat" onChange={onChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Correo electronico</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese el correo electronico" name="mail" onChange={onChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Edad</Form.Label>
                                <Form.Control type="number" placeholder="Ingrese la edad" name="age" onChange={onChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Numero Telefonico</Form.Label>
                                <Form.Control type="number" placeholder="Ingrese el numero telefonico" name="phone" onChange={onChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Numero de Emergencia</Form.Label>
                                <Form.Control type="number" placeholder="Ingrese el numero de emergencia" name="phone_emergency" onChange={onChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Domicilio</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese la colonia" name="suburb" className="mb-1" onChange={onChange}/>
                                <Form.Control type="text" placeholder="Ingrese la calle" name="street" className="mb-1" onChange={onChange}/>
                                <Form.Control type="number" placeholder="Ingrese el numero" name="house_number" onChange={onChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Fecha de nacimiento</Form.Label>
                                <Form.Control type="date" name="DOB" onChange={onChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Tipo de carrera</Form.Label>
                                <Form.Select name="type_career" onChange={onChange}>
                                    <option></option>
                                    <option value="TSU">TSU</option>
                                    <option value="ING">Ingenieria</option>
                                </Form.Select>
                            </Form.Group>
                            {
                                careers.length > 0 && (
                                    <>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Carrera</Form.Label>
                                            <Form.Select name="career" onChange={onChange}>
                                                <option></option>
                                                {
                                                    careers.map((career, key) =>(
                                                        <option value={career._id} key={key}>{career.name}</option>
                                                    ))
                                                }
                                            </Form.Select>
                                        </Form.Group>
                                    </>
                                )
                            }
                            {
                                quarters.length > 0 && (
                                    <>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>Grado</Form.Label>
                                            <Form.Select name="grade" onChange={onChange}>
                                                <option></option>
                                                {
                                                    quarters.map((quarter, key) =>(
                                                        <option value={quarter._id} key={key}>{quarter.number}</option>
                                                    ))
                                                }
                                            </Form.Select>
                                        </Form.Group>
                                    </>
                                )
                            }
                            <h1>Documentación</h1>
                            <Form.Group className="mb-3" >
                                <Form.Label>Acta de nacimiento</Form.Label>
                                <Form.Control type="file"  name="birth_certificate" onChange={addDocuments} />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Certificado de estudios</Form.Label>
                                <Form.Control type="file"  name="studies_certificate" onChange={addDocuments} />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>EXANII</Form.Label>
                                <Form.Control type="file"  name="exanii" onChange={addDocuments} />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>CURP</Form.Label>
                                <Form.Control type="file"  name="curp" onChange={addDocuments} />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>No. Seguridad social</Form.Label>
                                <Form.Control type="file"  name="no_security" onChange={addDocuments} />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Fotografias</Form.Label>
                                <Form.Control type="file"  name="photos" onChange={addDocuments} />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Carta de buena conducta</Form.Label>
                                <Form.Control type="file"  name="letter_good_conduct" onChange={addDocuments} />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Comprobante de domicilio</Form.Label>
                                <Form.Control type="file"  name="proof_of_address" onChange={addDocuments} />
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
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </div>
  );
}

export default CreateStudent;
