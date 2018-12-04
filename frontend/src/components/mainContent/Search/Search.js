import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as navigationActions from '../../../actions/navigationActions';
import * as userActions from '../../../actions/userActions';
import Loader from 'react-loader-spinner';
import UserBlock from "../UserBlock/UserBlock";
import './Search.css';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            department: '',
            title: ''
        };
    }

    componentDidMount = async () => {
        const {
            userActions,
            account,
            coco
        } = this.props;

        userActions.fetchActiveList(account, coco);
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
        // const {
        //     navigationActions,
        //     userActions,
        //     account,
        //     coco
        // } = this.props;
        //
        // userActions.fetchAllUsers(account, coco);
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

    renderActiveList = () => {
        const {
            name,
            department,
            title
        } = this.state;

        const { activeList } = this.props;

        let toRender = false;

        if (activeList && activeList.length > 0) {
            toRender = this.props.activeList.map((user, index) => {
                if (
                    user.userAccount !== '0x0000000000000000000000000000000000000000'
                    && user.userAccount !== this.props.account
                ) {
                    return (
                        <UserBlock
                        colorTheme="purple"
                        userType="user"
                        context="Search"
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
                toRender = this.filterBySearch(activeList);
            }
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
            if (user.userAccount === '0x0000000000000000000000000000000000000000') { return; }

            let check = true;
            const userRender = (
                <UserBlock
                    colorTheme="purple"
                    userType="user"
                    context="Search"
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

    loading = () => {
        const { activeList } = this.props;
        let result = true;

        if (activeList && activeList.length > 0) {
            result = false;
        }

        return result;
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
                {this.loading() &&
                    <div className="loader-container">
                        <Loader
                            type="Puff"
                            color="#927AC9"
                            height="60"
                            width="60"
                        />
                    </div>
                }
                {!this.loading() && <h2 className="results-title">Results</h2>}
                {!this.loading() && this.renderActiveList()}
            </div>
        );
    }
}

Search.propTypes = {
    navigationActions: PropTypes.object,
    account: PropTypes.string,
    activeList: PropTypes.array,
    coco: PropTypes.object
};

function mapStateToProps(state) {
    return {
        activeList: state.user.activeList,
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
