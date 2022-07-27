import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Card, Table, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Service from '../../services/Service'


function ListQuarter() {
    const [quarters, setQuarters] = useState([]);
    const [selectedQuarter, setSelectedQuarter] = useState({});
    const [showRemove, setRemove] = useState(false);
    const { id } = useParams();

    useEffect(()=>{
        getQuarters()
    },[])
    const getQuarters = () => {
        Swal.fire('Cargando...', 'Cargando cuatrimestres');
        Swal.showLoading();
        Service.get('/quarter/list/' + id)
        .then((result)=>{
            if(result.data){
                setQuarters(result.data.quarters);
                Swal.close()
            }
        })
    }
    const confirmRemove = (quarter) => {    
        setSelectedQuarter(quarter);
        setRemove(true);
    }

    const removeQuarter = () => {
        setRemove(false);
        Swal.fire("Cuatrimestre","Eliminando carrera...");
        Swal.showLoading();
        Service.delete('/quarter/' + selectedQuarter._id)
        .then((result)=>{
            if(result.data){
                getQuarters();
                Swal.close()
            }
        })
    }
  return (
    <div id="quarter-list">
        <Row>
            <Col xs={12} md={{span:10,offset:1}}>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            Cuatrimestres
                        </Card.Title>
                        <div className='table-responsive'>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Numero de cuatrimestre</th>
                                        <th>Carrera</th>
                                        <th>Pagos</th>
                                        <th>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        quarters?.map((quarter,key)=>(                                    
                                            <tr key={key}>
                                                <td>{quarter.number}</td>
                                                <td>{quarter.career_id?.name}</td>
                                                <td>
                                                    <ul>
                                                        {quarter.payments?.map((payment,key)=>(
                                                            <li>{payment.concept}</li>
                                                        ))}
                                                    </ul>
                                                </td>
                                                <td>
                                                    <div className="table-options text-center d-flex">
                                                        <a href={"/quarter/edit/"+quarter._id+"/"+id} className="btn btn-secondary m-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                            </svg>
                                                        </a>
                                                        <Button onClick={()=>{confirmRemove(quarter)}} className="btn btn-danger m-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                                            </svg>
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </div>
                        <Row className="mt-5">
                            <Col xs={12} md={3}>
                                <a href="/career/list" className="btn btn-warning">
                                    Volver a listado de carreras
                                </a>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        <Modal show={showRemove} onHide={()=>{setRemove(false)}}>
            <Modal.Header closeButton>
                <Modal.Title>Eliminar cuatrimestre</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                ¿Está seguro de eliminar la cuatrimestre {selectedQuarter?.number}?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=>{setRemove(false)}}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={removeQuarter}>
                    Eliminar
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
  );
}

export default ListQuarter;
