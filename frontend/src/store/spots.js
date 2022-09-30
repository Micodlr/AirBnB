import { csrfFetch } from "./csrf";

const GET = "spots/get";
const ADD = "spots/add";

const getSpots = (spots) => ({
  type: GET,
  spots,
});
const addSpot = (newSpot) => ({
  type: ADD,
  newSpot,
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
  const newSpot = await response.json();
  if (response.ok) {
    dispatch(addSpot(newSpot));
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
    default:
      return state;
  }
};

export default spotsReducer;
