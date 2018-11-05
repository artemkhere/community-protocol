import initialState from './initialEthereumState';
import {
    SET_WEB_INSTANCE, SET_ACCOUNT, SET_COMMUNITY_PROTOCOL
} from '../actions/actionTypes';

export default function navigation(state = initialState, action) {
    switch (action.type) {
        case SET_WEB_INSTANCE:
            return Object.assign({}, state, { web3: action.web3 });
        case SET_ACCOUNT:
            return Object.assign({}, state, { account: action.account });
        case SET_COMMUNITY_PROTOCOL:
            return Object.assign({}, state, { coco: action.coco });
        default:
            return state;
    }
}
