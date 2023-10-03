import React from 'react'
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "../api/axios";
// import ItemCard from '../Component/Items/ItemCard';
import ProductEditeCard from '../Component/Items/ProductEditeCard';
import { AddItem } from '../Component/Items/AddItem';
import AddCategory from '../Component/Category/AddCategory';
import EditCategory from '../Component/Category/EditCategory';
import SearchIcon from "@mui/icons-material/Search";

const Products = () => {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");

  const token = Cookies.get("token");
  const url = '/api/items';
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    console.log("hi");
    const getItems = async () => {
      try {
        const header = {
          // Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };
        const response = await axios.get(url, {
          headers: header,
        });

        console.log(response.data);
        isMounted && setItems(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getItems();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div className='px-4'>
      <div className='row my-2'>
        <AddItem/>
        <div className='col-sm-6 col-md-3' />
        <div className='col-md-6 col-12 d-flex justify-content-end'>
          <AddCategory/>
          <EditCategory/>
        </div>
      </div>

      <div className="row">
      <form class="d-flex my-2">
        <div 
          class="p-2 card rounded-start border-1 bg-light" 
          style={{
            "borderRadius": "0%", 
            // "backgroundColor": "lightgray" 
          }} >
            <SearchIcon 
              style={{"fill": "gray"}}
            />
        </div>
        <input
          class="form-control rounded-end"
          type="search"
          // placeholder={"Search"}
          style={{"borderRadius": "0%" }}
          placeholder="Search" 
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search"
        />
      </form>

        {
          items.filter(post => {
            if (query === "") {
              //if query is empty
              return post;
            } else if (post.description.toLowerCase().includes(query.toLowerCase())) {
              //returns filtered array
              return post;
            }}).map((key) => {
            return <ProductEditeCard item={key} />;
          })
        }
      </div>
    </div>
  )
}

export default Products;