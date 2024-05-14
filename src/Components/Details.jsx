import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dataContext } from "../Context/Store";

const Details = () => {
  const { products, AddCartTotalPrice } = useContext(dataContext);
  let { id } = useParams();
  console.log(id);
  console.log(products);
  id = id - 1;

  const countDownDate = new Date("may 15, 2024 12:00:00").getTime();
  // const now = new Date().getTime();
  // const [timeLeft , setTimeLeft] = useState(0)
  // setInterval(() => {
  //   setTimeLeft = countDownDate;
  // });

  let now = new Date().getTime();
  let timeLeft = countDownDate - now;
  setInterval(() => {
    let days = Math.floor(timeLeft / (24 * 60 * 60 * 1000));
    let hours = Math.floor(timeLeft / (24 * 60 * 1000));
    let mins = Math.floor(timeLeft / (24 * 60 * 1000));
    let seconds = Math.floor(timeLeft / 1000);
    if (document.getElementById("Spanning") && timeLeft > 0) {
      document.getElementById("Spanning").innerText = ` ${days} days`;
      if (days < 1) {
        document.getElementById("Spanning").innerText = ` ${hours} hours`;
      } else if (hours < 1) {
        document.getElementById("Spanning").innerText = ` ${mins} mins`;
      } else if (mins < 1) {
        document.getElementById("Spanning").innerText = ` ${seconds} seconds`;
      }
    }
  }, 1000);
  // if (products[id].New_price === products[id].Pre_price) {
  //   products[id].Discount = false;
  // } else {
  //   products[id].Discount = true;
  // }
  return (
    <div className="MainDetails">
      {timeLeft > 0 ? (
        <div className="MovingBar">
          <h4>
            Free Delivery For Limited Time - TimeLeft:
            <span id="Spanning"></span>
          </h4>
        </div>
      ) : null}
      {products.length > 0 ? (
        <div className="MainSectionOnDetails">
          <div className="RecDesigning"></div>
          <div className="RecDesigning2"></div>
          <div className="LeftDetails col-10 col-lg-5">
            <div className="LeftDetailsImgDiv">
              <img src={products[id].photo} alt="ProductImg" />
            </div>
          </div>
          <div className="rightDetails col-10 col-lg-6">
            <h4>
              {products[id].title}
              {/* {products[id].Discount === true ? <span className="DetailsOnDetails">  On Sale</span> : null} */}
            </h4>
            <h5>
              <span>
                Details :-
                <hr className="col-2" />
              </span>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum
              consequuntur placeat harum minima voluptatibus. Provident illo
              iste officiis sequi laborum, tempore odio culpa perspiciatis
              quaerat! Repellat quod at corporis velit.
            </h5>
            {products[id].Discount === true ? (
              <div className="AllPriceAndCart col-12">
                <div>
                  <button onClick={() => AddCartTotalPrice(products[id])}>
                    Add to Cart
                  </button>
                </div>
                <div className="despri PreDesc">
                  <span>From</span>
                  <h5>{products[id].Pre_price} $</h5>
                </div>
                <div className="despri newDesc">
                  <span>To</span>
                  <h5>{products[id].New_price} $</h5>
                </div>
              </div>
            ) : (
              <div className="AllPriceAndCart col-12">
                <button onClick={() => AddCartTotalPrice(products[id])}>
                  Add to Cart
                </button>
                <div className="despri newDesc">
                  <h5>Price: {products[id].New_price} $</h5>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Details;
