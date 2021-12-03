import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
import { Row, Col, Card, CardBody, Form, FormGroup, Input, Button, UncontrolledTooltip } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';

import paginationFactory from 'react-bootstrap-table2-paginator';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import { getPrescriptionList } from '../../redux/actions';
import LoaderWidget from '../../components/Loader';
import { API_BASE_URL } from '../../services/hostSetting';
import './styles.css';
import PrescriptionDetails from './PrescriptionDetails';
import classNames from 'classnames';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

const baseUrl = API_BASE_URL;


const PrescriptionConfig = (props) => {


    const [toggleDetailsModal, setToggleDetailsModal] = useState(false);
  
    const [prescriptionData, setPrescriptionData] = useState(null);
    const [index, setIndex] = useState(null);

    const columns = [
        {
            dataField: 'id',
            text: 'Prescription ID',

            headerClasses: 'bg-info text-white py-2',
            sort: true,

            formatter: (cell, row, rowIndex, formatExtraData) => 

                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <p>{row.id}</p>
                </div>
       
            
        },
        {
            dataField: 'petname',
            text: 'Pet Name',

            headerClasses: 'bg-info text-white py-2',
            sort: true,

            formatter: (cell, row, rowIndex, formatExtraData) => (
                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <p>{row.customer.petName}</p>
                </div>
            ),
        },
        {
            dataField: 'pettype',
            text: 'Pet Type',

            headerClasses: 'bg-info text-white py-2',
            sort: true,

            formatter: (cell, row, rowIndex, formatExtraData) => (
                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <h5>
                        <span className= {classNames('badge','p-1', row.customer.petType === 'DOG' ? 'badge-success' : 'badge-danger')}  
                >{row.customer.petType}</span>
                        </h5>
                </div>
            ),
        },
        {
            dataField: 'customerName',
            text: 'Customer Name',

            headerClasses: 'bg-info text-white py-2',
            sort: true,

            formatter: (cell, row, rowIndex, formatExtraData) => (
                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <p>{row.customer.firstName}</p>
                </div>
            ),
        },
        {
            dataField: 'customerPhone',
            text: 'Customer Phone Number',

            headerClasses: 'bg-info text-white py-2',
            sort: true,

            formatter: (cell, row, rowIndex, formatExtraData) => (
                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <p>{row.customer.cellPhoneNo}</p>
                </div>
            ),
        },
       
      
      
      
      
       
      

        {
            dataField: 'actions',
            text: 'Actions',
            headerClasses: 'bg-info text-white py-2',
            formatter: (cell, row, rowIndex, formatExtraData) => (
                <div style={{ lineHeight: 'normal', margin: 0, cursor: 'pointer' }}>
                    <i className="uil uil-eye btn btn-sm btn-outline-success mr-2" id="edit" onClick={() => handleDetailsModal(row)}></i>
                    
                    <UncontrolledTooltip placement="top" target="edit">
                        View Details
                    </UncontrolledTooltip>
                 
                </div>
            ),
        },
    ];

    useEffect(() => {
        if (props.prescription && !props.prescription.prescription) {
            props.getPrescriptionList();
        }
     
    }, []);

    const handleDetailsModal = (row) => {
        setToggleDetailsModal(true);
        setPrescriptionData(row);
    };
    const closeDetailsModal = () => {
        setToggleDetailsModal(false);
        setPrescriptionData(null);
    };


  
    const { SearchBar } = Search;
    const defaultSorted = [
        {
            dataField: 'id',
            order: 'asc',
        },
    ];

    return (
        <>
            <React.Fragment>
                {props.prescription && props.prescription.listloading && <LoaderWidget />}
                {props.prescription && props.prescription.prescription && props.prescription.prescription.data && (
                   
                    <ToolkitProvider
                        bootstrap4
                        keyField="id"
                        data={props.prescription && props.prescription.prescription && props.prescription.prescription.data}
                        columns={columns}
                        search>
                        {(props) => (
                            <Card>
                                <CardBody>
                                    <React.Fragment>
                                        <Row>
                                            <Col>
                                                <SearchBar
                                                    {...props.searchProps}
                                                    className="form-control w-100"
                                                    style={{ width: '100%' }}
                                                />
                                            </Col>
                                            <Col className="text-right">
                                                <Button
                                                    color="danger"
                                                    className="mb-2"
                                                   >
                                                    <i className="mdi mdi-plus-circle mr-2"></i> Add New Prescription
                                                </Button>
                                            </Col>
                                        </Row>

                                        <BootstrapTable
                                            {...props.baseProps}
                                            
                                            bordered={false}
                                            defaultSorted={defaultSorted}
                                            hover
                                         
                                            pagination={paginationFactory({ sizePerPage: 10 })}
                                            wrapperClasses="table-responsive"
                                        />
                                    </React.Fragment>
                                </CardBody>
                            </Card>
                        )}
                    </ToolkitProvider>
                  
                )}

                {toggleDetailsModal &&
                            <PrescriptionDetails toggleDetailsModal={toggleDetailsModal} closeDetailsModal={closeDetailsModal}
                                data={prescriptionData} />
                        }

             
            </React.Fragment>

            <ToastContainer />
        </>
    );
};
const mapStateToProps = (state) => {

    return {
        prescription: state.Prescription,
        
    };
};

export default connect(mapStateToProps, { getPrescriptionList})(
    PrescriptionConfig
);
