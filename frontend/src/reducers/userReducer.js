import initialState from './initialUserState';
import {
    GET_USER_INFO, FETCH_USER_INFO, SET_USER_INFO
} from '../actions/actionTypes';

export default function navigation(state = initialState, action) {
    switch (action.type) {
        case GET_USER_INFO:
            return Object.assign({}, state, {
                profileImage: action.profileImage,
                firstName: action.firstName,
                familyName: action.familyName,
                department: action.department,
                title: action.title,
                activatedTime: action.activatedTime,
                userType: action.userType,
                hollowBalance: action.hollowBalance,
                currentSolidBalance: action.currentSolidBalance,
                lastHollowHarvest: action.lastHollowHarvest,
                lastSolidHarvest: action.lastSolidHarvest
            });
        case SET_USER_INFO:
            return Object.assign({}, state, {
                profileImage: action.profileImage,
                firstName: action.firstName,
                familyName: action.familyName,
                department: action.department,
                title: action.title
            });
        case FETCH_USER_INFO:
        default:
            return state;
    }
}
