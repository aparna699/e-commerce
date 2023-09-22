import React from 'react'
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "../api/axios";
// import ItemCard from '../Component/Items/ItemCard';
import ProductEditeCard from '../Component/Items/ProductEditeCard';
import { AddItem } from '../Component/Items/AddItem';
import AddCategory from '../Component/Category/AddCategory';
import EditCategory from '../Component/Category/EditCategory';

const Products = () => {
  const [items, setItems] = useState([]);
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
    <div>
      <div className='row px-5 my-2'>
        <AddItem/>
        <div className='col-sm-6 col-md-3' />
        <AddCategory/>
        <EditCategory/>
      </div>
      <div className="row px-5">
        {items.map((key) => {
          return <ProductEditeCard item={key} />;
        })}
      </div>
    </div>
  )
}

export default Products;