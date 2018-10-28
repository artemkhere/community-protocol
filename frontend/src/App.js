import React, { Component } from 'react';
import truffleContract from "truffle-contract";
// import getWeb3 from "./utils/getWeb3";

import TopNav from "./components/navigation/TopNav/TopNav";
import BottomNav from "./components/navigation/BottomNav/BottomNav";

class App extends Component {
    render() {
        return (
            <div className="App">
                <TopNav />
                {/* <MainContent /> */}
                <BottomNav />
            </div>
        );
    }
}

export default App;
