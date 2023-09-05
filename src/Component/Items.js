import React from "react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import ItemCard from "./ItemCard";

const Items = (props) => {
  const [items, setItems] = useState([]);
  const token = Cookies.get("token");
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
      <div className="row flex-row flex-nowrap px-5">
        {items.map((key) => {
          return <ItemCard item={key} />;
        })}
      </div>
  );
};

export default Items;
