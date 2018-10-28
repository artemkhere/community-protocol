import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AccountDetails from "../AccountDetails/AccountDetails";
import './MainContent.css';

class MainContent extends Component {
    renderCurrentView = () => {
        const {
            view
        } = this.props;

        switch (view) {
            case 'Home':
                return <div>Balance</div>;
            case 'Account Details':
                return <AccountDetails />
            default:
                return <div>Something is broken</div>;
        }
    }

    render() {
        return this.renderCurrentView();
    }
}

MainContent.propTypes = {
    view: PropTypes.string
};

function mapStateToProps(state) {
    return {
        view: state.navigation.view
    };
}

export default connect(
    mapStateToProps,
)(MainContent);
