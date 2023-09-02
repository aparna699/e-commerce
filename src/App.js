import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./Routs/LogIn";
import Navbar from "./Routs/Navbar";
import Home from "./Routs/Home";
import MyOrders from "./Routs/MyOrders";
import RequireAuth from "./Component/RequireAuth";
import Products from "./Routs/Products";
import Orders from "./Routs/Orders";
import Users from "./Routs/Users";
import Items from "./Routs/Items";
import Cart from "./Routs/Cart"
import Profile from "./Routs/Profile";
import axios from "./api/axios";
import Address from "./Routs/Address";

function App() {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getCategory = async () => {
      console.log("get Category in routs");
      try {
        const header = {
          "Content-Type": "application/json",
        };
        const response = await axios.get("/api/category", {
          header: header,
        });
        console.log(response.data);
        isMounted && setCategory(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getCategory();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route element={<RequireAuth allowedRoles={["ROLE_CUSTOMER"]} />}>
            <Route path="/MyOrders" element={<MyOrders />} />
            <Route path= '/cart' element={<Cart/>} />
            <Route path= '/address' element={<Address/>} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["ROLE_ADMIN"]} />}>
            <Route path="/Products" element={<Products />} />
            <Route path="/Orders" element={<Orders />} />
            <Route path="/Users" element={<Users />} />
          </Route>
          <Route
            element={
              <RequireAuth allowedRoles={["ROLE_CUSTOMER", "ROLE_ADMIN"]} />
            }
          >
            <Route path= '/profile' element={<Profile/>} />
          </Route>
          <Route path="/" element={<Home />} />
          {category.map((key) => {
            return (
              <Route
                path={`/${key.categoryName}`}
                element={<Items category={`${key.categoryName}`} />}
              />
            );
          })}
        </Route>
        {/* public routs */}
        <Route path="/login" element={<LogIn />} />
        {/* <Route path= '/unauthorized' element= { <Unauthirized/>} />    */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
