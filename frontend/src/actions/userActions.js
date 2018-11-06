import * as types from './actionTypes';


export function getUserInfo(addr) {
    return {
        type: types.GET_USER_INFO,
        profileImage: 'https://i.imgur.com/eW6LMB6.jpg',
        firstName: 'Steve',
        familyName: 'Gomez',
        department: 'Engineering',
        title: 'Senior Developer',
        activatedTime: 123456,
        userType: 'user',
        hollowBalance: 11,
        currentSolidBalance: 222,
        lastHollowHarvest: 3333,
        lastSolidHarvest: 44444,
        activationRequested: true,
        activeStats: true
    };
    // return {
    //     type: types.GET_USER_INFO,
    //     profileImage,
    //     firstName,
    //     familyName,
    //     department,
    //     title,
    //     activatedTime,
    //     userType,
    //     hollowBalance,
    //     currentSolidBalance,
    //     lastHollowHarvest,
    //     lastSolidHarvest,
    //     activationRequested,
    //     activeStatus,
    // };
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

// export async function fetchUserInfo(addr) {
export function fetchUserInfo(addr) {
    // return dispatch => {
    //     return fetch(url(), {
    //             method: 'GET',
    //             mode: 'cors',
    //             credentials: 'include',
    //             headers: {
    //             'x-api-key': 'apiKey',
    //             'Accept': 'application/json'
    //         }
    //     })
    //     .then(response => response.json())
    //     .then(json => dispatch(receiveStuff(json)));
    // };

    // return async (dispatch) => {
    //     await coco.getProperties({ from: accounts[0] });

        // return fetch(url(), {
        //         method: 'GET',
        //         mode: 'cors',
        //         credentials: 'include',
        //         headers: {
        //         'x-api-key': 'apiKey',
        //         'Accept': 'application/json'
        //     }
        // })
        // .then(response => response.json())
        // .then(json => dispatch(getUserInfo(json)));
    // };
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
