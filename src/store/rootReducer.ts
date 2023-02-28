import { combineReducers } from '@reduxjs/toolkit';

import counterReducer from 'features/counter/counterSlice';
import userSlice from 'features/user/userSlice';

const rootReducer = combineReducers({ counter: counterReducer, user: userSlice.reducer });

export default rootReducer;
