import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as navigationActions from '../../../actions/navigationActions';
import PropTypes from 'prop-types';
import './TopNav.css';

class TopNav extends Component {
    handleAccountClick = () => {
        this.props.navigationActions.changeView('Account Details');
    }

    render() {
        const {
            view
        } = this.props;

        return (
            <div className="top-nav">
                <div className="profile-info-container">
                    <div className="current-community">Lighthouse Labs</div>
                    <div
                        className="profile-access"
                        onClick={this.handleAccountClick}
                    >
                        icon
                    </div>
                </div>
                <div className="header-container">
                    <div className="header">{view}</div>
                </div>
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
