import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Service from '../../services/Service';
import { useParams } from 'react-router-dom';


function AdministrativeDocuments() {

    const [teacherData, setTeacherData] = useState({});  
    const { id } = useParams();

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

  
  return (
    <div id="teacher-form">
        <Row>
            <Col xs={12} md={{span:8,offset:2}}>
                <Card>
                    <Card.Body>
                        <Card.Title>Documentos del maestro(a): <b>{teacherData.name}</b></Card.Title>
                        <label className="mb-5 mt-5"><b>Acta de nacimiento: </b></label><br></br>
                        <label className="mb-5"><b>Certificado de estudios</b></label><br></br>
                        <label className="mb-5"><b>CURP: </b>{teacherData.documents.curp}</label><br></br>
                        <label className="mb-5"><b>No. de Seguro Social: </b>{teacherData.documents.socialSecurityNumber}</label><br></br>
                        <label className="mb-5"><b>Fotografías: </b></label><br></br>
                        <label className="mb-5"><b>Comprobante de domicilio: </b></label><br></br>
                        <label className="mb-5"><b>Carta de recomendación: </b></label>
                        <Col xs={12} md={2}>
                            <a className="ml-3 btn btn-warning w-100" href="/teachers/list">
                                Volver
                            </a>
                        </Col>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </div>
  );
}

export default AdministrativeDocuments;