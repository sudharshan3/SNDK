import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Modal, ModalHeader, ModalBody } from 'reactstrap';
// import DepImg from "../../assets/images/texa/customer.jpg"
// import './style.scss'


class CustomerDetails extends React.Component {



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
                            <ModalHeader toggle={this.toggleModal} className="modal-colored-header bg-info">Customer Details</ModalHeader>
                            <ModalBody>
                    <Row>
                        <Col md="3" className="mb-3">
                            <small className="mb-0 text-muted">
                                <strong>Customer Name:</strong>
                            </small>
                            <h5 className="mt-1">{this.props.data.firstName +" "+this.props.data.lastName}</h5>
                        </Col>
                        <Col md="3" className="mb-3">
                            <small className="mb-0 text-muted">
                                <strong>Pet Name:</strong>
                            </small>
                            <h5 className="mt-1">{this.props.data.petName}</h5>
                        </Col>
                        <Col md="3" className="mb-3">
                            <small className="mb-0 text-muted">
                                <strong>Pet Type:</strong>
                            </small>
                            <h5 className="mt-1">{this.props.data.petType}</h5>
                        </Col>
                        <Col md="3" className="mb-3">
                            <small className="mb-0 text-muted">
                                <strong>Pet :</strong>
                            </small>
                            <h5 className="mt-1">{this.props.data.petSpecies}</h5>
                        </Col>
                        <Col md="3" className="mb-3">
                            <small className="mb-0 text-muted">
                                <strong>Phone Number</strong>
                            </small>
                            <h5 className="mt-1">{this.props.data.cellPhoneNo}</h5>
                        </Col>
                        <Col md="3" className="mb-3">
                            <small className="mb-0 text-muted">
                                <strong>Email</strong>
                            </small>
                            <h5 className="mt-1">{this.props.data.email}</h5>
                        </Col>
                        
                    </Row>
                             
                            </ModalBody>
                        </Modal>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

export default CustomerDetails