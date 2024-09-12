import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Authentification from "./Authentification";
import Posts from "./Posts";

const Main = () => {

    return <>
    <Router>
      <Routes>
        <Route path="/" element={<Authentification />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </Router>
    </>
}

export default Main;