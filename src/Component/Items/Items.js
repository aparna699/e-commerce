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
      <form class="d-flex ">
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
      </div>
      {
          (items.length === 0)?(
            <div className="card border-0">
            <div >
              <div className="pt-4 d-flex justify-content-center">
                <img 
                src="https://app.lssquare.com/static/media/empty_product_banner.c076afe7.png"
                style={{width: "300px"}}
                />
              </div>
            </div>
            <div className="card-body d-flex justify-content-center"><h5 className="fw-bold">No Items Found</h5></div>
            </div>
          ):(
            <div/>
          )
        }
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
