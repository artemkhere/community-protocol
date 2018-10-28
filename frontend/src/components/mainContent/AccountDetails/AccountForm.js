import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AccountForm extends Component {
    render() {
        const {
            profileImage,
            firstName,
            familyName,
            department,
            title,
        } = this.props;

        return (
            <div className="user-info-container">
                aiiiiiaiaiaiaiia
                <div className="profile-img-container">
                    <img
                        className="profile-img"
                        src={profileImage}
                    />
                </div>
                <div className="section-container">
                    <div className="section-name">
                        first name
                    </div>
                    <div className="section-information">
                        {firstName}
                    </div>
                </div>
                <div className="section-container">
                    <div className="section-name">
                        family name
                    </div>
                    <div className="section-information">
                        {familyName}
                    </div>
                </div>
                <div className="section-container">
                    <div className="section-name">
                        department
                    </div>
                    <div className="section-information">
                        {department}
                    </div>
                </div>
                <div className="section-container">
                    <div className="section-name">
                        title
                    </div>
                    <div className="section-information">
                        {title}
                    </div>
                </div>
                <div className="actions-wrapper">
                    <button>Cancel</button>
                    <button>Save</button>
                </div>
            </div>
        );
    }
}

AccountForm.propTypes = {
    profileImage: PropTypes.string,
    firstName: PropTypes.string,
    familyName: PropTypes.string,
    department: PropTypes.string,
    title: PropTypes.string
};

export default AccountForm;
