import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as navigationActions from '../../../actions/navigationActions';
import PropTypes from 'prop-types';
import './UserBlock.css';

class UserBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sendMenuOpen: false,
            sendValue: 0
        };
    }

    renderActions = () => {
        return (
            <div className="actions-container">
                <button
                    className="solid purple"
                    onClick={this.toggleSendMenu}
                >
                    send coco
                </button>
            </div>
        );
    }

    renderSendMenu = () => {
        return (
            <div className="send-menu">
                <input
                    type="number"
                    className="section-input"
                    placeholder={this.state.sendValue}
                    value={this.state.sendValue}
                    onChange={this.changeSendValue}
                />
            </div>
        );
    }

    changeSendValue = (e) => {
        this.setState({ name: e.target.value });
    }

    toggleSendMenu = () => {
        console.log(this.state.sendMenuOpen)
        this.setState({ sendMenuOpen: !this.state.sendMenuOpen });
    }

    render() {
        const {
            sendMenuOpen
        } = this.state;

        return (
            <div className="user-container purple">
                <div className="information-container">
                    <div className="user-image">
                        <div className="material-icons no-image">face</div>
                    </div>
                    <div className="user-information">
                        <h3 className="user-name">
                            Kimberley Clark
                        </h3>
                        <h4 className="user-department">
                            Human Hirement
                        </h4>
                        <h4 className="user-title">
                            Manager
                        </h4>
                    </div>
                </div>
                {!sendMenuOpen && this.renderActions()}
                {sendMenuOpen && this.renderSendMenu()}
            </div>
        );
    }
}

UserBlock.propTypes = {
    navigationActions: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
    return {
        navigationActions: bindActionCreators(navigationActions, dispatch)
    };
}

export default connect(
    mapDispatchToProps
)(UserBlock);
