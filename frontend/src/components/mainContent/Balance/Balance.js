import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as navigationActions from '../../../actions/navigationActions';
import PropTypes from 'prop-types';
import './Balance.css';

class Balance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
        };
    }

    renderHollowCoins = () => {
        return (
            <div className="balance-container">
                <div className="balance-title-container">
                    <div className="hollow-icon" />
                    <h2 className="coin-definition">Hollow Coins</h2>
                </div>
                <div className="hollow-container blue">
                    <div className="balance-information-container">
                        <div className="state-name">
                            Current Balance
                        </div>
                    </div>
                    <div className="state-and-action-container">
                        <div className="state-balance">
                            11
                        </div>
                    </div>
                    <div className="balance-information-container">
                        <div className="state-name">
                            Available For Harvest
                        </div>
                    </div>
                    <div className="state-and-action-container">
                        <div className="state-balance">
                            143
                        </div>
                        <button className="solid blue">
                            harvest
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    renderSolidCoins = () => {
        return (
            <div className="balance-container">
                <div className="balance-title-container">
                    <div className="solid-icon" />
                    <h2 className="coin-definition">Solid Coins</h2>
                </div>
                <div className="solid-container blue">
                    <div className="balance-information-container">
                        <div className="state-name">
                            Current Balance
                        </div>
                    </div>
                    <div className="state-and-action-container">
                        <div className="state-balance">
                            76
                            <span className="translation">~$14.8</span>
                        </div>
                        <button className="solid white blue">
                            redeem
                        </button>
                    </div>
                    <div className="balance-information-container">
                        <div className="state-name">
                            Available For Harvest
                        </div>
                    </div>
                    <div className="state-and-action-container">
                        <div className="state-balance">
                            5
                        </div>
                        <button className="solid white blue">
                            harvest
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="balance-main-container">
                {this.renderHollowCoins()}
                {this.renderSolidCoins()}
            </div>
        );
    }
}

Balance.propTypes = {
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
)(Balance);
