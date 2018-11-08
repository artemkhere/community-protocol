import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as navigationActions from '../../../actions/navigationActions';
import * as userActions from '../../../actions/userActions';
import UserBlock from "../UserBlock/UserBlock";
import './Search.css';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            department: '',
            title: '',
            users: []
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

    searchUsers = async () => {
        const {
            navigationActions,
            userActions,
            account,
            coco
        } = this.props;

        try {
            navigationActions.toggleLoading(true);
            const users = await coco.getAllUsers({ from: account });
            console.log(users);
        } catch (error) {
            navigationActions.toggleLoading(false);
            console.log(error);
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
                        className="solid purple large"
                        onClick={this.searchUsers}
                    >
                        search
                    </button>
                </div>
                <h2 className="results-title">Results</h2>
                {this.props.loading && <h1>LOADING!</h1>}
                <UserBlock
                    colorTheme="purple"
                    userType="owner"
                    context="Search"
                />
                <UserBlock
                    colorTheme="purple"
                    userType="admin"
                    context="Search"
                />
                <UserBlock
                    colorTheme="purple"
                    userType="user"
                    context="Search"
                />
            </div>
        );
    }
}

Search.propTypes = {
    navigationActions: PropTypes.object,
    loading: PropTypes.bool,
    account: PropTypes.string,
    coco: PropTypes.object
};

function mapStateToProps(state) {
    return {
        loading: state.navigation.loading,
        account: state.ethereum.account,
        coco: state.ethereum.coco
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
)(Search);
