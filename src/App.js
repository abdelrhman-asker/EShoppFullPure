import React, { useContext } from "react";
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
import Details from "./Components/Details";
import AllProducts from "./Components/AllProducts";
import { dataContext } from "./Context/Store";

const App = () => {
  return (
    <BrowserRouter>
      <MainNav />
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/AllProducts" element={<AllProducts />} />
        <Route exact path="/:id" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
