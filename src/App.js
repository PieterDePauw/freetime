import "antd/dist/antd.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./features/home/Home";
import "./styles.css";
import Landing from "./features/landing/Landing";
import NotFound from "./components/NotFound";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Landing/> } >
          <Route path="home" element={<Home />} />
        </Route>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Router>
  );
}
