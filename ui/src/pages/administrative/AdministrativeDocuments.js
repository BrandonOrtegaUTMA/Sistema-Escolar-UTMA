import React, { useState, useEffect} from 'react';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Service from '../../services/Service';
import { useParams } from 'react-router-dom';


function AdministrativeDocuments() {

    const [adminData, setAdminData] = useState({});  
    const { id } = useParams();    

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

  
  return (
    <div id="administrative-form">
        <Row>
            <Col xs={12} md={{span:8,offset:2}}>
                <Card>
                    <Card.Body>
                        <Card.Title>Documentos del administrativo <b>{adminData.name}</b></Card.Title>
                        <label className="mb-5 mt-5"><b>Acta de nacimiento: </b></label><br></br>
                        <label className="mb-5"><b>Certificado de estudios</b></label><br></br>
                        <label className="mb-5"><b>CURP: </b>{adminData.documents.curp}</label><br></br>
                        <label className="mb-5"><b>No. de Seguro Social: </b>{adminData.documents.socialSecurityNumber}</label><br></br>
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