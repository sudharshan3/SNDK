import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
import { Row, Col, Card, CardBody, Form, FormGroup, Input, Button, UncontrolledTooltip } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';

import paginationFactory from 'react-bootstrap-table2-paginator';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import { getCustomerList } from '../../redux/actions';
import LoaderWidget from '../../components/Loader';
import { API_BASE_URL } from '../../services/hostSetting';
import './styles.css';
import CustomerDetails from './CustomerDetails';
import classNames from 'classnames';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

const baseUrl = API_BASE_URL;


const CustomerConfig = (props) => {
   

    // const history = useNavigate();
    const [toggleDetailsModal, setToggleDetailsModal] = useState(false);
    const [customerData, setCustomerData] = useState(null);
    const [index, setIndex] = useState(null);

    const columns = [
        {
            dataField: 'userId',
            text: 'User ID',

            headerClasses: 'bg-info text-white py-2',
            sort: true,

            formatter: (cell, row, rowIndex, formatExtraData) => 

                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <p>{row.id}</p>
                </div>
       
            
        },
        {
            dataField: 'firstName',
            text: 'Customer Name',

            headerClasses: 'bg-info text-white py-2',
            sort: true,

            formatter: (cell, row, rowIndex, formatExtraData) => 

                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <p>{row.firstName}{row.lastName}</p>
                </div>
       
            
        },
        {
            dataField: 'petName',
            text: 'Pet Name',

            headerClasses: 'bg-info text-white py-2',
            sort: true,

            formatter: (cell, row, rowIndex, formatExtraData) => 

                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <p>{row.petName}</p>
                </div>
       
            
        },
        {
            dataField: 'cellPhoneNo',
            text: 'Phone Number',

            headerClasses: 'bg-info text-white py-2',
            sort: true,

            formatter: (cell, row, rowIndex, formatExtraData) => 

                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <p>{row.cellPhoneNo}</p>
                </div>
       
            
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
        if (props.customer && !props.customer.customer) {
            props.getCustomerList();
        }
     
    }, []);

    const handleDetailsModal = (row) => {
        setToggleDetailsModal(true);
        setCustomerData(row);
    };
    const closeDetailsModal = () => {
        setToggleDetailsModal(false);
        setCustomerData(null);
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
                {props.customer && props.customer.listloading && <LoaderWidget />}
                {props.customer && props.customer.customer && props.customer.customer.data && (
                   
                    <ToolkitProvider
                        bootstrap4
                        keyField="id"
                        data={props.customer && props.customer.customer && props.customer.customer.data}
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
                                                    <i className="mdi mdi-plus-circle mr-2"></i> Add New Customer
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
                            <CustomerDetails toggleDetailsModal={toggleDetailsModal} closeDetailsModal={closeDetailsModal}
                                data={customerData} />
                        }

             
            </React.Fragment>

            <ToastContainer />
        </>
    );
};
const mapStateToProps = (state) => {

    return {
        customer: state.Customer,
        
    };
};

export default connect(mapStateToProps, { getCustomerList})(
    CustomerConfig
);
