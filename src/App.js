//import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import PlaceIndex from "./places/PlaceIndex";
import PlaceDetails from "./places/PlaceDetails";
import Navigation from "./Navigation";
import Error404 from "./Error404";
import NewPlaceForm from "./places/NewPlaceForm";
import EditPlaceForm from "./places/EditPlaceForm";
import SignUpForm from "./users/SignUpForm";
import LoginForm from "./users/LoginForm";
import CurrentUserProvider from "./contexts/CurrentUser";


function App() {
  return (
    <CurrentUserProvider>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route  path="/" element={<Home />} />
          <Route  path="/sign-up" element={<SignUpForm />} />
          <Route  path="/login" element={<LoginForm />} />
          <Route  path="/places" element={<PlaceIndex />} />
          <Route  path="/places/new" element={<NewPlaceForm />} />
          <Route  path="/places/:placeId" element={<PlaceDetails />} />
          <Route  path="/places/:placeId/edit" element={<EditPlaceForm />} />
          <Route  path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </CurrentUserProvider>
  );
}

export default App;
