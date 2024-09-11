import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Posts from "./Posts";

const Main = () => {

    return <>
    <Router>
      <Routes>
        <Route path="/" element={<Posts />} />
      </Routes>
    </Router>
    </>
}

export default Main;