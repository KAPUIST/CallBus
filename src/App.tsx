import * as React from "react";
import Home from "./pages/Home";
import Post from "./pages/Post";

import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/community/list" element={<Home />} />
          <Route path="/community/post/:post_pk" element={<Post />} />
          <Route path="" element={<Navigate to="community/list" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
