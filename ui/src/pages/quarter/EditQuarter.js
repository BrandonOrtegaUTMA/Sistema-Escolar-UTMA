import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Card, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Service from '../../services/Service'


function EditQuarter() {
    const [quarterData, setQuarterData] = useState({});
    const [selectedPayment, setSelectedPayment] = useState({});
    const [showRemove, setRemove] = useState(false);
    const { id_quarter, id_career } = useParams();

    useEffect(()=>{
        Swal.fire("Cuatrimestre", "Cargando cuatrimestre...");
        Swal.showLoading();
        Service.get('/quarter/'+id_quarter)
        .then((result)=>{
            if(result.data){
                setQuarterData(result.data.quarter);
                Swal.close()
            }
        })
    },[]);

    const removePayment = () => {
        setRemove(false);
        Swal.fire("Pago","Eliminando pago...");
        Swal.showLoading();
        const data = quarterData;
        data.payments = data.payments.filter((item)=>{
            return item._id !== selectedPayment._id
        })
        setQuarterData(data);
        Swal.close();
    }
    const submit = (e) => {
        e.preventDefault();
        Swal.fire("Cuatrimestre", "Guardando registro...");
        Swal.showLoading();
        Service.put('/quarter/'+id_quarter, quarterData, false)
        .then(response =>{
            if(response.data){
                window.location.href = "/quarter/list/" + id_career
            }else{
                Swal.fire(
                    'Error',
                    'Algo salio mal al intentar guardar la carrera',
                    'error'
                )
            }
        })
    }

    const onChange = (e)=>{
        const data = quarterData;
        data[e.target.name] = e.target.value;
        setQuarterData({...quarterData,...data});
    }

    const onChangeArray = (e, index)=>{
        const data = quarterData;
        if(e.target.name === 'price' && parseInt(e.target.value) < 0){
            (document.getElementById(e.target.id)).value = 0;
            data['payments'][index][e.target.name] = 0;
        }else{
            data['payments'][index][e.target.name] = e.target.name === 'price' ? parseInt(e.target.value): e.target.value;
        }
        setQuarterData({...quarterData, ...data});
    }

    const confirmRemove = (payment) => {    
        setSelectedPayment(payment);
        setRemove(true);
    }
    const addPayment = () => {
        const data = quarterData;
        data.payments?.push({
            concept:'',
            price:0,
        });
        setQuarterData({...quarterData,...data});
    }
  return (
    <div id="quarters-form">
        <Row>
            <Col xs={12} md={{span:8,offset:2}}>
                <Card>
                    <Card.Body>
                        <Card.Title>Editar Cuatrimestre {quarterData.number}</Card.Title>
                        <Form onSubmit={submit}>
                            <h3>Pagos registrados</h3>
                            {
                                quarterData.payments?.map((payment,key)=>(
                                    <React.Fragment key = {payment._id ? payment._id : key}>
                                        <Form.Group className="mb-3" controlId={"concept-"+key}>
                                            <Form.Label>Concepto</Form.Label>
                                            <Form.Control type="text" defaultValue={payment.concept} name="concept" onChange={(e) => onChangeArray(e, key)} required />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId={"price-"+key}>
                                            <Form.Label>Costo</Form.Label>
                                            <Form.Control type="number" defaultValue={payment.price} name="price" onChange={(e) => onChangeArray(e, key)} required />
                                        </Form.Group>
                                        <Button className="btn btn-danger mb-2" onClick={()=> confirmRemove(payment)}>
                                            Eliminar pago
                                        </Button>
                                        <hr/>
                                    </React.Fragment>
                                ))
                            }
                            <br/>
                            <Button className="btn btn-secondary mb-5" onClick={addPayment}>
                                + Agregar pago
                            </Button>
                            <Row className="mt-5">
                                <Col xs={12} md={2}>
                                    <Button variant="primary" type="submit" className="w-100">
                                        Guardar
                                    </Button>
                                </Col>
                                <Col xs={12} md={2}>
                                    <a className="ml-3 btn btn-danger w-100" href={"/quarter/list/" + id_career}>
                                        Cancelar
                                    </a>
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        <Modal show={showRemove} onHide={()=>{setRemove(false)}}>
            <Modal.Header closeButton>
                <Modal.Title>Eliminar pago</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                ¿Está seguro de eliminar el pago {selectedPayment?.concept}?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=>{setRemove(false)}}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={removePayment}>
                    Eliminar
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
  );
}

export default EditQuarter;
