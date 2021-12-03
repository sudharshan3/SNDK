// @flow
import React from 'react';
import { Card, CardBody, Row, Col } from 'reactstrap';

import profileImg from '../../assets/images/avatar-blue.png';

import { getLoggedInUser, isUserAuthenticated } from '../../helpers/authUtils';
const UserBox = () => {
    return (
        <Card className="bg-info text-light">
            <CardBody className="profile-user-box">
                <Row>
                    <Col sm={8}>
                        <div className="media">
                            <span className="float-left m-2 mr-4">
                                <img
                                    src={profileImg}
                                    style={{ height: '100px' }}
                                    alt=""
                                    className="rounded-circle img-thumbnail"
                                />
                            </span>
                            <div className="media-body">
                                <h4 className="mt-1 mb-1">{getLoggedInUser().user.firstName +" "+ getLoggedInUser().user.lastName}</h4>
                                <p className="font-13 text-dark-50"> {getLoggedInUser().user.email}</p>

                                <ul className="mb-0 list-inline">
                                    <li className="list-inline-item mr-3">
                                        <h5 className="mb-1">{getLoggedInUser().user.country}</h5>
                                    
                                    </li>
                                    <li className="list-inline-item">
                                        <h5 className="mb-1">{getLoggedInUser().user.state}</h5>
                                      
                                    </li>
                                 
                                </ul>
                            </div>
                        </div>
                    </Col>

                    
                </Row>
            </CardBody>
        </Card>
    );
};

export default UserBox;
