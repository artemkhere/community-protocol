import initialState from './initialNavigationState';
import {
    CHANGE_VIEW, SET_LOADING
} from '../actions/actionTypes';

export default function navigation(state = initialState, action) {
    switch (action.type) {
        case CHANGE_VIEW:
            return Object.assign({}, state, { view: action.view });
        case SET_LOADING:
            return Object.assign({}, state, { loading: action.active });
        default:
            return state;
    }
}
