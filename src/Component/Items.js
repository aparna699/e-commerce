import React from "react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import ItemCard from "./ItemCard";
import ProductEditeCard from "./ProductEditeCard";

const Items = (props) => {
  const [items, setItems] = useState([]);
  const role = Cookies.get("role");
  const url = props.url;
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
      <div className="row px-5">
        {(role === "ROLE_ADMIN")?(
          items.map((key) => {
          return <ProductEditeCard item={key} />;
        })
        ):(
          items.map((key) => {
          return <ItemCard item={key} />;
        })
        )}
      </div>
  );
};

export default Items;
