import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as navigationActions from '../../../actions/navigationActions';
import * as userActions from '../../../actions/userActions';
import PropTypes from 'prop-types';
import './AccountDetails.css';

class AccountDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false
        };
    }

    renderUserInfo = () => {
        const {
            profileImage,
            firstName,
            familyName,
            department,
            title,
            activatedTime
        } = this.props;

        return (
            <div className="user-info-container">
                <div className="profile-img-container">
                    <img
                        className="profile-img"
                        src={profileImage}
                    />
                </div>
                <div className="section-container">
                    <div className="section-name">
                        first name
                    </div>
                    <div className="section-information">
                        {firstName}
                    </div>
                </div>
                <div className="section-container">
                    <div className="section-name">
                        family name
                    </div>
                    <div className="section-information">
                        {familyName}
                    </div>
                </div>
                <div className="section-container">
                    <div className="section-name">
                        department
                    </div>
                    <div className="section-information">
                        {department}
                    </div>
                </div>
                <div className="section-container">
                    <div className="section-name">
                        title
                    </div>
                    <div className="section-information">
                        {title}
                    </div>
                </div>
                <div className="section-container">
                    <div className="section-name">
                        active since
                    </div>
                    <div className="section-information">
                        {activatedTime}
                    </div>
                </div>
                <div className="actions-wrapper">
                    <button>Edit</button>
                </div>
            </div>
        );
    }

    renderUserForm = () => {
        const {
            profileImage,
            firstName,
            familyName,
            department,
            title,
            activatedTime
        } = this.props;

        return (
            <div className="user-info-container">
                aiiiiiaiaiaiaiia
                <div className="profile-img-container">
                    <img
                        className="profile-img"
                        src={profileImage}
                    />
                </div>
                <div className="section-container">
                    <div className="section-name">
                        first name
                    </div>
                    <div className="section-information">
                        {firstName}
                    </div>
                </div>
                <div className="section-container">
                    <div className="section-name">
                        family name
                    </div>
                    <div className="section-information">
                        {familyName}
                    </div>
                </div>
                <div className="section-container">
                    <div className="section-name">
                        department
                    </div>
                    <div className="section-information">
                        {department}
                    </div>
                </div>
                <div className="section-container">
                    <div className="section-name">
                        title
                    </div>
                    <div className="section-information">
                        {title}
                    </div>
                </div>
                <div className="section-container">
                    <div className="section-name">
                        active since
                    </div>
                    <div className="section-information">
                        {activatedTime}
                    </div>
                </div>
                <div className="actions-wrapper">
                    <button>Cancel</button>
                    <button>Save</button>
                </div>
            </div>
        );
    }

    render() {
        const { editing } = this.state;
        return editing ? this.renderUserForm() : this.renderUserInfo();
    }
}

AccountDetails.propTypes = {
    navigationActions: PropTypes.object,
    userActions: PropTypes.object,
    loading: PropTypes.bool,
    profileImage: PropTypes.string,
    firstName: PropTypes.string,
    familyName: PropTypes.string,
    department: PropTypes.string,
    title: PropTypes.string,
    activatedTime: PropTypes.number
};

function mapStateToProps(state) {
    return {
        loading: state.navigation.loading,
        profileImage: state.user.profileImage,
        firstName: state.user.firstName,
        familyName: state.user.familyName,
        department: state.user.department,
        title: state.user.title,
        activatedTime: state.user.activatedTime
    };
}

function mapDispatchToProps(dispatch) {
    return {
        navigationActions: bindActionCreators(navigationActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountDetails);
