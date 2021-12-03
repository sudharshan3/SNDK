import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Modal, ModalHeader, ModalBody } from 'reactstrap';
// import DepImg from "../../assets/images/texa/prescription.jpg"
// import './style.scss'


class PrescriptionDetails extends React.Component {



    toggleModal = () => {
        this.props.closeDetailsModal()
    }

    render() {

        return (
            <React.Fragment>
                <Card className="dept-details-card">
                    <CardBody>
                        <Modal
                            isOpen={this.props.toggleDetailsModal}
                            toggle={this.toggleModal}
                            className="modal-dialog-centered"
                            size="lg"
                        >
                            <ModalHeader toggle={this.toggleModal} className="modal-colored-header bg-info">Prescription Details</ModalHeader>
                            <ModalBody>
                                {this.props.data && this.props.data.drugs &&
                                this.props.data.drugs.map((drug, index) => {
                                    return (
                                        <Row key={index} className="pl-3">
                                         
                                                
                                                    <Col   md="4" className="mt-3 border-bottom">
                                                        <div className="dept-details-card-title">
                                                        <small className="text-primary font-weight-bold"><i className="uil   uil-medkit mr-1"></i> Drug Name</small>
                                                            <h5>{drug.drugName}</h5>
                                                        </div>
                                                    </Col>
                                                    <Col  md="4" className="mt-3 border-bottom">
                                                        <div className="dept-details-card-title">
                                                        <small className="text-primary font-weight-bold"><i className="uil   uil-heart-medical mr-1"></i> Quantity</small>
                                                            <h5>{drug.quantity}</h5>
                                                        </div>
                                                    </Col>
                                                    <Col  md="4" className="mt-3 border-bottom">
                                                        <div className="dept-details-card-title">
                                                        <small className="text-primary font-weight-bold"><i className="uil  uil-syringe mr-1"></i> Refill</small>
                                                            <h5>{drug.refill}</h5>
                                                        </div>
                                                    </Col>
                                                    <Col  md="4" className="mt-3 border-bottom">
                                                        <div className="dept-details-card-title">
                                                        <small className="text-primary font-weight-bold"><i className="uil  uil-syringe mr-1"></i> Directions</small>
                                                            <h5>{drug.directions}</h5>
                                                        </div>
                                                    </Col>
                                                    <Col  md="4" className="mt-3 border-bottom">
                                                        <div className="dept-details-card-title">
                                                        <small className="text-primary font-weight-bold"><i className="uil  uil-syringe mr-1"></i> Note</small>
                                                            <h5>{drug.note}</h5>
                                                        </div>
                                                    </Col>
                                            
                                        </Row>
                                 
                                 )
                                }
                                )
                            
                                  
                                
                                }
                             
                            </ModalBody>
                        </Modal>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

export default PrescriptionDetails