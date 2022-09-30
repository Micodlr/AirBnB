// import { csrfFetch } from "./csrf";

// const SET = "session/setUser";
// const REMOVE = "session/removeUser";
// export const setSession = (user) => ({
//   type: SET,
//   payload: user,
// });

// export const removeSession = () => ({
//   type: REMOVE,
// });

// export const restoreUser = () => async (dispatch) => {
//   const response = await csrfFetch("/api/user");
//   const data = await response.json();
//   dispatch(setSession(data));
//   return response;
// };

// export const login = (user) => async (dispatch) => {
//   const { credential, password } = user;
//   const response = await csrfFetch("/api/login", {
//     method: "POST",
//     body: JSON.stringify({
//       credential,
//       password,
//     }),
//   });
//   const data = await response.json();
//   dispatch(setSession(data));
//   return response;
// };

// export const logout = () => async (dispatch) => {
//   const res = await csrfFetch("/api/user", { method: "REMOVE" });
//   if (res.ok) {
//     dispatch(removeSession());
//   }
// };

// const initialState = { user: null };

// const sessionReducer = (state = initialState, action) => {
//   let newState = { ...state };
//   switch (action.type) {
//     case SET:
//       newState.user = action.payload;
//       return newState;

//     case REMOVE:
//       delete newState[action.payload];
//       return newState;

//     default:
//       return state;
//   }
// };

// export default sessionReducer;

import { csrfFetch } from "./csrf";

const SET = "session/setUser";
const REMOVE = "session/removeUser";
export const setSession = (user) => ({
  type: SET,
  payload: user,
});

export const removeSession = () => ({
  type: REMOVE,
});

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/user");
  const data = await response.json();
  dispatch(setSession(data));
  return response;
};

export const signup = (user) => async (dispatch) => {
  const { username, email, password, firstName, lastName } = user;
  const response = await csrfFetch("/api/signup", {
    method: "POST",
    body: JSON.stringify({
      firstName,
      lastName,
      username,
      email,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setSession(data));
  return response;
};
export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/login", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setSession(data));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/user", {
    method: "DELETE",
  });
  dispatch(removeSession());
  return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case SET:
      newState.user = action.payload;
      return newState;

    case REMOVE:
      newState.user = null;
      return newState;

    default:
      return state;
  }
};

export default sessionReducer;
