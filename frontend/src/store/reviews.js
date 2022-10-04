import { csrfFetch } from "./csrf";

const GET = "reviews/get";
const ADD = "reviews/add";
const MYREVIEWS = "/user/reviews";
const EDIT = "/reviews/edit";
const DELETE = "/reviews/delete";

const getReviews = (reviews) => ({
  type: GET,
  reviews,
});
const addReview = (newReview) => ({
  type: ADD,
  newReview,
});

const myReviews = (reviews) => ({
  type: MYREVIEWS,
  reviews,
});

const editReview = (review) => ({
  type: EDIT,
  review,
});

const deleteReview = (review) => ({
  type: DELETE,
  review,
});

export const getAllreviews = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}/reviews`);
  const { Reviews } = await response.json();

  if (response.ok) {
    const obj = {};
    Reviews.forEach((review) => (obj[review.id] = review));
    dispatch(getReviews(obj));
  }
};

export const CreateNewReview = (review) => async (dispatch) => {
  const { spotId } = review;
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });
  const newReview = await response.json();
  if (response.ok) {
    dispatch(addReview(newReview));
  }
};

export const GetMyReviews = () => async (dispatch) => {
  const response = await csrfFetch("/api/user/reviews");
  const { Reviews } = await response.json();

  if (response.ok) {
    const obj = {};
    Reviews.forEach((review) => (obj[review.id] = review));

    dispatch(myReviews(obj));
  }
};

export const reviewEdit = (review) => async (dispatch) => {
  const { id } = review;
  const response = await csrfFetch(`/api/reviews/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });
  const editedreview = await response.json();
  if (response.ok) {
    dispatch(editReview(editedreview));
  }
};

export const reviewDelete = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteReview(id));
  }
};

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET:
      newState = { ...state, ...action.reviews };
      return newState;
    case ADD:
      newState = { ...state, [action.newReview.id]: action.newReview };
      return newState;
    case MYREVIEWS:
      newState = { ...action.reviews };
      return newState;
    case EDIT:
      newState = { ...state, [action.review.id]: action.review };
      return newState;
    case DELETE:
      delete newState[action.review.id];
      return newState;
    default:
      return state;
  }
};

export default reviewsReducer;
