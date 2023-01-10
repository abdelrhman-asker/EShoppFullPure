import React, { useContext, useState } from "react";
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
import { BsCartDash, BsFillCartCheckFill } from 'react-icons/bs';
import { Link } from "react-router-dom";

export default function MainNav() {
  const [showBasic, setShowBasic] = useState(false);
  const { cart } = useContext(dataContext);

  return (
    <MDBNavbar className="MainNav" expand="lg" dark bgColor="dark">
      <MDBContainer fluid>
        <MDBNavbarBrand >
          <Link to="/">
          Brand Name/Logo
          </Link>
          </MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
            <MDBNavbarItem>
              <MDBNavbarLink href="#">All Products</MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag="a" className="nav-link" role="button">
                  Categories
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem href="/Home" link>
                    Men
                  </MDBDropdownItem>
                  <MDBDropdownItem href="/Home" link>
                    Women
                  </MDBDropdownItem>
                  <MDBDropdownItem href="/Home" link>
                    Sporting Equipments
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
          </MDBNavbarNav>

          <div className="CartBadge">
            <Link to="/Cart">{cart.items.length === 0 ?  <BsCartDash /> : <BsFillCartCheckFill/>}
            
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
