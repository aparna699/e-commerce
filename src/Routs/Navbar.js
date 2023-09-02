import Cookies from "js-cookie";
// import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material-next/Badge";
import { padding } from "@mui/system";
import axios from "../api/axios";
import CategoryDropdown from "../Component/CategoryDropdown";

const Navbar = () => {
  const cartQty = 1;
  // const user = token?jwtDecode(token): null

  // const role = 'ROLE_ADMIN'

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
  };

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
                <a class="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Link
                </a>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categori
                </a>
                <CategoryDropdown/>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled">Disabled</a>
              </li>
            </ul>

            <form class="d-flex">
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
            {/* <div class="px-2">
              <select class="form-select ">
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div> */}
            <ul class="navbar-nav">
              <li>
                <a class="nav-link active" aria-current="page" href="#">
                  Login
                </a>
              </li>
              <li>
                <a class="nav-link active" aria-current="page" href="#">
                  <Badge badgeContent={cartQty} color="primary">
                    <ShoppingCartIcon />
                  </Badge>
                </a>
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
