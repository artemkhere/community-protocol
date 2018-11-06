import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as navigationActions from '../../../actions/navigationActions';
import PropTypes from 'prop-types';
import AccountInfo from "./AccountInfo";
import AccountForm from "./AccountForm";
import './AccountDetails.css';

class AccountDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
        };
    }

    switchEditingMode = (editing) => {
        this.setState({ editing });
    }

    render() {
        const {
            editing
        } = this.state;

        let toRender;

        if (editing) {
            toRender = (
                <AccountForm
                    switchEditingMode={this.switchEditingMode}
                />
            );
        } else {
            toRender = (
                <AccountInfo
                    switchEditingMode={this.switchEditingMode}
                />
            );
        }

        return toRender;
    }
}

export default AccountDetails;
