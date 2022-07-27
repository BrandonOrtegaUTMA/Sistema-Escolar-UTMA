import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Service from '../../services/Service';
import { useParams } from 'react-router-dom';


function AddQuarer({career}) {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        payments:[],
        career_id:id
    });

    const onChange = (e)=>{
        const data = formData;
        data[e.target.name] = e.target.value;
        setFormData(data);
    }
    const onChangeArray = (e, index)=>{
        const data = formData;
        if(e.target.name === 'price' && parseInt(e.target.value) < 0){
            (document.getElementById(e.target.id)).value = 0;
            data['payments'][index][e.target.name] = 0;
        }else{
            data['payments'][index][e.target.name] = e.target.name === 'price' ? parseInt(e.target.value): e.target.value;
        }
        setFormData({...formData, ...data});
    }

    const submit = (e) => {
        e.preventDefault();
        Swal.fire("Cuatrimestre", "Guardando registro...");
        Swal.showLoading();
        Service.post('/quarter', formData, false)
        .then(response =>{
            if(response.data){
                Swal.fire(
                    'Registro guardado!',
                    'Vaya al listado de cuatrimestres y vean los resultados',
                    'success'
                )
                window.location.reload();
            }else{
                Swal.fire(
                    'Error',
                    'Algo salio mal al intentar guardar la carrera',
                    'error'
                )
            }
        })
    }

    const addPayment = () => {
        const data = formData;
        data.payments?.push({
            concept:'',
            price:0,
        });
        setFormData({...formData,...data});
    }

    const removePayment = (index) => {
        const data = formData;
        if(data.payments){
            data.payments.splice(index,1);
        }
        //delete projects[index];
        /*for(let i =index; i < Object.keys(projects).length; i++ ){
            projects[i]=projects[i+1];
        }*/
        setFormData({...formData, ...data});

    }

  return (
    <div id="quarter-form">
        <Row>
            <Col xs={12} md={{span:8,offset:2}}>
                <Card>
                    <Card.Body>
                        <Card.Title>Agregar cuatrimestre</Card.Title>
                        <Form onSubmit={submit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Numero</Form.Label>
                                <Form.Control type="number" placeholder="Ingrese el numero del cuatrimestre" name="number" onChange={onChange} required/>
                            </Form.Group>
                            {
                                formData.payments?.map((payment,key)=>(
                                    <React.Fragment key = {key}>
                                        <hr></hr>
                                        <Form.Group className="mb-3" controlId={"concept-"+key}>
                                            <Form.Label>Concepto</Form.Label>
                                            <Form.Control type="text" placeholder="Ingrese el concepto del pago" name="concept" onChange={(e) => onChangeArray(e, key)} required />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId={"price-"+key}>
                                            <Form.Label>Costo</Form.Label>
                                            <Form.Control type="number" placeholder="Ingrese el costo del pago" name="price" onChange={(e) => onChangeArray(e, key)} required />
                                        </Form.Group>
                                        <Button className="btn btn-danger mb-2" onClick={()=> removePayment(key)}>
                                            Eliminar pago
                                        </Button>
                                    </React.Fragment>
                                ))
                            }
                            <br></br>
                            <Button className="btn btn-secondary mb-5" onClick={addPayment}>
                                    + Agregar pago
                            </Button>
                            <Row className="mt-5">
                                <Col xs={12} md={3}>
                                    <Button variant="primary" type="submit" className="w-100">
                                        Guardar Cuatrimestre
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

export default AddQuarer;
