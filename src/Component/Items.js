import React from "react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import ItemCard from "./ItemCard";
import ProductEditeCard from "./ProductEditeCard";
import SearchIcon from "@mui/icons-material/Search";


const Items = (props) => {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
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
        localStorage.setItem("items", JSON.stringify(response.data));
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

  // useEffect(() => {
  //   items.filter(post => {
  //     if (query === "") {
  //       //if query is empty
  //       return post;
  //     } else if (post.productName.toLowerCase().includes(query.toLowerCase())) {
  //       //returns filtered array
  //       return post;
  //     }
  //   });
  // },[query])

  return (
    <div>
      <div className="mx-5 my-2">
      <form class="d-flex px-2">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Search"
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search"
        />
        <button class="btn btn-outline-success" type="submit">
          <SearchIcon color="success"/>
        </button>
      </form>
      </div>
      <div className="row px-5">
        {role === "ROLE_ADMIN"
          ? (
            items.filter(post => {
              if (query === "") {
                //if query is empty
                return post;
              } else if (post.productName.toLowerCase().includes(query.toLowerCase())) {
                //returns filtered array
                return post;
              }}).map((key) => {
              return <ProductEditeCard item={key} />;
            }))
          : (
            items.filter(post => {
              if (query === "") {
                //if query is empty
                return post;
              } else if (post.productName.toLowerCase().includes(query.toLowerCase())) {
                //returns filtered array
                return post;
              }}).map((key) => {
              return <ItemCard item={key} />;
            })
          )
        }
      </div>
    </div>
  );
};

export default Items;
