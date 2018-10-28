import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as navigationActions from '../../../actions/navigationActions';
import PropTypes from 'prop-types';
import './TopNav.css';

class TopNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stuff: []
        };
    }

    render() {
        return (
            <div className="top-nav">
                <div className="profile-info-container">
                    <div className="current-community">Lighthouse Labs</div>
                    <div
                        className="profile-access"
                        onClick={() => { this.props.navigationActions.changeView('ARTEM'); }}
                    >
                        icon
                    </div>
                </div>
                <div className="header-container">
                    <div className="header">Account Details</div>
                </div>
                <p>View -> {this.props.view}</p>
            </div>
        );
    }
}

TopNav.propTypes = {
    navigationActions: PropTypes.object,
    view: PropTypes.string
};

function mapStateToProps(state) {
    return {
        view: state.navigation.view
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
)(TopNav);
