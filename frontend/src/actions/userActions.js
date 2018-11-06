import * as types from './actionTypes';

export function fetchUserInfo(account, coco) {
    return async (dispatch) => {
        const info = await coco.getUserInfo(account, { from: account });
        const profileImage = info[0];
        const firstName = info[1];
        const familyName = info[2];
        const department = info[3];
        const title = info[4];
        const activatedTime = info[5].toNumber();
        const activationRequest = info[6];
        const active = info[7];
        // const userType = info[8];
        dispatch(getUserInfo(
            profileImage,
            firstName,
            familyName,
            department,
            title,
            activatedTime,
            activationRequest,
            active,
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
        // userType,
    };
}

export function setUserInfo(
    profileImage,
    firstName,
    familyName,
    department,
    title
) {
    return {
        type: types.SET_USER_INFO,
        profileImage,
        firstName,
        familyName,
        department,
        title
    };
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
