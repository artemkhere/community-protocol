import * as types from './actionTypes';

export function fetchUserInfo(account, coco) {
    return async (dispatch) => {
        const personalInfo = await coco.getPersonalInfo(account, { from: account });
        const accountInfo = await coco.getAccountInfo(account, { from: account });
        const profileImage = personalInfo[0];
        const firstName = personalInfo[1];
        const familyName = personalInfo[2];
        const department = personalInfo[3];
        const title = personalInfo[4];
        const activatedTime = accountInfo[0].toNumber();
        const activationRequest = accountInfo[1];
        const active = accountInfo[2];
        const userType = accountInfo[3];
        dispatch(getUserInfo(
            profileImage,
            firstName,
            familyName,
            department,
            title,
            activatedTime,
            activationRequest,
            active,
            userType
        ));
    }
}

export function getUserInfo(
    profileImage,
    firstName,
    familyName,
    department,
    title,
    activatedTime,
    activationRequest,
    active,
    userType
) {
    return {
        type: types.GET_USER_INFO,
        profileImage,
        firstName,
        familyName,
        department,
        title,
        activatedTime,
        activationRequest,
        active,
        userType
    };
}

export function setUserInfo(
    account,
    coco,
    userInfo
) {
    return async (dispatch) => {
        try {
            await coco.setUserInfo(
                'empty',
                userInfo.firstName,
                userInfo.familyName,
                userInfo.department,
                userInfo.title,
                { from: account }
            );
            const userInfoUpdated = coco.UserInfoUpdated();
            userInfoUpdated.watch((err, result) => {
                if (err) {
                    console.log('Could not see userInfo update');
                } else {
                    dispatch(fetchUserInfo(account, coco));
                }
            });
        } catch (error) {
            console.log('Failed to push new user info.');
            console.log(error);
        }
    }
}

export function fetchUserBalances(account, coco) {
    return async (dispatch) => {
        const balances = await coco.getBalances({ from: account });
        const hollowBalance = balances[0].toNumber();
        const currentSolidBalance = balances[1].toNumber();
        const unresolvedSolidBalance = balances[2].toNumber();
        const lastHollowHarvest = balances[3].toNumber();
        const lastSolidHarvest = balances[4].toNumber();
        dispatch(getUserBalances(
            hollowBalance,
            currentSolidBalance,
            unresolvedSolidBalance,
            lastHollowHarvest,
            lastSolidHarvest
        ));
    }
}

export function getUserBalances(
    hollowBalance,
    currentSolidBalance,
    unresolvedSolidBalance,
    lastHollowHarvest,
    lastSolidHarvest
) {
    return {
        type: types.GET_USER_BALANCES,
        hollowBalance,
        currentSolidBalance,
        unresolvedSolidBalance,
        lastHollowHarvest,
        lastSolidHarvest
    };
}

export function requestActivation(account, coco, userInfo) {
    return async (dispatch) => {
        try {
            await coco.requestActivation(
                'empty',
                userInfo.firstName,
                userInfo.familyName,
                userInfo.department,
                userInfo.title,
                { from: account }
            );
            const activationRequested = coco.ActivationRequested();
            activationRequested.watch((err, result) => {
                if (err) {
                    console.log('Could not see activation request to be processed.');
                } else {
                    dispatch(fetchUserInfo(account, coco));
                }
            });
        } catch (error) {
            console.log('Failed to make activation request.');
            console.log(error);
        }
    }
}

export function fetchActivationRequests(account, coco) {
    return async (dispatch) => {
        try {
            const requests = await coco.getActivationRequests({ from: account });

            if (requests && requests.length > 0) {
                const allRequests = await requests.map(async (user) => {
                    const personalInfo = await coco.getPersonalInfo(user, { from: account });
                    const profileImage = personalInfo[0];
                    const firstName = personalInfo[1];
                    const familyName = personalInfo[2];
                    const department = personalInfo[3];
                    const title = personalInfo[4];
                    return {
                        profileImage,
                        firstName,
                        familyName,
                        department,
                        title
                    };
                });

                Promise.all(allRequests).then((results) => {
                    dispatch(setActivationRequestList(results));
                })
            }
        } catch (error) {
            console.log('Failed to fetch activation requests.');
            console.log(error);
        }
    }
}

export function setActivationRequestList(list) {
    return { type: types.SET_REQUEST_LIST, list };
}
