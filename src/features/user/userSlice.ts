import { Action, PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// import API from 'global/constants/api';
// import ENDPOINTS from 'global/constants/endpoints';
// import METHODS from 'global/constants/restMethods';
import type { AppThunk, RootState } from 'store/';
// import sendWelcomeEmail from '../../global/functions/sendWelcomeEmail';
interface RegisterProps {
  fname: string;
  lname: string;
  email: string;
  username: string;
  password: string;
}

interface LoginProps {
  email: string;
  password: string;
}

// async thunk
// export const registerUser = createAsyncThunk('currentUser/registerUser', async (values: RegisterProps, thunkAPI) => {
//   console.log(thunkAPI);

//   const response = await fetch(API + ENDPOINTS.REGISTER, {
//     method: METHODS.POST,
//     body: JSON.stringify(values),
//   });
//   const data = await response.json();

//   console.log(data?.user);

//   if (data.status === 'fail') return data;

//   thunkAPI.dispatch(setUser(data?.user));
//   thunkAPI.dispatch(setToken(data?.auth_token));
//   thunkAPI.dispatch(login());
//   // sendWelcomeEmail(data?.user);
//   return data;
// });

interface editProps {
  fname: string;
  lname: string;
  email: string;
  username: string;
}

// export const editUser = createAsyncThunk('currentUser/editUser', async (values: editProps, { dispatch, getState }) => {
//   const response = await fetch(API + ENDPOINTS.REGISTER, {
//     method: METHODS.PUT,
//     headers: {
//       // @ts-ignore
//       Authorization: `Bearer ${getState().user.token}`,
//     },
//     body: JSON.stringify(values),
//   });
//   console.log('hereeee');

//   const data = await response.json();

//   console.log(data);

//   if (data.status === 'fail') return data;

//   dispatch(setUser(data.body.user));
//   return data;
// });

// async thunk

// export const loginUser = createAsyncThunk('currentUser/loginUser', async (values: LoginProps, thunkAPI) => {
//   const response = await fetch(API + ENDPOINTS.LOGIN, {
//     method: METHODS.POST,
//     body: JSON.stringify(values),
//   });
//   const data = await response.json();
//   console.log(data?.user);

//   if (data.status === 'fail') return data;

//   thunkAPI.dispatch(setUser(data?.user));
//   thunkAPI.dispatch(setToken(data?.auth_token));
//   thunkAPI.dispatch(login());
//   return data;
// });

// async thunk

// export const logoutUser = createAsyncThunk('currentUser/logoutUser', async (dummy, { dispatch, getState }) => {
//   const response = await fetch(API + ENDPOINTS.LOGOUT, {
//     method: METHODS.POST,
//     headers: {
//       // @ts-ignore
//       Authorization: `Bearer ${getState().user.token}`,
//     },
//   });
//   const data = await response.json();

//   console.log(data);

//   dispatch(setUser(null));
//   dispatch(setToken(''));
//   dispatch(logout());
// });

// export const getUser = createAsyncThunk(
//   'currentUser/getUser',
//   async (dummy, thunkAPI) => {
//     console.log(thunkAPI);

//     const response = await fetch(API + ENDPOINTS.USER, {
//         method: METHODS.GET,
//         headers: {
//             Authorization: 'Bearer ' + localStorage.getItem('token')
//         }
//     })

//     const data = await response.json()

//     console.log('pppppppppppppppp',data.user);
//     thunkAPI.dispatch(setUser(data.user))
//     thunkAPI.dispatch(login())
//     thunkAPI.dispatch(setToken())
//   }
// )

interface UserState {
  profile: any;
  loggedin: boolean;
  token: string | null;
}

const initialState: UserState = {
  profile: null,
  loggedin: false,
  token: '',
};

// slice
export const userSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    login: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

      state.loggedin = true;
    },
    logout: (state) => {
      state.loggedin = false;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUser: (state, action: PayloadAction<UserState | null>) => {
      console.log('@@@@@@@@@@@@@@@@@@@@@@@@@', action.payload);

      state.profile = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      console.log('@@@@@@@@@@@@@@@@@@@@@@@@@', action.payload);

      state.token = action.payload;
    },
  },
  // extraReducers: (builder) => {
  // }
});

export const { login, logout, setUser, setToken } = userSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// const postProcess = (process: string, callback: Action<string>, token?: string, user?: UserState): AppThunk => (dispatch) => {
//     console.log(process, callback);

//     if (process === PROCESSES.LOGOUT) {
//         localStorage.removeItem('token')
//         dispatch(callback)
//     }
//     else {
//         if (token && user) {
//             dispatch(setUser(user))
//             dispatch(login)
//         }
//     }
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectCount = (state: RootState): boolean => state.currentUser.;

export default userSlice;