import { combineReducers } from 'redux';
import { authReducer } from './authorizationReducers';
import { rootReducer } from './reducers';

export default combineReducers({
  data: rootReducer,
  auth: authReducer
});
