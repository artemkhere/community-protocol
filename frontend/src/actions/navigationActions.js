import * as types from './actionTypes';

export function changeView(view) {
    return { type: types.CHANGE_VIEW, view };
}

export function toggleLoading(active) {
    return { type: types.SET_LOADING, active };
}
