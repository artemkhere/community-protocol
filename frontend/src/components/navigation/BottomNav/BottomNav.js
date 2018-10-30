import React, { Component } from 'react';
import './BottomNav.css';

class BottomNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stuff: []
        };
    }

    render() {
        return (
            <div className="bottom-nav">
                <div className="menu-section">
                    <div className="menu-item-container">
                        <div className="menu-icon material-icons">account_balance_wallet</div>
                        <div className="menu-title">balance</div>
                    </div>
                </div>
                <div className="menu-section">
                    <div className="menu-item-container">
                        <div className="menu-icon material-icons">search</div>
                        <div className="menu-title">search</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BottomNav;
