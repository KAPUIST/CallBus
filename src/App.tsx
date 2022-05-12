import * as React from "react";
import Home from "./pages/Home";
import Post from "./pages/Post";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Routes>
          <Route path="/post" element={<Post />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
