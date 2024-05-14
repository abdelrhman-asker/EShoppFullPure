import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const dataContext = createContext();

export default function DataContextProvider(props) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("product.json").then((res) => {
      setProducts(res.data.products);
    });
  }, []);

  let myInitialCart = JSON.parse(localStorage.getItem("myCart")) || [];
  const [cart, setCart] = useState({
    items: myInitialCart,
    MainItems: 0,
    TotalPrice: JSON.parse(localStorage.getItem("TotalPrice")) || 0,
  });

  const CalculateNumb = (items) => {
    localStorage.setItem("myCart", JSON.stringify(items));
    const MainItems = items.reduce((a, b) => a + b.qty, 0);
    const TotalPrice = items.reduce((a, b) => a + b.qty * b.New_price, 0);
    localStorage.setItem("TotalPrice", JSON.stringify(TotalPrice));
    return { MainItems, TotalPrice };
  };

  const AddCartTotalPrice = (product) => {
    const { items = [] } = cart;
    const productIndex = items.findIndex((item) => item.id === product.id);
    if (productIndex === -1) {
      items.push({
        ...product,
        qty: 1,
      });
    } else {
      items[productIndex].qty++;
    }
    const total = CalculateNumb(items);
    console.log("total", total);
    setCart({
      items,
      ...total,
    });
  };

  const Removeitem = (product) => {
    const { items = [] } = cart;
    const productIndex = items.findIndex((item) => item.id === product.id);
    if (productIndex !== -1) {
      items.splice(productIndex, 1);
    }
    const total = CalculateNumb(items);
    console.log("total", total);
    setCart({
      items,
      ...total,
    });
  };

  const DecreaseItem = (product) => {
    const { items = [] } = cart;
    const productIndex = items.findIndex((item) => item.id === product.id);
    if (productIndex !== -1) {
      items[productIndex].qty--;
      if (items[productIndex].qty <= 0) {
        items.splice(productIndex, 1);
      }
    }
    const total = CalculateNumb(items);
    console.log("total", total);
    setCart({
      items,
      ...total,
    });
  };
  const IncreaseItem = (product) => {
    const { items = [] } = cart;
    const productIndex = items.findIndex((item) => item.id === product.id);
    if (productIndex !== -1) {
      items[productIndex].qty++;
    }
    const total = CalculateNumb(items);
    console.log("total", total);
    setCart({
      items,
      ...total,
    });
  };
  const DarkMode = () => {
    if (document.getElementsByClassName("Mui-checked")[0]) {
      document.getElementsByClassName("DarkingALightning")[0].innerHTML =
        "Light";
      document.body.className = "lightMode";
    } else {
      document.getElementsByClassName("DarkingALightning")[0].innerHTML =
        "Dark";
      document.body.className = "DarkMode";
    }
  };
  return (
    <div>
      <dataContext.Provider
        value={{
          products,
          cart,
          AddCartTotalPrice,
          Removeitem,
          DecreaseItem,
          IncreaseItem,
          DarkMode,
        }}
      >
        {props.children}
      </dataContext.Provider>
    </div>
  );
}
