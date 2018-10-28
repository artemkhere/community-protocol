import initialState from './initialAccountState';
import { CHANGE_VIEW } from '../actions/actionTypes';

export default function navigation(state = initialState, action) {
    let newState;
    switch (action.type) {
        case CHANGE_VIEW:
            return Object.assign({}, state, { view: action.view });
        default:
            return state;
    }
}
