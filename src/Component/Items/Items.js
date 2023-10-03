import React from "react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import ItemCard from "./ItemCard";
import ProductEditeCard from "../Items/ProductEditeCard";
import SearchIcon from "@mui/icons-material/Search";


const Items = (props) => {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const role = Cookies.get("role");
  const url = props.url;
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
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

  return (
    <div className="px-4">
      <div className=" my-2">
      <form class="d-flex">
      <div class="p-2">
          <SearchIcon />
        </div>
        <input
          class="form-control"
          type="search"
          // placeholder={"Search"}
          placeholder="Search" 
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search"
        />
        {/* <button class="btn border-0" type="submit" 
        // style={{"margin-left": "-50px"}}
        onClick={(e) => setQuery(e.target.value)}
        >
          <SearchIcon />
        </button> */}
      </form>
      </div>
      <div className="row">
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
