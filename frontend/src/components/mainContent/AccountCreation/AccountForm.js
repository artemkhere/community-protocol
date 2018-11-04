import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../../actions/userActions';

class AccountForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            profileImage: this.props.profileImage,
            firstName: this.props.firstName,
            familyName: this.props.familyName,
            department: this.props.department,
            title: this.props.title,
        };
    }

    userInfoHandler = (field) => {
        switch (field) {
            case 'profileImage':
                return (e) => { this.setState({ profileImage: e.target.value }); }
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

    switchEditingOff = () => {
        this.props.switchEditingMode(false);
    }

    changeUserInfo = () => {
        this.props.userActions.changeUserInfo(
            this.state.profileImage,
            this.state.firstName,
            this.state.familyName,
            this.state.department,
            this.state.title,
        );
        this.switchEditingOff();
    }

    render() {
        const {
            profileImage,
            firstName,
            familyName,
            department,
            title,
        } = this.state;

        return (
            <div className="user-info-container">
                <div className="profile-img-container">
                    <img
                        className="profile-img"
                        src={profileImage}
                    />
                    <input
                        type="text"
                        className="section-input"
                        value={profileImage}
                        onChange={this.userInfoHandler('profileImage')}
                    />
                </div>
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
                <div className="actions-wrapper multiple">
                    <button
                        onClick={this.switchEditingOff}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={this.changeUserInfo}
                    >
                        Save
                    </button>
                </div>
            </div>
        );
    }
}

AccountForm.propTypes = {
    userActions: PropTypes.object,
    profileImage: PropTypes.string,
    firstName: PropTypes.string,
    familyName: PropTypes.string,
    department: PropTypes.string,
    title: PropTypes.string,
    switchEditingMode: PropTypes.func
};

function mapStateToProps(state) {
    return {
        profileImage: state.user.profileImage,
        firstName: state.user.firstName,
        familyName: state.user.familyName,
        department: state.user.department,
        title: state.user.title
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
)(AccountForm);
