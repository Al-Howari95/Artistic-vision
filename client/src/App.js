import logo from "./logo.svg";
import "./App.css";
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import AboutUs from "./Pages/AboutUs";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import ContactUs from "./Pages/ContactUs";
import Categores from "./Pages/Categores";
import Detelis from "./Pages/Detelis";
import BookNow from "./Pages/BookNow";



function App() {
  return (
    <div className="App">
      <Router>
        <Header />

        <Routes> 
        <Route path="/" element={<Home/>} />

          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Registration" element={<Registration/>} />
          <Route path="/ContactUs" element={<ContactUs/>} />
          <Route path="/Categores" element={<Categores/>} />
          <Route path="/Detelis/:id" element={<Detelis/>} />
          <Route path="/BookNow" element={<BookNow/>} />
          

        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
