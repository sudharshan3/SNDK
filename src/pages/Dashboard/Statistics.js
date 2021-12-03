// @flow
import React, { useEffect } from 'react';
import { Row, Col } from 'reactstrap';

import StatisticsChartWidget from '../../components/StatisticsChartWidget';
import { connect } from 'react-redux';
import LoaderWidget from '../../components/Loader';
import { getPrescriptionList ,getCustomerList} from '../../redux/actions';
const Statistics = (props) => {

    useEffect(() => {
        if (props.prescription && !props.prescription.prescription) {
            props.getPrescriptionList();
        }
        if (props.customer && !props.customer.customer) {
            props.getCustomerList();
        }
     
    }, []);
    return (
        <React.Fragment>
            <Row>
                <Col md={6}>
                {props.prescription && props.prescription.listloading && <LoaderWidget />}
                {props.prescription && props.prescription.prescription && props.prescription.prescription.data && 
                
                <StatisticsChartWidget
                description="Prescriptions"
                title="Prescriptions"
                stats={props.prescription.prescription.data.length} 
                trend={{ textClass: 'text-success', icon: 'mdi mdi-arrow-up-bold', value: '3.00%' }}
                colors={['#727cf5']}
                data={[47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35]}>
                    
                </StatisticsChartWidget>
            
            
            }
                  
                </Col>
                <Col md={6}>
                {props.customer && props.customer.customer && props.customer.customer.data && 
                  <StatisticsChartWidget
                  description="Customers"
                  title="Customers"
                  stats={props.customer.customer.data.length} 
                  trend={{ textClass: 'text-success', icon: 'mdi mdi-arrow-up-bold', value: '3.00%' }}
                  colors={['#727cf5']}
                  data={[47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35]}></StatisticsChartWidget>
                }
                  
                </Col>

            
             
            </Row>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {

    return {
        prescription: state.Prescription,
        customer: state.Customer,
        
    };
};

export default connect(mapStateToProps, { getPrescriptionList, getCustomerList})(
    Statistics
);