import React, { useContext, useEffect, useState } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
  MDBBadge,
} from "mdb-react-ui-kit";
import { dataContext } from "../Context/Store";
import { BsCartDash, BsFillCartCheckFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { Switch } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function MainNav() {
  let [showBasic, setShowBasic] = useState(false);
  const { cart } = useContext(dataContext);
  const { DarkMode } = useContext(dataContext);

  const makeitflaseAgain = () => {
    setShowBasic(true);
  };
  return (
    <MDBNavbar className="MainNav" expand="lg" dark bgColor="dark">
      <MDBContainer fluid>
        <MDBNavbarBrand>
          <Link className="btne /" to="/">
            Brand Name/Logo
          </Link>
        </MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowBasic(!showBasic)}
        >
          <div
            onClick={makeitflaseAgain}
            className={showBasic === true ? "makeitblock" : "makeitnone"}
          ></div>
          <MDBIcon icon="bars" fas />
          <MDBBadge color="gray" notification pill>
            {cart.items.length !== 0 && (
              <span className="TogglerAdv"> {cart.items.length}</span>
            )}
          </MDBBadge>
        </MDBNavbarToggler>
        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
            <MDBNavbarItem>
              <MDBNavbarLink className="NavLink">
                <Link className="btne /AllProducts" to="/AllProducts">
                  All Products
                </Link>
              </MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag="a" className="nav-link" role="button">
                  Categories
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem href="/" link>
                    Men
                  </MDBDropdownItem>
                  <MDBDropdownItem href="/" link>
                    Women
                  </MDBDropdownItem>
                  <MDBDropdownItem href="/" link>
                    Sporting Equipments
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
          </MDBNavbarNav>
          <div className="MakingItDark">
            <h6 className="DarkingALightning">Dark</h6>

            <FormControlLabel
              onChange={DarkMode}
              control={<Switch defaultChecked />}
            />
          </div>
          <div className="CartBadge">
            <Link style={{ width: "100%" }} to="/Cart">
              {cart.items.length === 0 ? (
                <BsCartDash />
              ) : (
                <BsFillCartCheckFill />
              )}

              <MDBBadge color="gray" notification pill>
                {cart.items.length === 0 ? (
                  <span> empty </span>
                ) : (
                  <span> {cart.items.length}</span>
                )}
              </MDBBadge>
            </Link>
          </div>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
