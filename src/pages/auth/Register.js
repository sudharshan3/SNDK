import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { Container, Row, Col, Card, CardBody, Label, FormGroup, Button, Alert } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';

import { registerUser } from '../../redux/actions';
import { isUserAuthenticated } from '../../helpers/authUtils';
import LoaderWidget from '../../components/Loader';
import logo from '../../assets/images/sndklogo.png';

class Register extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.handleValidSubmit = this.handleValidSubmit.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    /**
     * Handles the submit
     */
    handleValidSubmit = (event, values) => {
        const data ={
            email: values.email,
            password: values.password,
            firstName: values.firstname,
            lastName: values.lastname,
            phoneNo: values.phone,
            npiId: values.npi,
            address1: values.address1,
            address2: values.address2,
            city: values.city,
            state: values.state,
            postalCode: values.pincode,
        }
        this.props.registerUser(
            data
        );
    };

    /**
     * Redirect to root
     */
    renderRedirectToRoot = () => {
        const isAuthTokenValid = isUserAuthenticated();
        if (isAuthTokenValid) {
            return <Redirect to="/" />;
        }
    };

    /**
     * Redirect to confirm
     */
    renderRedirectToConfirm = () => {
        return <Redirect to="/confirm" />;
    };

    render() {
        const isAuthTokenValid = isUserAuthenticated();
        return (
            <React.Fragment>
                {this.renderRedirectToRoot()}

                {this.props.user && this.renderRedirectToConfirm()}

                {(this._isMounted || !isAuthTokenValid) && (
                    <div className="account-pages ">
                        <Container>
                            <Row className="justify-content-center">
                                <Col lg={8}>
                                    <Card>
                                        <div className="card-header py-2 text-center bg-light">
                                            <Link to="/">
                                                <span>
                                                    <img src={logo} alt="" height="80" />
                                                </span>
                                            </Link>
                                        </div>

                                        <CardBody className="p-3 position-relative">
                                            {/* preloader */}
                                            {this.props.loading && <LoaderWidget />}

                                            <div className="text-center w-75 m-auto">
                                                <h4 className="text-dark-50 text-center m-0 font-weight-bold">
                                                    REGISTER
                                                </h4>
                                            </div>

                                            {this.props.error && (
                                                <Alert color="danger" isOpen={this.props.error ? true : false}>
                                                    <div>{this.props.error}</div>
                                                </Alert>
                                            )}

                                            <AvForm onValidSubmit={this.handleValidSubmit}>
                                                <Label>Full Name</Label>
                                                <Row>
                                                    <Col md={6}>
                                                        <AvField
                                                            name="firstname"
                                                            placeholder="Enter your First name"
                                                            required
                                                        />
                                                    </Col>
                                                    <Col md={6}>
                                                        <AvField
                                                            name="lastname"
                                                            placeholder="Enter your Last name"
                                                            required
                                                        />
                                                    </Col>
                                                    <Col md={6}>
                                                        <AvField
                                                            type="email"
                                                            name="email"
                                                            label="Email address"
                                                            placeholder="Enter your email"
                                                            required
                                                        />
                                                    </Col>
                                                    <Col md={6}>
                                                        <AvGroup>
                                                            <Label for="password">Password</Label>
                                                            <AvInput
                                                                type="password"
                                                                name="password"
                                                                id="password"
                                                                placeholder="Enter your password"
                                                                required
                                                            />
                                                            <AvFeedback>This field is invalid</AvFeedback>
                                                        </AvGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <AvField
                                                            type="tel"
                                                            name="phone"
                                                            label="Phone Number"
                                                            placeholder="Enter Phone Number"
                                                            required
                                                        />
                                                    </Col>
                                                    <Col md={6}>
                                                        <AvField
                                                            type="text"
                                                            name="npi"
                                                            label="NPI ID"
                                                            placeholder="Enter NPI ID"
                                                            required
                                                        />
                                                    </Col>
                                                    <Col md={6}>
                                                        <AvField
                                                            type="text"
                                                            name="address1"
                                                            label="Address Line 1"
                                                            placeholder="Enter Address Line 1"
                                                            required
                                                        />
                                                    </Col>
                                                    <Col md={6}>
                                                        <AvField
                                                            type="text"
                                                            name="address2"
                                                            label="Address Line 2"
                                                            placeholder="Enter Address Line 2"
                                                            required
                                                        />
                                                    </Col>
                                                    <Col md={4}>
                                                        <AvField
                                                            type="text"
                                                            name="city"
                                                           
                                                            placeholder="Enter City"
                                                            required
                                                        />
                                                    </Col>
                                                    <Col md={4}>
                                                        <AvField
                                                            type="text"
                                                            name="state"
                                                          
                                                            placeholder="Enter State"
                                                            required
                                                        />
                                                    </Col>
                                                    <Col md={4}>
                                                        <AvField
                                                            type="number"
                                                            name="pincode"
                                                   
                                                            placeholder="Enter Pincode"
                                                            required
                                                        />
                                                    </Col>
                                                </Row>

                                                <FormGroup className="text-center">
                                                    <Button className="btn-block" color="info">
                                                        Submit
                                                    </Button>
                                                </FormGroup>
                                            </AvForm>
                                            <hr />
                                            <p className="text-muted mb-0 mt-2 text-center">
                                                Already have an account?{' '}
                                                <Link to="/account/login" className="text-muted ml-1">
                                                    <b>Sign In</b>
                                                </Link>
                                            </p>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    const { user, loading, error } = state.Auth;
    return { user, loading, error };
};

export default connect(mapStateToProps, { registerUser })(Register);
