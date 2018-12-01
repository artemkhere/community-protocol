import React, { Component } from 'react';
import './RequestSent.css';

class RequestSent extends Component {
    render() {
        return (
            <div className="request-sent-container">
                <h1>Your activation request is in progress</h1>
                <p>
                    You succesfully submitted your activation request.
                    <br /><br />
                    Please wait until one of the admins approves it.
                </p>
            </div>
        );
    }
}

export default RequestSent;
