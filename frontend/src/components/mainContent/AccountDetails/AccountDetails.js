import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as navigationActions from '../../../actions/navigationActions';
import * as userActions from '../../../actions/userActions';
import PropTypes from 'prop-types';
import AccountInfo from "./AccountInfo";
import AccountForm from "./AccountForm";
import './AccountDetails.css';

class AccountDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false
        };
    }

    render() {
        const {
            editing
        } = this.state;

        const {
            profileImage,
            firstName,
            familyName,
            department,
            title,
            activatedTime
        } = this.props;

        let toRender;

        if (editing) {
            toRender = (
                <AccountForm
                    profileImage={profileImage}
                    firstName={firstName}
                    familyName={familyName}
                    department={department}
                    title={title}
                />
            );
        } else {
            toRender = (
                <AccountInfo
                    profileImage={profileImage}
                    firstName={firstName}
                    familyName={familyName}
                    department={department}
                    title={title}
                    activatedTime={activatedTime}
                />
            );
        }

        return toRender;
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
