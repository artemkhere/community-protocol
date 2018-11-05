import React, { Component } from "react";
import truffleContract from "truffle-contract";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ethereumActions from '../../../actions/ethereumActions';
import PropTypes from 'prop-types';
import getWeb3 from "./utils/getWeb3";
import CommunityCoin from "./contracts/CommunityCoin.json";

import TopNav from "./components/navigation/TopNav/TopNav";
import MainContent from "./components/mainContent/MainContent/MainContent";
import BottomNav from "./components/navigation/BottomNav/BottomNav";
import NoWeb3 from "./components/noWeb3Content/NoWeb3";

import "./utils/global.css"

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            web3Available: false
        };
    }

    componentDidMount = async () => {
        const {
            setWeb3Instance,
            setAccount,
            setCommunityProtocol
        } = this.props;

        try {
            // consider moving all of this into 'set up the environment' action
            
            // grab web3 instance
            const web3 = await getWeb3();
            setWeb3Instance(web3);
            // grab account
            const accounts = await web3.eth.getAccounts();
            setAccount(accounts[0]);
            // grab the contract
            const cocoContract = truffleContract(CommunityCoin);
            cocoContract.setProvider(web3.currentProvider);
            const coco = await cocoContract.deployed();
            setCommunityProtocol(coco);

            this.setState({ web3Available: true });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        let toRender;

        if (this.state.web3Available) {
            toRender = (
                <div className="app">
                    <TopNav />
                    <MainContent />
                    <BottomNav />
                </div>
            );
        } else {
            toRender = (
                <div className="app">
                    <NoWeb3 />
                </div>
            );
        }

        return toRender;
    }
}

App.propTypes = {
    ethereumActions: PropTypes.object
};

function mapDispatchToProps(dispatch) {
    return {
        ethereumActions: bindActionCreators(ethereumActions, dispatch)
    };
}

export default connect(
    mapDispatchToProps
)(App);

export default App;
