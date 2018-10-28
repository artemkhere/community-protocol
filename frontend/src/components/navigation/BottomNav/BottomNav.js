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
                <div className="menu-item-container">
                    <div className="menu-icon">icon</div>
                    <div className="menu-title">balance</div>
                </div>
                <div className="menu-item-container">
                    <div className="menu-icon">icon</div>
                    <div className="menu-title">search</div>
                </div>
            </div>
        );
    }
}

export default BottomNav;
