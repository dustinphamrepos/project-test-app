import { combineReducers } from 'redux';
import countReducer from './counterReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    counter: countReducer,
    user: userReducer,
});

export default rootReducer;