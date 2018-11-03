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
        const {
            colorTheme,
            userType,
            context
        } = this.props;

        const sendButton = (
            <button
                className={`solid ${colorTheme}`}
                onClick={this.toggleSendMenu}
            >
                send coco
            </button>
        );

        const deactivateButton = (
            <button
                className={`solid ${colorTheme}`}
                // onClick={this.toggleSendMenu}
            >
                deactivate
            </button>
        );

        const adminButton = (
            <button
                className={`solid ${colorTheme}`}
                // onClick={this.toggleSendMenu}
            >
                make admin
            </button>
        );

        const activateButton = (
            <button
                className={`solid ${colorTheme}`}
                // onClick={this.toggleSendMenu}
            >
                activate
            </button>
        );

        let toRender;

        if (context === 'Search') {
            toRender = (
                <div className="actions-container">
                    {sendButton}
                    {(userType === 'admin' || userType === 'owner') && deactivateButton}
                    {(userType === 'owner') && adminButton}
                </div>
            );
        }

        if (context === 'Activation Requests') {
            toRender = (
                <div className="actions-container">
                    {activateButton}
                </div>
            );
        }

        return toRender;
    }

    renderSendMenu = () => {
        const colorTheme = this.props.colorTheme;

        return (
            <div className={`send-menu ${colorTheme}`}>
                <div className="information-section">
                    <input
                        type="number"
                        className="coco-input"
                        placeholder={this.state.sendValue}
                        value={this.state.sendValue}
                        onChange={this.changeSendValue}
                    />
                </div>
                <div className="action-section">
                    <button
                        className="solid"
                        onClick={this.toggleSendMenu}
                    >
                        cancel
                    </button>
                    <button
                        className={`solid ${colorTheme}`}
                        onClick={this.toggleSendMenu}
                    >
                        send coco
                    </button>
                </div>
            </div>
        );
    }

    renderUserType = () => {
        return (
            <div className={`user-type-container ${this.props.colorTheme}`}>
                <div className="user-role">user</div>
                <div className="user-active-status">active</div>
            </div>
        );
    }

    changeSendValue = (e) => {
        this.setState({ name: e.target.value });
    }

    toggleSendMenu = () => {
        this.setState({ sendMenuOpen: !this.state.sendMenuOpen });
    }

    render() {
        const {
            sendMenuOpen
        } = this.state;

        const {
            colorTheme,
            userType,
            context
        } = this.props;

        return (
            <div className={`user-container ${colorTheme}`}>
                {(userType === 'admin' || userType === 'owner') && this.renderUserType()}
                <div className="information-container">
                    <div className={`user-image ${colorTheme}`}>
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
    colorTheme: PropTypes.string,
    userType: PropTypes.string,
    context: PropTypes.string,
};

function mapDispatchToProps(dispatch) {
    return {
        navigationActions: bindActionCreators(navigationActions, dispatch)
    };
}

export default connect(
    mapDispatchToProps
)(UserBlock);