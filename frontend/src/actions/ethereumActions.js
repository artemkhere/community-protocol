import * as types from './actionTypes';

export function setWeb3Instance(web3) {
    return { type: types.SET_WEB_INSTANCE, web3 };
}

export function setAccount(account) {
    return { type: types.SET_ACCOUNT, account };
}

export function setCommunityProtocol(coco) {
    return { type: types.SET_COMMUNITY_PROTOCOL, coco };
}
