import initialState from './initialUserState';
import {
    GET_USER_INFO, FETCH_USER_INFO, SET_USER_INFO, FETCH_USER_BALANCES,
    GET_USER_BALANCES
} from '../actions/actionTypes';

export default function user(state = initialState, action) {
    switch (action.type) {
        case GET_USER_INFO:
            return Object.assign({}, state, {
                profileImage: action.profileImage,
                firstName: action.firstName,
                familyName: action.familyName,
                department: action.department,
                title: action.title,
                activatedTime: action.activatedTime,
                activationRequest: action.activationRequest,
                active: action.active,
                // userType: action.userType,
            });
        case SET_USER_INFO:
            return Object.assign({}, state, {
                profileImage: action.profileImage,
                firstName: action.firstName,
                familyName: action.familyName,
                department: action.department,
                title: action.title
            });
        case GET_USER_BALANCES:
            return Object.assign({}, state, {
                hollowBalance: action.hollowBalance,
                currentSolidBalance: action.currentSolidBalance,
                unresolvedSolidBalance: action.unresolvedSolidBalance,
                lastHollowHarvest: action.lastHollowHarvest,
                lastSolidHarvest: action.lastSolidHarvest
            });
        default:
            return state;
    }
}
