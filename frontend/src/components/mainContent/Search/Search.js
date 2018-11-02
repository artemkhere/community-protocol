import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as navigationActions from '../../../actions/navigationActions';
import PropTypes from 'prop-types';
import './Search.css';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            department: '',
            title: '',
        };
    }

    searchInfoHandler = (field) => {
        switch (field) {
            case 'name':
                return (e) => { this.setState({ name: e.target.value }); }
            case 'department':
                return (e) => { this.setState({ department: e.target.value }); }
            case 'title':
                return (e) => { this.setState({ title: e.target.value }); }
            default:
                return;
        }
    }

    renderForm = () => {
        const {
            name,
            department,
            title,
        } = this.state;

        return (
            <div className="search-form-container">
                <input
                    type="text"
                    className="section-input"
                    placeholder="Name"
                    value={name}
                    onChange={this.searchInfoHandler('name')}
                />
                <input
                    type="text"
                    className="section-input"
                    placeholder="Department"
                    value={department}
                    onChange={this.searchInfoHandler('department')}
                />
                <input
                    type="text"
                    className="section-input"
                    placeholder="Title"
                    value={title}
                    onChange={this.searchInfoHandler('title')}
                />
            </div>
        );
    }

    renderSolidCoins = () => {
        return (
            <div className="balance-container">
                <div className="balance-title-container">
                    <div className="solid-icon" />
                    <h2 className="coin-definition">Solid Coins</h2>
                </div>
                <div className="solid-container blue">
                    <div className="balance-information-container">
                        <div className="state-name">
                            Current Balance
                        </div>
                    </div>
                    <div className="state-and-action-container">
                        <div className="state-balance">
                            76
                            <span className="translation">
                            ~$14.8
                            </span>
                        </div>
                        <button className="solid white">
                            redeem
                        </button>
                    </div>
                    <div className="balance-information-container">
                        <div className="state-name">
                            Available For Harvest
                        </div>
                    </div>
                    <div className="state-and-action-container">
                        <div className="state-balance">
                            5
                        </div>
                        <button className="solid white">
                            harvest
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="search-main-container">
                {this.renderForm()}
                <div
                    className="action-container"
                >
                    <button
                        className="solid purple large"
                    >
                        search
                    </button>
                </div>
                <h2 className="results-title">Results</h2>
                {this.renderSolidCoins()}
            </div>
        );
    }
}

Search.propTypes = {
    navigationActions: PropTypes.object,
    loading: PropTypes.bool
};

function mapStateToProps(state) {
    return {
        loading: state.navigation.loading,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        navigationActions: bindActionCreators(navigationActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search);
