import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../../actions/userActions';

class AccountInfo extends Component {
    switchEditingOn = () => {
        this.props.switchEditingMode(true);
    }

    componentDidMount = async () => {
        const {
            userActions
        } = this.props;

        try {
            userActions.getUserInfo(11);
        } catch (error) {
            alert(`Failed to get user details.`);
            console.log(error);
        }
    }

    render() {
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
                    <button
                        onClick={this.switchEditingOn}
                    >
                        Edit
                    </button>
                </div>
            </div>
        );
    }
}

AccountInfo.propTypes = {
    userActions: PropTypes.object,
    profileImage: PropTypes.string,
    firstName: PropTypes.string,
    familyName: PropTypes.string,
    department: PropTypes.string,
    title: PropTypes.string,
    activatedTime: PropTypes.number,
    switchEditingMode: PropTypes.func
};

function mapStateToProps(state) {
    return {
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
        userActions: bindActionCreators(userActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountInfo);