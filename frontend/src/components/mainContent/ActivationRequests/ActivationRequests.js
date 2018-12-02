import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as userActions from '../../../actions/userActions';
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
            activationRequestList: this.props.activationRequestList ? this.props.activationRequestList : []
        };
    }

    componentDidMount = () => {
        const {
            userActions,
            account,
            coco
        } = this.props;

        userActions.fetchActivationRequests(account, coco);
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

    renderRequestList = () => {
        const {
            name,
            department,
            title
        } = this.state;

        const list = this.state.activationRequestList;

        let toRender = list.map((user, index) => {
            if (user.userAccount !== '0x0000000000000000000000000000000000000000') {
                return (
                    <UserBlock
                        colorTheme="orange"
                        userType="user"
                        context="Activation Requests"
                        firstName={user.firstName}
                        familyName={user.familyName}
                        department={user.department}
                        title={user.title}
                        userAccount={user.userAccount}
                        key={user.firstName + user.familyName + index}
                    />
                );
            }
        });

        if (name.length > 0 || department.length > 0 || title.length > 0) {
            toRender = this.filterBySearch(list);
        }

        return toRender;
    }

    filterBySearch = (list) => {
        const {
            name,
            department,
            title
        } = this.state;

        const filtered = list.map((user, index) => {
            if (user.userAccount !== '0x0000000000000000000000000000000000000000') { return; }

            let check = true;
            const userRender = (
                <UserBlock
                    colorTheme="orange"
                    userType="user"
                    context="Activation Requests"
                    firstName={user.firstName}
                    familyName={user.familyName}
                    department={user.department}
                    title={user.title}
                    userAccount={user.account}
                    key={user.firstName + user.familyName + index}
                />
            );
            const userName = user.firstName + user.familyName;

            if (userName.toLowerCase().indexOf(name) === -1) { check = false; }
            if (user.department.toLowerCase().indexOf(department) === -1) { check = false; }
            if (user.title.toLowerCase().indexOf(title) === -1) { check = false; }

            if (check) { return userRender; }
        });

        return filtered;
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
                {this.renderRequestList()}
            </div>
        );
    }
}

ActivationRequests.propTypes = {
    navigationActions: PropTypes.object,
    userActions: PropTypes.object,
    loading: PropTypes.bool,
    activationRequestList: PropTypes.array,
    account: PropTypes.string,
    coco: PropTypes.object
};

function mapStateToProps(state) {
    return {
        loading: state.navigation.loading,
        activationRequestList: state.user.activationRequestList,
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
)(ActivationRequests);
