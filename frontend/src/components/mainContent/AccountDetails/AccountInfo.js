import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AccountInfo extends Component {
    render() {
        const {
            profileImage,
            firstName,
            familyName,
            department,
            title,
            activatedTime
        } = this.props;

        return (
            <div className="user-info-container">
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
                <div className="section-container">
                    <div className="section-name">
                        active since
                    </div>
                    <div className="section-information">
                        {activatedTime}
                    </div>
                </div>
                <div className="actions-wrapper">
                    <button>Edit</button>
                </div>
            </div>
        );
    }
}

AccountInfo.propTypes = {
    profileImage: PropTypes.string,
    firstName: PropTypes.string,
    familyName: PropTypes.string,
    department: PropTypes.string,
    title: PropTypes.string,
    activatedTime: PropTypes.number
};

export default AccountInfo;
