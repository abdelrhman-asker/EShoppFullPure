import React, { useContext, useEffect, useState } from "react";
import { BsArrowsFullscreen } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { dataContext } from "../Context/Store";
import "../Syle.scss";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
const MainHome = () => {
  const { products } = useContext(dataContext);
  console.log(products);
  const { AddCartTotalPrice } = useContext(dataContext);
  const { cart } = useContext(dataContext);
  const { DarkMode } = useContext(dataContext);

  // console.log("Cart",cart)
  const [visibleNow, setvisibleNow] = useState({
    images: [],
  });
  const OnclickingIt = (product) => {
    const { images = [] } = visibleNow;
    images.push(product.photo);
    setvisibleNow({
      images,
    });
    document.body.style.overflowY = "hidden";
    console.log("visibleNow", visibleNow);
  };
  const removePopUp = () => {
    setvisibleNow([]);
    document.body.style.overflowY = "scroll";

    console.log("visibleNowOut", visibleNow);
  };
  return (
    <div className={"FirstHomeDiv"}>
      {products.map((products) => {
        if (products.New_price === products.Pre_price) {
          products.Discount = false;
        } else {
          products.Discount = true;
        }
        return (
          <Col key={products.id} className="col-lg-3 col-md-4 col-10">
            <div
              className="FirstMapDiv col-md-12"
              style={{ textAlign: "center" }}
            >
              <div className="ImgDiv" onClick={() => OnclickingIt(products)}>
                <img
                  className="ProdImages"
                  src={products.photo}
                  alt="product_Photo"
                />
                <BsArrowsFullscreen className="IconIntoImage" />
                {products.Discount === true ? (
                  <h4 className="Sale">Sale</h4>
                ) : null}
              </div>
              <Link className="MoreDet" to={`/${products.id}`}>
                More details
              </Link>
              <div className="ProDesc">{products.description}</div>
              {products.Discount === true ? (
                <div className="AllPriceAndCart">
                  <div>
                    <button onClick={() => AddCartTotalPrice(products)}>
                      Add to Cart
                    </button>
                  </div>
                  <div className="despri PreDesc">
                    <h5>{products.Pre_price} $</h5>
                  </div>
                  <div className="despri newDesc">
                    <h5>{products.New_price} $</h5>
                  </div>
                </div>
              ) : (
                <div className="AllPriceAndCart">
                  <button onClick={() => AddCartTotalPrice(products)}>
                    Add to Cart
                  </button>
                  <div className="despri newDesc">
                    <h5>{products.New_price} $</h5>
                  </div>
                </div>
              )}
            </div>
          </Col>
        );
      })}
      {visibleNow.images && visibleNow.images.length > 0 ? (
        <div>
          <div className="PopUpImgDiv " onClick={removePopUp} />

          <img
            src={visibleNow.images[visibleNow.images.length - 1]}
            className="PopUpImg col-10 col-lg-6"
            alt="SelectedImg"
          />
          <AiOutlineClose className="IconIntoImagePop" onClick={removePopUp} />
        </div>
      ) : null}
    </div>
  );
};

export default MainHome;
