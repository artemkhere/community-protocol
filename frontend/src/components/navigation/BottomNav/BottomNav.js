import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as navigationActions from '../../../actions/navigationActions';
import PropTypes from 'prop-types';
import './BottomNav.css';

class BottomNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stuff: []
        };
    }

    handleMenuClick = (newState) => {
        return () => {
            this.props.navigationActions.changeView(newState);
        }
    }

    getColourClass = () => {
        switch (this.props.view) {
            case 'Balance':
                return ' blue';
            case 'Search':
                return ' purple';
            default:
                return ' grey';
        }
    }

    render() {
        const {
            view
        } = this.props;

        return (
            <div className="bottom-nav">
                <div
                    className={view === "Balance" ?
                            "menu-section blue"
                        :
                            "menu-section"
                    }
                >
                    <div
                        className="menu-item-container"
                        onClick={this.handleMenuClick('Balance')}
                    >
                        <div className="menu-icon material-icons">account_balance_wallet</div>
                        <div className="menu-title">
                            {view ==="Balance" && <div className="highlight" />}
                            <div className="title">balance</div>
                        </div>
                    </div>
                </div>
                <div
                    className={view === "Search" ?
                            "menu-section purple"
                        :
                            "menu-section"
                    }
                >
                    <div
                        className="menu-item-container"
                        onClick={this.handleMenuClick('Search')}
                    >
                        <div className="menu-icon material-icons">search</div>
                        <div className="menu-title">
                            {view ==="Search" && <div className="highlight" />}
                            <div className="title">search</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

BottomNav.propTypes = {
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
)(BottomNav);
