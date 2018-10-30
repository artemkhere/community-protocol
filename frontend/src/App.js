import React, { Component } from "react";
import truffleContract from "truffle-contract";
// import getWeb3 from "./utils/getWeb3";

import TopNav from "./components/navigation/TopNav/TopNav";
import MainContent from "./components/mainContent/MainContent/MainContent";
import BottomNav from "./components/navigation/BottomNav/BottomNav";

import "./utils/global.css"

class App extends Component {
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
