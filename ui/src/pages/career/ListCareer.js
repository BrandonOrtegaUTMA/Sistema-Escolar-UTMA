import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Card, Table, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Service from '../../services/Service';


function ListCareer() {
    const [careers, setCareers] = useState([]);
    const [selectedCareer, setSelectedCareer] = useState({});
    const [showRemove, setRemove] = useState(false);

    useEffect(()=>{
        getCareers();
    },[])
    const getCareers = () => {
        Swal.fire('Cargando...', 'Cargando carreras');
        Swal.showLoading();
        Service.get('/career')
        .then((result)=>{
            if(result.data){
                setCareers(result.data.careers);
                Swal.close()
            }
        })
    }

    const confirmRemove = (career) => {    
        setSelectedCareer(career);
        setRemove(true);
    }

    const removeCareer = () => {
        setRemove(false);
        Swal.fire("Carrera","Eliminando carrera...");
        Swal.showLoading();
        Service.delete('/career/'+selectedCareer._id)
        .then((result)=>{
            if(result.data){
                getCareers();
                Swal.close();
            }else{
                Swal.fire("Carrera", result.error.message.error ,"error");
            }
        })
    }

  return (
    <div id="career-list">
        <Row>
            <Col xs={12} md={{span:10,offset:1}}>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            Carreras
                        </Card.Title>
                        <div className='text-end mt-3 mb-3'>
                            <a className="btn btn-primary" href="/career/new">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                </svg>
                            </a>
                        </div>
                        <div className='table-responsive'>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Jefe de carrera</th>
                                        <th>Cuatrimestres</th>
                                        <th>Tipo de carrera</th>
                                        <th>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        careers?.map((career,key)=>(                                    
                                            <tr key={key}>
                                                <td>{career.name}</td>
                                                <td>{career.head_career.name} {career.head_career.firstLastName}</td>
                                                <td className='text-center'>
                                                    <a href={"/quarter/list/"+career._id} className="btn btn-info">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar4-week" viewBox="0 0 16 16">
                                                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1H2zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5z"/>
                                                            <path d="M11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-2 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
                                                        </svg>
                                                    </a>
                                                </td>
                                                <td>{career.type_career}</td>
                                                <td>
                                                    <div className="table-options d-flex">
                                                        <a href={"/career/edit/"+career._id} className="btn btn-secondary">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                            </svg>
                                                        </a>
                                                        <button onClick={()=>{confirmRemove(career)}} className="btn btn-danger ms-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        <Modal show={showRemove} onHide={()=>{setRemove(false)}}>
            <Modal.Header closeButton>
                <Modal.Title>Eliminar carrera</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                ¿Está seguro de eliminar la carrera {selectedCareer?.name}?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=>{setRemove(false)}}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={removeCareer}>
                    Eliminar
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
  );
}

export default ListCareer;
