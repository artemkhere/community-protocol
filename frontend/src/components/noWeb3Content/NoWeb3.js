import React, { Component } from 'react';
import './NoWeb3.css';

class NoWeb3 extends Component {
    render() {
        return (
            <div className="no-web3-container">
                <h1>No connection to Ethereum Blockchain</h1>
                <p>
                    Could not connect to the Community Protocol.
                    <br />
                    This app relies on connection to Ethereum blockchain to work.
                    Please make sure you have have
                    <a href="https://metamask.io/">MetaMask</a>
                    (or any other provider) installed and working correctly.
                </p>
            </div>
        );
    }
}

export default NoWeb3;
