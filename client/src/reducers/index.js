import {combineReducers} from 'redux';
import auth from './auth';
import cards from './cards'
export default combineReducers({
    auth:auth,
    cards:cards

});