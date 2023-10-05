import logo from "./logo.svg";
import "./App.css";
import Cookies from "js-cookie";
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
import CategoryItems from "./Routs/CategoryItems";
import Cart from "./Routs/Cart";
import Profile from "./Routs/Profile";
import axios from "./api/axios";
import Address from "./Routs/Address";
import Register from "./Routs/Register";
import { Ordering } from "./Routs/Ordering";
import { ProductPage } from "./Component/Items/ProductPage";

function App() {
  const [category, setCategory] = useState([]);

  const userId = Cookies.get("userId");
  const token = Cookies.get("token");
  const [items, setItems] = useState([]);
  let count = 0;

  useEffect(() => {
    // console.log("items");
    const item = JSON.parse(localStorage.getItem("items"));
    if (item) {
      setItems(item);
    }
  }, [localStorage.getItem("items")]);


  useEffect(() => {
    // localStorage.setItem("cart", JSON.stringify("cart"));
    let isMounted = true;
    const controller = new AbortController();
    const url = `/api/cart-item/user/${userId}`;

    const getCartItems = async () => {
      let isMounted = true
      try {
        const header = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };
        const response = await axios.get(url, {
          header: header,
        });
        console.log(response.data);
        isMounted && localStorage.setItem("cart", JSON.stringify(response.data));
        
        // count = response.data.length
        response.data.map((key) => {
          count = count + key.qty
        })
        isMounted && localStorage.setItem("totalQty",count)
        count =0

      } catch (err) {
        console.log(err);
      }
    };

    if(userId != undefined){
      getCartItems();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

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
        {/* <Route element={<RequireAuth allowedRoles={["ROLE_CUSTOMER"]} />}>
          <Route path="MyOrders" element={<MyOrders />} />
        </Route> */}
        <Route path="/" element={<Navbar />}>
          <Route element={<RequireAuth allowedRoles={["ROLE_CUSTOMER"]} />}>
            <Route path="/MyOrders" element={<MyOrders />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/ordering" element= {<Ordering/>}/>
            <Route path="/address" element={<Address />} />
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
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/" element={<Home />} />
          {category.map((key) => {
            return (
              <Route
                path={`/${key.categoryName}`}
                element={<CategoryItems category={key} />}
              />
            );
          })}
          {
            items.map((key)=> {
              return(
                <Route
                  path={`/items/${key.id}`}
                  element={<ProductPage item={key}/>}
                />
              )
            })
          }
        </Route>
        {/* public routs */}
        <Route path="/login" element={<LogIn />} />
        <Route path="register" element={<Register/>} />
        {/* <Route path= '/unauthorized' element= { <Unauthirized/>} />    */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
