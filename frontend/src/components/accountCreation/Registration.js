import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/userActions';

import './Registration.css';

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            familyName: '',
            department: '',
            title: '',
        };
    }

    userInfoHandler = (field) => {
        switch (field) {
            case 'firstName':
                return (e) => { this.setState({ firstName: e.target.value }); }
            case 'familyName':
                return (e) => { this.setState({ familyName: e.target.value }); }
            case 'department':
                return (e) => { this.setState({ department: e.target.value }); }
            case 'title':
                return (e) => { this.setState({ title: e.target.value }); }
            default:
                return;
        }
    }

    changeUserInfo = () => {
        const {
            firstName,
            familyName,
            department,
            title
        } = this.state;

        const {
            userActions,
            account,
            coco
        } = this.props;

        const userInfo = {
            profileImage: 'empty',
            firstName,
            familyName,
            department,
            title
        }
        
        userActions.requestActivation(account, coco, userInfo);
    }

    render() {
        const {
            firstName,
            familyName,
            department,
            title,
        } = this.state;

        return (
            <div className="registration-container">
                <h1 className="title">
                    Please Register To Participate
                </h1>
                <div className="section-container">
                    <div className="section-name">
                        first name
                    </div>
                    <input
                        type="text"
                        className="section-input"
                        value={firstName}
                        onChange={this.userInfoHandler('firstName')}
                    />
                </div>
                <div className="section-container">
                    <div className="section-name">
                        family name
                    </div>
                    <input
                        type="text"
                        className="section-input"
                        value={familyName}
                        onChange={this.userInfoHandler('familyName')}
                    />
                </div>
                <div className="section-container">
                    <div className="section-name">
                        department
                    </div>
                    <input
                        type="text"
                        className="section-input"
                        value={department}
                        onChange={this.userInfoHandler('department')}
                    />
                </div>
                <div className="section-container">
                    <div className="section-name">
                        title
                    </div>
                    <input
                        type="text"
                        className="section-input"
                        value={title}
                        onChange={this.userInfoHandler('title')}
                    />
                </div>
                <div className="actions-wrapper">
                    <button
                        className="solid purple"
                        onClick={this.changeUserInfo}
                    >
                        Submit Request
                    </button>
                </div>
            </div>
        );
    }
}

Registration.propTypes = {
    account: PropTypes.string,
    coco: PropTypes.object
};

function mapStateToProps(state) {
    return {
        account: state.ethereum.account,
        coco: state.ethereum.coco
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Registration);
