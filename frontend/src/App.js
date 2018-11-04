import React, { Component } from "react";
import truffleContract from "truffle-contract";
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
        try {
            // grab web3 instance
            const web3 = await getWeb3();
            // push it to state
            // grab accounts
            // const accounts = await web3.eth.getAccounts();
            // push them to state
            //
            // grab the contracts and push them to state
            // const PropertyContract = truffleContract(Property);
            // PropertyContract.setProvider(web3.currentProvider);
            // const propertyInstance = await PropertyContract.deployed();
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

export default App;
