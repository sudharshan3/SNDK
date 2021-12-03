import React, { Component } from 'react';
import {
    Row,
    Col,
    Card,
    CardBody,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Spinner,
    Label,
} from 'reactstrap';
// import './style.scss'
import { AvForm, AvField } from 'availity-reactstrap-validation';
// import DepImg from "../../assets/images/texa/add-prescription.png"
import Select from 'react-select';
// import LoaderWidget from '../../components/Loader';
import { Base64 } from 'js-base64';
import defaultavatar from '../../assets/images/avatar-blue.png';
import './styles.css';
import { API_BASE_URL } from '../../services/hostSetting';

const baseUrl = API_BASE_URL;
const catergoryOptions = [
    {
        status: true,
        _id: '619ca1118f1d132ce319466f',
        name: 'AWS Engineer',
        created_by: '619b71002ed4085cc0c52619',
        createdAt: '2021-11-23T08:06:41.217Z',
        updatedAt: '2021-11-23T08:28:56.548Z',
        __v: 0,
        updated_by: '619b71002ed4085cc0c52619',
        deleted: false,
    },
];

class PrescriptionAddEdit extends React.Component {
    state = {
        selectedLead: null,
        isLoading: false,
        jid: null,
        title: null,
        company: null,
        desc: null,
        payment: null,
        category: null,
        tags: null,
    };

    toggleModal = () => {
        this.props.closeAddEditModal();
    };

    componentDidMount = () => {
        if (this.props.toggleAddEditModal) {
            if (this.props.data !== null) {
                this.setState({
                    jid: this.props.data.prescription_id,
                    title: this.props.data.title,
                    company: this.props.data.company,
                    desc: this.props.data.description,
                    payment: this.props.data.payment_terms,
                    category: this.props.data.category,
                    tags: this.props.data.tags,
                    disabledtype: true,
                });

                this.handleCategoryChange(
                    this.convertCategory(this.props.category).filter((item) => item.value === this.props.data._id)
                );
            }
        }
    };
    componentDidUpdate(prevProps, prevState) {

        if (this.props.prescription && this.props.prescription.prescriptionAdd) {
            if (prevProps.prescription.prescriptionAdd !== this.props.prescription.prescriptionAdd) {
                this.props.getPrescriptionList();
                this.toggleModal();
            }
        }
        if (this.props.prescription && this.props.prescription.prescriptionUpdate) {
            if (prevProps.prescription.prescriptionUpdate !== this.props.prescription.prescriptionUpdate) {
                this.props.getPrescriptionList();

                this.toggleModal();
            }
        }
    }

    addPrescription() {
        if (
            this.state.jid !== '' &&
            this.state.category !== '' &&
            this.state.payment !== '' &&
            this.state.title !== '' &&
            this.state.company !== '' &&
            this.state.desc !== '' &&
            this.state.tags !== '' &&
            this.state.jid !== null &&
            this.state.category !== null &&
            this.state.payment !== null &&
            this.state.title !== null &&
            this.state.company !== null &&
            this.state.desc !== null &&
            this.state.tags !== null
        ) {
            let formData = new FormData();
            let data = {
                prescription_id: this.state.jid,
                category: this.state.category.value,
                payment_terms: this.state.payment,
                title: this.state.title,
                company: this.state.company,
                tags: this.state.tags,
                description: this.state.desc,
            };

            this.props.getPrescriptionAdd(data);
        } else {
            this.props.emptyAllFields('Please Fill all the fields');
        }
    }

    updatePrescription = () => {
        if (
            this.state.jid !== '' &&
            this.state.category !== '' &&
            this.state.payment !== '' &&
            this.state.title !== '' &&
            this.state.company !== '' &&
            this.state.desc !== '' &&
            this.state.tags !== '' &&
            this.state.jid !== null &&
            this.state.category !== null &&
            this.state.payment !== null &&
            this.state.title !== null &&
            this.state.company !== null &&
            this.state.desc !== null &&
            this.state.tags !== null
        ) {
         
            let data = {
                id: this.props.data._id,
                prescription_id: this.state.jid,
                category: this.state.category.value,
                payment_terms: this.state.payment,
                title: this.state.title,
                company: this.state.company,
                tags: this.state.tags,
                description: this.state.desc,
            };

            this.props.getPrescriptionUpdate(data);
        } else {
            this.props.emptyAllFields('Please Fill all the fields');
        }
    };

    handleImageChange = (image) => {
        this.setState({ image_file: image.target.files[0] });
        this.setState(
            (image = {
                profileimage: URL.createObjectURL(image.target.files[0]),
            })
        );
    };
    convertCategory = (data) => {
        var categroyData = [];
        data &&
            data.forEach((value) => {
                categroyData.push({ label: value.name, value: value._id });
            });
        return categroyData;
    };
    handleCategoryChange = (category) => {
        this.setState({ category: category });
    };

    render() {
       
        const { selectedLead, lname, jid, title, company, desc, payment, category, tags } = this.state;

        const { data } = this.props;
        return (
            <React.Fragment>
                <Card className="dept-details-card">
                    <CardBody>
                        <Modal
                            isOpen={this.props.toggleAddEditModal}
                            toggle={this.toggleModal}
                            className="modal-dialog-centered"
                            size="lg">
                            <ModalHeader toggle={this.toggleModal} className="modal-colored-header bg-dark">
                                {data !== null ? 'Edit Prescription' : 'Add New Prescription'}
                            </ModalHeader>
                            <ModalBody>
                                {/* {this.props.employee && this.props.employee.employeelistloading && this.props.prescription && this.props.prescription.listloading && <LoaderWidget />} */}
                                <AvForm>
                                    <Row>
                                        <Col md={6}>
                                            <AvField
                                                name="prescriptionid"
                                                label="Prescription ID"
                                                type="text"
                                                value={jid || ''}
                                                onChange={(e) => {
                                                    this.setState({ jid: e.target.value });
                                                }}
                                                required
                                                placeholder="Enter Prescription ID"
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <AvField
                                                name="title"
                                                label="Title"
                                                type="text"
                                                value={title || ''}
                                                onChange={(e) => {
                                                    this.setState({ title: e.target.value });
                                                }}
                                                required
                                                placeholder="Enter Title"
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <AvField
                                                name="company"
                                                label="Company"
                                                type="text"
                                                value={company || ''}
                                                onChange={(e) => {
                                                    this.setState({ company: e.target.value });
                                                }}
                                                required
                                                placeholder="Enter Company"
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <AvField
                                                name="payment"
                                                label="Payment Terms"
                                                type="text"
                                                value={payment || ''}
                                                onChange={(e) => {
                                                    this.setState({ payment: e.target.value });
                                                }}
                                                required
                                                placeholder="Enter Payment Terms"
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <Label>Categroy</Label>
                                            <Select
                                                isClearable={true}
                                                onChange={(e) => {
                                                    this.handleCategoryChange(e);
                                                }}
                                                defaultValue={category || ''}
                                                placeholder="Select Category"
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                options={this.convertCategory(this.props.category)}></Select>
                                        </Col>
                                        <Col md={6}>
                                            <AvField
                                                name="tags"
                                                label="Tags"
                                                type="text"
                                                value={tags || ''}
                                                onChange={(e) => {
                                                    this.setState({ tags: e.target.value });
                                                }}
                                                required
                                                placeholder="Enter Category Terms"
                                            />
                                        </Col>
                                        <Col md={12}>
                                            <Label>Description</Label>
                                            <textarea
                                                className="form-control"
                                                rows="5"
                                                value={desc || ''}
                                                onChange={(e) => {
                                                    this.setState({ desc: e.target.value });
                                                }}></textarea>
                                        </Col>
                                    </Row>
                                </AvForm>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onClick={this.toggleModal}>
                                    Cancel
                                </Button>
                                {data !== null ? (
                                    <Button color="success" onClick={() => this.updatePrescription()}>
                                        Update Prescription
                                    </Button>
                                ) : (
                                    <>
                                        {/* <Button color="success" disabled>
                                            <Spinner className="spinner-border-sm mr-1" tag="span" color="white" />
                                            Loading...
                                        </Button> */}
                                        <Button color="success" onClick={() => this.addPrescription()}>
                                            Add Prescription
                                        </Button>
                                    </>
                                )}
                            </ModalFooter>
                        </Modal>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

export default PrescriptionAddEdit;
