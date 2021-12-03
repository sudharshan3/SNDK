import React, { Component } from 'react';
import { Card, CardBody, UncontrolledDropdown, DropdownToggle, DropdownItem, DropdownMenu, Button } from 'reactstrap';
import defaultavatar from '../../assets/images/avatar-blue.png'
// ChatProfile
class PrescriptionCard extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const user = this.props.user || {};
        const groups = user.groups ? user.groups.split() : [];

        return (
            <React.Fragment>
                {user && (
                    <Card>
                        <CardBody className="">
                            {/* <UncontrolledDropdown className="float-right">
                                <DropdownToggle tag="button" className="btn btn-sm btn-link rounded no-arrow p-0">
                                    <i className="mdi mdi-dots-horizontal"></i>
                                </DropdownToggle>

                                <DropdownMenu>
                                    <DropdownItem>View Full</DropdownItem>
                                    <DropdownItem>Edit Contact Info</DropdownItem>
                                    <DropdownItem>Remove</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown> */}

                            <div className="mt-2 text-center">
                                <img src={user.avatar || defaultavatar} alt="" className="img-thumbnail avatar-md rounded-circle" />
                                <h4>{user._id}</h4>
                            
                                <p className="mt-1 mb-1">
                                    <strong>
                                        <i className="uil uil-at"></i> 
                                    </strong>
                                {user.email}
                                </p>
                            

                                <p className=" mb-1">
                                    <strong>
                                        <i className="uil uil-phone"></i> 
                                    </strong>
                                   {user.phonenumber}
                                </p>


                            <div className="mt-2 text-center">
                                <hr className="" />

                                
                            <div className="d-flex justify-content-center align-items-center">
                                <i className="btn btn-success uil uil-edit-alt mr-3" onClick={()=>this.props.edit(user)}></i>
                                <i className="btn btn-danger uil uil-trash-alt" onClick={()=>this.props.deletePrescription(user)}></i>
                                </div>
                            </div>
                               
                            
                            </div>
                          

                        </CardBody>
                    </Card>
                )}
            </React.Fragment>
        );
    }
}

export default PrescriptionCard;
