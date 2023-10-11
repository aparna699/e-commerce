import logo from "./logo.svg";
import "./App.css";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"

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
import { getCategoryList } from "./store/Category/actions";
import { getItemsList } from "./store/items/actions";
import { categoryActions } from "./store/Category/categorySlice";

function App() {
  const [category, setCategory] = useState([]);
  const [items, setItems] = useState([]);

  const categoryList = useSelector((state) => state.category);
  const itemsList = useSelector((state) => state.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(categoryActions.getCategoryList());
    dispatch(getItemsList("/api/items"));
    // if(categoryList.isSuccess){
    //   setCategory(categoryList.data);
    // }
  }, []);
  useEffect(() => {
    if(categoryList.isSuccess && !categoryList.isLoading){
      setCategory(categoryList.data);
    }
    console.log(category)
    console.log(categoryList.data)
  }, [categoryList]);

  useEffect(() => {
    setItems(itemsList.data);
  }, [itemsList]);
  
  return (
    <BrowserRouter>
      <Routes>
        {/* {console.log("categoryList")} */}
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
                key= {key.id}
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
