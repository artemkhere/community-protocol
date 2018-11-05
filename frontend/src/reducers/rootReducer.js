import { combineReducers } from 'redux';
import navigation from './navigationReducer';
import user from './userReducer';
import ethereum from './ethereumReducer';

const rootReducer = combineReducers({
    navigation,
    user,
    ethereum
});

export default rootReducer;
