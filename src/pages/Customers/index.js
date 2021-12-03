import React from 'react';
import PageTitle from '../../components/PageTitle';
import CustomerConfig from './CustomerConfig'
class Customer extends React.Component {

    render() {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[
                        { label: 'Customer', active: true },
                    ]}
                    title={'Customers'}
                />
                <CustomerConfig/>
            </>
        )
    }
}

export default Customer