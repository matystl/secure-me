import { combineReducers } from 'redux';
import todos from './todos';
import {reducer} from '../facebook/store';

const rootReducer = combineReducers({
  todos,
  facebook:reducer,
});

export default rootReducer;