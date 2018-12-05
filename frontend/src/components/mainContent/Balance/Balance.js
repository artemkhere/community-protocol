import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as navigationActions from '../../../actions/navigationActions';
import * as userActions from '../../../actions/userActions';
import PropTypes from 'prop-types';
import './Balance.css';

class Balance extends Component {
    componentDidMount = () => {
        const {
            userActions,
            account,
            coco
        } = this.props;

        try {
            userActions.fetchUserBalances(account, coco);
        } catch (error) {
            console.log('Failed to get user balances.');
            console.log(error);
        }
    }

    calculateAvailableHarvest = (lastHollowHarvest) => {
        const currentMoment = new Date().getTime() / 1000;
        const available = Math.round((currentMoment - lastHollowHarvest) / 10);
        // const available = Math.round((currentMoment - lastHollowHarvest) / 17280);
        return available;
    }

    renderHollowCoins = () => {
        const {
            hollowBalance,
            lastHollowHarvest
        } = this.props;

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
                            {hollowBalance}
                        </div>
                    </div>
                    <div className="balance-information-container">
                        <div className="state-name">
                            Available For Harvest
                        </div>
                    </div>
                    <div className="state-and-action-container">
                        <div className="state-balance">
                            {this.calculateAvailableHarvest(lastHollowHarvest)}
                        </div>
                        <button
                            className="solid blue"
                            onClick={this.harvestHollowCoins}
                        >
                            harvest
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    harvestHollowCoins = async () => {
        const {
            userActions,
            account,
            coco
        } = this.props;

        try {
            await coco.harvestHollowCoins({ from: account });
            const hollowHarvest = coco.HollowHarvest();
            hollowHarvest.watch((err, result) => {
                if (err) {
                    console.log('Could not see Hollow Harvest event');
                } else {
                    userActions.fetchUserBalances(account, coco);
                }
            });
        } catch (error) {
            console.log('Failed to harvest Hollow Coins.');
            console.log(error);
        }
    }

    renderRealBalance = () => {
        const { currentSolidBalance } = this.props;
        let dollarValue;

        if (currentSolidBalance <= 0) {
            dollarValue = 0;
        } else {
            dollarValue = currentSolidBalance * 0.25;
        }

        return dollarValue;
    }

    renderSolidCoins = () => {
        const {
            currentSolidBalance,
            unresolvedSolidBalance
        } = this.props;

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
                            {currentSolidBalance}
                            <span className="translation">~${this.renderRealBalance()}</span>
                        </div>
                        <button
                            className="solid white blue"
                            onClick={this.redeemSolidCoins}
                        >
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
                            {unresolvedSolidBalance}
                        </div>
                        <button
                            className="solid white blue"
                            onClick={this.harvestSolidCoins}
                        >
                            harvest
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    harvestSolidCoins = async () => {
        const {
            userActions,
            account,
            coco
        } = this.props;

        try {
            await coco.harvestSolidCoins({ from: account });
            const solidHarvest = coco.SolidHarvest();
            solidHarvest.watch((err, result) => {
                if (err) {
                    console.log('Could not see Solid Harvest event.');
                } else {
                    userActions.fetchUserBalances(account, coco);
                }
            });
        } catch (error) {
            console.log('Failed to harvest Solid Coins.');
            console.log(error);
        }
    }

    redeemSolidCoins = async () => {
        const {
            userActions,
            account,
            coco
        } = this.props;

        try {
            await coco.redeemTokens({ from: account });
            const tokensRedeemed = coco.TokensRedeemed();
            tokensRedeemed.watch((err, result) => {
                if (err) {
                    console.log('Could not see Tokens Redeem event.');
                } else {
                    userActions.fetchUserBalances(account, coco);
                }
            });
        } catch (error) {
            console.log('Failed to redeem Solid Coins.');
            console.log(error);
        }
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
    userActions: PropTypes.object,
    loading: PropTypes.bool,
    account: PropTypes.string,
    coco: PropTypes.object
};

function mapStateToProps(state) {
    return {
        loading: state.navigation.loading,
        account: state.ethereum.account,
        coco: state.ethereum.coco,
        hollowBalance: state.user.hollowBalance,
        currentSolidBalance: state.user.currentSolidBalance,
        unresolvedSolidBalance: state.user.unresolvedSolidBalance,
        lastHollowHarvest: state.user.lastHollowHarvest,
        lastSolidHarvest: state.user.lastSolidHarvest
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
)(Balance);
