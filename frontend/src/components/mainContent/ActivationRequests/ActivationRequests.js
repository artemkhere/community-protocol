import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as navigationActions from '../../../actions/navigationActions';
import UserBlock from "../UserBlock/UserBlock";
import './ActivationRequests.css';

class ActivationRequests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            department: '',
            title: '',
        };
    }

    searchInfoHandler = (field) => {
        switch (field) {
            case 'name':
                return (e) => { this.setState({ name: e.target.value }); }
            case 'department':
                return (e) => { this.setState({ department: e.target.value }); }
            case 'title':
                return (e) => { this.setState({ title: e.target.value }); }
            default:
                return;
        }
    }

    renderForm = () => {
        const {
            name,
            department,
            title,
        } = this.state;

        return (
            <div className="search-form-container">
                <input
                    type="text"
                    className="section-input"
                    placeholder="Name"
                    value={name}
                    onChange={this.searchInfoHandler('name')}
                />
                <input
                    type="text"
                    className="section-input"
                    placeholder="Department"
                    value={department}
                    onChange={this.searchInfoHandler('department')}
                />
                <input
                    type="text"
                    className="section-input"
                    placeholder="Title"
                    value={title}
                    onChange={this.searchInfoHandler('title')}
                />
            </div>
        );
    }

    render() {
        return (
            <div className="search-main-container">
                {this.renderForm()}
                <div
                    className="action-container"
                >
                    <button
                        className="solid orange large"
                    >
                        search
                    </button>
                </div>
                <h2 className="results-title orange">Results</h2>
                <UserBlock
                    colorTheme="orange"
                    userType="owner"
                    context="Activation Requests"
                />
                <UserBlock
                    colorTheme="orange"
                    userType="admin"
                    context="Activation Requests"
                />
                <UserBlock
                    colorTheme="orange"
                    userType="user"
                    context="Activation Requests"
                />
            </div>
        );
    }
}

ActivationRequests.propTypes = {
    navigationActions: PropTypes.object,
    loading: PropTypes.bool
};

function mapStateToProps(state) {
    return {
        loading: state.navigation.loading,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        navigationActions: bindActionCreators(navigationActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ActivationRequests);