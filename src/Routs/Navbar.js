import Cookies from "js-cookie";
// import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
//MUI
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material-next/Badge";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// import axios from "../api/axios";
import CategoryDropdown from "../Component/CategoryDropdown";
import AddressSelect from "../Component/AddressSelect";

const Navbar = () => {
  const cartQty = 1;

  const token = Cookies.get("token");
  const role = Cookies.get("role");

  const user = ["MyOrders"];
  const admin = ["Products", "Orders", "Users"];

  const navbar =
    role == "ROLE_CUSTOMER" ? user : role == "ROLE_ADMIN" ? admin : [];

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("userId");
  };

  console.log(token);

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
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
                  Home
                </a>
              </li>
              {navbar.map((key) => {
                return (
                  <li class="nav-item">
                    <a class="nav-link" href={`${key}`}>
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

            <form class="d-flex px-2">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-outline-success" type="submit">
                <SearchIcon />
              </button>
            </form>
            {/* Address */}
            {
              role === "ROLE_CUSTOMER" ? <AddressSelect /> : <div> </div>
            }
            <ul class="navbar-nav">
              <li>
                <a class="nav-link active px-2" aria-current="page" href="/cart">
                  <Badge badgeContent={cartQty} color="primary">
                    <ShoppingCartIcon />
                  </Badge>
                </a>
              </li>
              <li>
                <a class="nav-link active px-2" aria-current="page" href="/profile">
                  <AccountCircleIcon />
                </a>
              </li>
              <li>
                {role === undefined ? (
                  <a
                    class="nav-link active px-2"
                    aria-current="page"
                    style={{
                      color: " #8c9aca",
                    }}
                    href="login"
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
                    href="login"
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
