import { csrfFetch } from "./csrf";

const GET = "spots/get";
const ADD = "spots/add";
const MYSPOTS = "/user/spots";
const EDIT = "/spots/edit";
const DELETE = "/spots/delete";

const getSpots = (spots) => ({
  type: GET,
  spots,
});
const addSpot = (newSpot) => ({
  type: ADD,
  newSpot,
});

const getMySpots = (spots) => ({
  type: MYSPOTS,
  spots,
});

const editSpot = (spot) => ({
  type: EDIT,
  spot,
});

const deleteSpot = (spot) => ({
  type: DELETE,
  spot,
});

export const getAllSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  const { Spots } = await response.json();

  if (response.ok) {
    const obj = {};
    Spots.forEach((spot) => (obj[spot.id] = spot));
    dispatch(getSpots(obj));
  }
};

export const CreateNewSpot = (spot) => async (dispatch) => {
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spot),
  });
  if (response.ok) {
    const newSpot = await response.json();
    dispatch(addSpot(newSpot));
  } else {
    throw response;
  }
};

export const mySpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/user/spots");
  const { Spots } = await response.json();

  if (response.ok) {
    const obj = {};
    Spots.forEach((spot) => (obj[spot.id] = spot));

    dispatch(getMySpots(obj));
  }
};

export const SpotEdit = (spot) => async (dispatch) => {
  const { id } = spot;
  const response = await csrfFetch(`/api/spots/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spot),
  });
  if (response.ok) {
    const editedSpot = await response.json();
    dispatch(editSpot(editedSpot));
  } else {
    throw response;
  }
};

export const SpotDelete = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteSpot(id));
  }
};

const initialState = {};

const spotsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET:
      newState = { ...state, ...action.spots };
      return newState;
    case ADD:
      newState = { ...state, [action.newSpot.id]: action.newSpot };
      return newState;
    case MYSPOTS:
      newState = { ...action.spots };
      return newState;
    case EDIT:
      newState = { ...state, [action.spot.id]: action.spot };
      return newState;
    case DELETE:
      delete newState[action.spot.id];
      return newState;
    default:
      return state;
  }
};

export default spotsReducer;
