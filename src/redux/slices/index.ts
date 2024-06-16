import { combineReducers } from 'redux';
import transactionReducer from './transactionSlice';

const rootReducer = combineReducers({
    transactionReducer
});

export default rootReducer;
