import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { dataContext } from "../Context/Store";

const Cart = () => {
  const { cart, Removeitem, DecreaseItem, IncreaseItem } =
    useContext(dataContext);
  const Maping = cart.items;

  return (
    <div>
      {Maping.length > 0 ? (
        <div className="BeforeMapingCart">
          {Maping <= 0 ? null : (
            <div className="TotalPri">
              <h4> TotalPrice : {cart.TotalPrice} $ </h4>
            </div>
          )}

          {Maping.map((Maping) => {
            return (
              <div key={Maping.id} className="FirstCartSection">
                <div className="leftSec">
                  <Link to={`/${Maping.id}`}>
                  <img
                    alt={`cartfirstitem`}
                    className="CartImages"
                    src={Maping.photo}
                    />
                    </Link>
                </div>
                <div className="rightSec">
                  <div>
                    <h4>Piece Price : {Maping.New_price}</h4>
                  </div>

                  <div className="QuaMoreAndLess">
                    <button onClick={() => IncreaseItem(Maping)}>+</button>
                    <h4>Quantity :{Maping.qty}</h4>
                    <button onClick={() => DecreaseItem(Maping)}>-</button>
                  </div>
                  <div>
                    <h4>Total Price : {+Maping.New_price * +Maping.qty}</h4>
                  </div>
                  <div className="DeleteAll" onClick={() => Removeitem(Maping)}>
                    <h4 className="DeleteAllText">Delete</h4>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <div className="EmptyCarting">
            <h4 className="EmptyCartingTextMain">
              Your Cart is Empty
              <span className="EmptyCartingLink">
                <Link to="/">Start Shopping</Link>
              </span>
            </h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
