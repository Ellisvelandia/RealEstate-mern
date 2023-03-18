import React from "react";
import "./App.css";
import  {Routes, Route} from "react-router-dom"
import {
  FeatureProperties,
  Footer,
  Hero,
  Navbar,
  NewsLetter,
  PopularProperties,
  Properties,
  PropertyDetail,
  Signin,
  Signup,
} from "./components";

const App = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero />
              <PopularProperties />
              <FeatureProperties />
              <NewsLetter />
              <Footer />
            </>
          }
        />

        <Route
          path="/properties"
          element={
            <>
              <Navbar />
              <Properties />
              <Footer />
            </>
          }
        />
        <Route
          path="/propertyDetail/:id"
          element={
            <>
              <Navbar />
              <PropertyDetail />
              <Footer />
            </>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </div>
  );
};

export default App;
