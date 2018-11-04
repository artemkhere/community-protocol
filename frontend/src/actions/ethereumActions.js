import * as types from './actionTypes';

export function setWeb3Instance(view) {
    return { type: types.SET_WEB_INSTANCE, ethereum };
}

export function setAccount(view) {
    return { type: types.SET_ACCOUNT, ethereum };
}

export function setCommunityProtocol(view) {
    return { type: types.SET_COMMUNITY_PROTOCOL, ethereum };
}
