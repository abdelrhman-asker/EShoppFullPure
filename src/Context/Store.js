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

  const CalculateNumb = (items) => {
    localStorage.setItem('myCart', JSON.stringify(items));
    const MainItems = items.reduce((a, b) => a + b.qty, 0);
    const TotalPrice = items.reduce((a, b) => a + b.qty * b.New_price, 0);
    localStorage.setItem("TotalPrice", JSON.stringify(TotalPrice));
    return { MainItems, TotalPrice };
  };

  let myInitialCart = JSON.parse(localStorage.getItem('myCart')) || [];
  const [cart, setCart] = useState({
    items: myInitialCart,
    MainItems:0, 
    TotalPrice: JSON.parse(localStorage.getItem('TotalPrice')) || 0,
  });


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
      items.splice(productIndex, 1)
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
      items[productIndex].qty--
      if( items[productIndex].qty <= 0 ){
        items.splice(productIndex, 1)
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
      items[productIndex].qty++
    
    }
    const total = CalculateNumb(items);
    console.log("total", total);
    setCart({
      items,
      ...total,
    });
  };


  return (
    <div>
      <dataContext.Provider
        value={{ products, cart, AddCartTotalPrice,Removeitem ,DecreaseItem,IncreaseItem }}
      >
        {props.children}
      </dataContext.Provider>
    </div>
  );
}
