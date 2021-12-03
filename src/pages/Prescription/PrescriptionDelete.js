
import React, { Component } from 'react';
import { Row, Card, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';


class PrescriptionDelete extends React.Component {

    toggleModal = () => {
        this.props.closeDeleteModal()
    }

    deletePrescription = () => {

        this.props.getPrescriptionDelete(this.props.data._id)
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.prescription && this.props.prescription.prescriptionDelete ){
         
         
            if(prevProps.prescription.prescriptionDelete !== this.props.prescription.prescriptionDelete){
                // this.props.records.splice(this.props.index,1)           
                this.props.getPrescriptionList()
                this.toggleModal()
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                <Card className="dept-details-card">
                    <CardBody>
                        <Modal
                            isOpen={this.props.toggleDeleteModal}
                            toggle={this.toggleModal}
                            className="modal-dialog-top"
                            // size="lg"
                        >
                            <ModalHeader toggle={this.toggleModal} className="modal-colored-header bg-dark">Prescription Delete</ModalHeader>
                            <ModalBody>
                              <div className="text-center">
                                  <i className="widget-icon bg-danger-lighten text-danger uil uil-trash-alt"></i>
                                    <h4>Are you sure to delete this prescription ?</h4>
                                </div>
                            </ModalBody>
                            <ModalFooter >
                                <div className="text-center mx-auto">
                                <Button color="dark" onClick={this.toggleModal}>
                                    Cancel
                                </Button>{' '}
                                <Button color="danger" onClick={() => this.deletePrescription()}>
                                    Delete
                                </Button>
                                </div>
                            </ModalFooter>
                        </Modal>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

export default PrescriptionDelete