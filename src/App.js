import React from "react";
import "./App.css";
import MainHome from "./Components/MainHome";
import MainNav from "./Components/MainNav";
import {
  BrowserRouter,
  Route,
  Router,
  Routes,
  Link,
  NavLink,
} from "react-router-dom";
import Cart from "./Components/Cart";

const App = () => {
  return (
    <BrowserRouter>
      <MainNav />
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/Cart" element={<Cart />} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;
