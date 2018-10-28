import * as types from './actionTypes';

export function changeUserInfo(
    firstName, familyName, department, title
) {
    return {
        type: types.CHANGE_USER_INFO,
        firstName,
        familyName,
        department,
        title
    };
}

export function getUserInfo(addr) {
    return {
        type: types.GET_USER_INFO,
        profileImage,
        firstName,
        familyName,
        department,
        title
    };
}
export function fetchUserInfo() {
    return { type: types.FETCH_STUFF, stuff: newStuff };
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
}
