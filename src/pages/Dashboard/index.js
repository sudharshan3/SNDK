// @flow
import React from 'react';
import { Row, Col } from 'reactstrap';

import PageTitle from '../../components/PageTitle';
import Statistics from './Statistics';

import UserBox from './UserBox';

const AdminDashboard = () => {
    return (
        <React.Fragment>
            <PageTitle
                breadCrumbItems={[{ label: 'Dashboard', path: '/dashboard', active: true }]}
                title={'Dashboard'}
            />
<UserBox/>
            <Statistics />
        </React.Fragment>
    );
};

export default AdminDashboard;
