import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsPage from "./components/Spots";
import SpotDetails from "./components/Spots/spotDetail";
import CreateSpotForm from "./components/Spots/SpotForm";
import mySpots from "./components/Spots/MySpots";
import EditSpot from "./components/Spots/EditSpotForm";
import MyReviews from "./components/Reviews/MyReviews";
import EditSpotForm from "./components/Reviews/EditReviewForm";
import ReviewForm from "./components/Reviews/ReviewForm";
// import { GetMyReviews } from "./store/reviews";
// import { getAllSpots } from "./store/spots";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    // dispatch(getAllSpots());
    // dispatch(GetMyReviews());
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/">
            <SpotsPage />
          </Route>

          <Route exact path="/spots/new" component={CreateSpotForm} />
          <Route path="/spots/:spotId" component={SpotDetails} />
          <Route exact path="/reviews/:spotId" component={ReviewForm} />
          <Route exact path="/user/spots" component={mySpots} />
          <Route path="/user/edit/:spotId" component={EditSpot} />
          <Route path="/user/reviews" component={MyReviews} />
          <Route path="/user/review/edit/:reviewId" component={EditSpotForm} />
        </Switch>
      )}
    </>
  );
}

export default App;
