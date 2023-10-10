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

const Navbar = () => {
  const [cartQty, setCartQty] = useState(0)
  const token = Cookies.get("token");
  const role = Cookies.get("role");
  const userId = Cookies.get("userId");

  const user = ["MyOrders"];
  // const admin = ["Products", "Orders", "Users"];
  const admin = ["Products", "Users"];

  const navbar =
    role == "ROLE_CUSTOMER" ? user : role == "ROLE_ADMIN" ? admin : [];

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("userId");
    localStorage.removeItem("addressList");
  };

  useEffect(() => {
    dispatch(cartActions.getCartList(userId));
    let isMounted = true;
    const controller = new AbortController();

    // const getAddress = async () => {
    //   console.log("get Address");
    //   // console.log("UserId : ",userId);
    //   try {
    //     const header = {
    //       Authorization: `Bearer ${token}`,
    //       "Content-Type": "application/json",
    //     };
    //     const response = await axios.get(
    //       `/api/address/user/${userId}`, {
    //       headers: header,
    //     });
  
    //     // console.log(response.data);
    //     isMounted && localStorage.setItem("addressList", JSON.stringify(response.data));
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // getAddress();

    return () => {
      isMounted = false;
      controller.abort();
    };
  },[])
  const cartList = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    setCartQty(cartList.qty);
  }, [cartList]);

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">
            E-Commerce
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/">
                  <HomeIcon/>
                </a>
              </li>
              {navbar.map((key) => {
                return (
                  <li class="nav-item">
                    <a class="nav-link" href={`/${key}`}>
                      {key}
                    </a>
                  </li>
                );
              })}
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
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

            {/* <form class="d-flex px-2">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-outline-success" type="submit">
                <SearchIcon />
              </button>
            </form> */}
            {/* Address */}
            {role === "ROLE_CUSTOMER" ? (
              <div
                class="px-2"
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
            <ul class="navbar-nav">
              {role === "ROLE_CUSTOMER" ? (
                <li>
                  <a
                    class="nav-link active px-2"
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
                    class="nav-link active px-2"
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
                    class="nav-link active px-2"
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
                    class="nav-link active px-2"
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
