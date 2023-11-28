import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//MUI
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material-next/Badge";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FmdGoodIcon from '@mui/icons-material/FmdGood';

import axios from "../api/axios";
import CategoryDropdown from "../Component/NavbarComponent/CategoryDropdown";
import { getCartList } from "../store/Cart/actions";
import { cartActions } from "../store/Cart/cartSlice";
import { categoryReducer } from "../store/Category/categorySlice";
import { revertAll } from "../store/reset";

const Navbar = () => {
  const [cartQty, setCartQty] = useState(0)

  const role = Cookies.get("role");
  const userId = Cookies.get("userId");

  const user = ["MyOrders"];
  // const admin = ["Products", "Orders", "Users"];
  const admin = ["Products", "Users"];

  const navbar =
    role == "ROLE_CUSTOMER" ? user : role == "ROLE_ADMIN" ? admin : [];

    const dispatch = useDispatch();

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("userId");
    Cookies.remove("address");
    Cookies.remove("items");
    Cookies.remove("amount");
    dispatch(revertAll())
  };

  useEffect(() => {
    dispatch(cartActions.getCartList(userId));
  },[])
  const cartList = useSelector((state) => state.cart);
  
  useEffect(() => {
    setCartQty(cartList.qty);
  }, [cartList]);

  return (
    <div >
      <nav className ="navbar sticky-top navbar-expand-lg navbar-light bg-light">
        <div className ="container-fluid">
          <a className ="navbar-brand" href="/">
            E-Commerce
          </a>
          <button
            className ="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className ="navbar-toggler-icon"></span>
          </button>
          <div className ="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className ="navbar-nav me-auto mb-2 mb-lg-0">
              <li className ="nav-item">
                <a className ="nav-link active" aria-current="page" href="/">
                  <HomeIcon/>
                </a>
              </li>
              {navbar.map((key) => {
                return (
                  <li className ="nav-item">
                    <a className ="nav-link" href={`/${key}`}>
                      {key}
                    </a>
                  </li>
                );
              })}
              <li className ="nav-item dropdown">
                <a
                  className ="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </a>
                <CategoryDropdown />
              </li>
            </ul>

            {/* <form className ="d-flex px-2">
              <input
                className ="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className ="btn btn-outline-success" type="submit">
                <SearchIcon />
              </button>
            </form> */}
            {/* Address */}
            {role === "ROLE_CUSTOMER" ? (
              <div
                className ="px-2"
                style={{ "margin-top": "auto", "margin-bottom": "auto" }}
              >
                <a href="/address">
                  <FmdGoodIcon />
                </a>
              </div>
            ) : (
              // <AddressSelect />
              <div> </div>
            )}
            <ul className ="navbar-nav">
              {role === "ROLE_CUSTOMER" ? (
                <li>
                  <a
                    className ="nav-link active px-2"
                    aria-current="page"
                    href="/cart"
                  >
                    <Badge badgeContent={cartQty} color="primary">
                      <ShoppingCartIcon />
                    </Badge>
                  </a>
                </li>
              ) : (
                <div></div>
              )}
              {role !== undefined ? (
                <li>
                  <a
                    className ="nav-link active px-2"
                    aria-current="page"
                    href="/profile"
                  >
                    <AccountCircleIcon />
                  </a>
                </li>
              ) : (
                <div></div>
              )}
              <li>
                {role === undefined ? (
                  <a
                    className ="nav-link active px-2"
                    aria-current="page"
                    style={{
                      color: " #8c9aca",
                    }}
                    href="/login"
                    onClick={logout}
                  >
                    login
                  </a>
                ) : (
                  <a
                    className ="nav-link active px-2"
                    aria-current="page"
                    style={{
                      color: " #8c9aca",
                    }}
                    href="/login"
                    onClick={logout}
                  >
                    logout
                  </a>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Navbar;
