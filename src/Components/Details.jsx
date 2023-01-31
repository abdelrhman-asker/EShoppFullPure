import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dataContext } from "../Context/Store";

const Details = () => {
  const { products } = useContext(dataContext);
  const { id } = useParams();
  console.log(id);
  console.log(products);

  let countDownDate = new Date("Jan 1, 2024 12:00:00").getTime();
  const Counting = setInterval(() => {
    let now = new Date().getTime();
    let timeLeft = countDownDate - now;
    let days = Math.floor(timeLeft / (24 * 60 * 60 * 1000));
    let hours = Math.floor(timeLeft / (24 * 60 * 1000));
    let mins = Math.floor(timeLeft / (24 * 60 * 1000));
    let seconds = Math.floor(timeLeft / 1000);
    if (document.getElementById("Spanning")) {
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
  return (
    <div className="MainDetails">
      <div className="MovingBar">
        <h4>
          Free Delivery For Limited Time - TimeLeft:
          <span id="Spanning"></span>
        </h4>
      </div>
    </div>
  );
};

export default Details;
