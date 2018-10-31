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

    switchEditingMode = (editing) => {
        this.setState({ editing });
    }

    render() {
        return (
            <div className="balance-container">
                <div className="hollow-coins-container">
                    <div className="balance-container">
                        <div className="hollow-title-container">
                            <div className="hollow-icon">icon</div>
                            <h3>Hollow Coins</h3>
                        </div>
                        <div className="hollow-container blue">
                            <div className="balance-information-container">
                                <div className="state-name">
                                    Current Balance
                                </div>
                                <div className="state-balance">
                                    143
                                </div>
                            </div>
                            <div className="balance-action-container">
                                <button>
                                    harvest
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="balance-container">
                        <div className="hollow-title-container">
                            <div className="hollow-icon">icon</div>
                            <h3>Hollow Coins</h3>
                        </div>
                        <div className="hollow-container blue">
                            <div className="balance-information-container">
                                <div className="state-name">
                                    Current Balance
                                </div>
                                <div className="state-balance">
                                    143
                                </div>
                            </div>
                            <div className="balance-action-container">
                                <button>
                                    harvest
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
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
