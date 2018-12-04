import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import truffleContract from "truffle-contract";
import * as ethereumActions from './actions/ethereumActions';
import PropTypes from 'prop-types';
import getWeb3 from "./utils/getWeb3";
import CommunityCoin from "./contracts/CommunityCoin.json";

import TopNav from "./components/navigation/TopNav/TopNav";
import MainContent from "./components/mainContent/MainContent/MainContent";
import BottomNav from "./components/navigation/BottomNav/BottomNav";
import NoWeb3 from "./components/noWeb3Content/NoWeb3";
import Registration from "./components/accountCreation/Registration";
import RequestSent from "./components/accountCreation/RequestSent";

import "./utils/global.css"

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            web3Available: false,
            activatedTime: 0,
            activationRequestSubmitted: false,
            active: false,
            userType: '',
            firstName: ''
        };
    }

    componentDidMount = async () => {
        const {
            setWeb3Instance,
            setAccount,
            setCommunityProtocol
        } = this.props.ethereumActions;

        try {
            // CURRENTLY ONLY WORKS WITH NEW WEB 3 - NEED TO WRITE LEGACY SUPPORT
            // consider moving all of this into 'set up the environment' action
            // grab web3 instance
            const web3 = await getWeb3();
            setWeb3Instance(web3);
            // grab account
            const account = web3.eth.accounts;
            setAccount(account[0]);
            // grab the contract
            const cocoContract = truffleContract(CommunityCoin);
            cocoContract.setProvider(web3.currentProvider);
            const coco = await cocoContract.deployed();
            setCommunityProtocol(coco);
            this.setState({ web3Available: true });

            // identify user type if they are registered
            const accountInfo = await coco.getAccountInfo(account[0]);
            const personalInfo = await coco.getPersonalInfo(account[0]);
            const activatedTime = accountInfo[0].toNumber();
            const activationRequestSubmitted = accountInfo[1];
            const active = accountInfo[2];
            const userType = accountInfo[3];
            const firstName = personalInfo[1];
            this.setState({
                activatedTime,
                activationRequestSubmitted,
                active,
                userType,
                firstName
            });
            // need to check user type to render different menus and user block layout
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const {
            web3Available,
            activatedTime,
            activationRequestSubmitted
        } = this.state;
        let toRender;

        if (web3Available) {
            if (activationRequestSubmitted && activatedTime !== 0) {
                // approved active user
                toRender = (
                    <div className="app">
                        <TopNav />
                        <MainContent />
                        <BottomNav />
                    </div>
                );
            } else if (activationRequestSubmitted && activatedTime === 0) {
                // activation request submitted, but not approved
                toRender = (
                    <div className="app">
                        <RequestSent />
                    </div>
                );
            } else {
                // activation request never submitted
                // this person needs to see a form so they can submit their info
                toRender = (
                    <div className="app">
                        <Registration />
                    </div>
                );
            }
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

function mapStateToProps(state) { return {}; }

function mapDispatchToProps(dispatch) {
    return {
        ethereumActions: bindActionCreators(ethereumActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
