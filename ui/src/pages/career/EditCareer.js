import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import AddQuarer from '../quarter/AddQuarer';
import Swal from 'sweetalert2';
import Service from '../../services/Service'


function ListCareer() {
    const [careerData, setCareerData] = useState({});
    const [headCareers, setHeadCareers] = useState([]);
    const { id } = useParams();

    useEffect(()=>{
        getCareer();
        getJC();
    },[]);

    const getCareer = () =>{
        Swal.fire("Carrera", "Cargando carrera...");
        Swal.showLoading();
        Service.get('/career/'+id)
        .then((result)=>{
            if(result.data){
                setCareerData(result.data.career);
                Swal.close();
            }else{
                Swal.fire("Carrera", "Ocurrió un error al cargar la carrera", "error");
            }
        })
    }

    const submit = (e) => {
        e.preventDefault();
        Swal.fire("Carrera", "Guardando registro...");
        Swal.showLoading();
        Service.put("/career/"+id,careerData,false)
        .then((result)=>{
            Swal.close();
            if(result.data){
                window.location.href="/career/list";
            }else{
                Swal.fire("Carrera", "Ocurrió un error al guardar la carrera", "error");
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

    const onChange = (e)=>{
        const data = careerData;
        data[e.target.name] = e.target.value;
        setCareerData({...careerData,...data});
    }
  return (
    <div id="careers-form">
        <Row>
            <Col xs={12} md={{span:8,offset:2}}>
                <Card>
                    <Card.Body>
                        <Card.Title>Editar Carrera {careerData.name}</Card.Title>
                        <Form onSubmit={submit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" defaultValue={careerData.name} name="name" onChange={onChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Jefe de carrera</Form.Label>
                                <Form.Select name="head_career" value={careerData.head_career} onChange={onChange}>
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
                                    <option value="TSU" selected={ careerData.type_career === 'TSU' }>TSU</option>
                                    <option value="ING" selected={ careerData.type_career === 'ING' }>Ingenieria</option>
                                </Form.Select>
                            </Form.Group>
                            <Row className="mt-5">
                                <Col xs={12} md={2}>
                                    <Button variant="primary" type="submit" className="w-100">
                                        Editar
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
            <div className="mt-5">
                <AddQuarer career={id ? id : '1'}></AddQuarer>
            </div>
        </Row>
    </div>
  );
}

export default ListCareer;
