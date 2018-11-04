import React, { Component } from "react";
import truffleContract from "truffle-contract";
import getWeb3 from "./utils/getWeb3";
import CommunityCoin from "./contracts/CommunityCoin.json";

import TopNav from "./components/navigation/TopNav/TopNav";
import MainContent from "./components/mainContent/MainContent/MainContent";
import BottomNav from "./components/navigation/BottomNav/BottomNav";

import "./utils/global.css"

class App extends Component {
    componentDidMount = async () => {
        try {
            const web3 = await getWeb3();
            // const accounts = await web3.eth.getAccounts();
            //
            // const PropertyContract = truffleContract(Property);
            // PropertyContract.setProvider(web3.currentProvider);
            // const propertyInstance = await PropertyContract.deployed();
            //
            // const PropertyTokenContract = truffleContract(PropertyToken);
            // PropertyTokenContract.setProvider(web3.currentProvider);
            // const propertyTokenInstance = await PropertyTokenContract.deployed();
            //
            // const PropertyRegistryContract = truffleContract(PropertyRegistry);
            // PropertyRegistryContract.setProvider(web3.currentProvider);
            // const propertyRegistryInstance = await PropertyRegistryContract.deployed();
            //
            // this.setState({
            //     web3,
            //     accounts,
            //     propertyContract: propertyInstance,
            //     propertyTokenContract: propertyTokenInstance,
            //     propertyRegistryContract: propertyRegistryInstance
            // },
            //     this._getTokenBalance
            // );
        } catch (error) {
            alert(`Failed to load web3, accounts, or contract. Check console for details.`);
            console.log(error);
        }
    }

    render() {
        return (
            <div className="app">
                <TopNav />
                <MainContent />
                <BottomNav />
            </div>
        );
    }
}

export default App;
