import { combineReducers } from 'redux';
import navigation from './navigationReducer';
import user from './userReducer';

const rootReducer = combineReducers({
    navigation,
    user
});

export default rootReducer;
