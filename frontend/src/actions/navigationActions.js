import * as types from './actionTypes';

export function changeView(view) {
    return { type: types.CHANGE_VIEW, view };
}
