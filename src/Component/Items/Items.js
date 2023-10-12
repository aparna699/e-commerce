import React from "react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

import ItemCard from "./ItemCard";
import ProductEditeCard from "../Items/ProductEditeCard";
import SearchIcon from "@mui/icons-material/Search";

import { useSelector, useDispatch } from "react-redux";
import { Loading } from "../Loading";

const Items = (props) => {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const role = Cookies.get("role");
  const category = props.category;

  const itemsList = useSelector((state) => state.items);
  const dispatch = useDispatch();

  useEffect(() => {
    if(itemsList.isSuccess && !itemsList.isLoading){
      console.log(category)
      if(category === "all"){
        setItems(itemsList.data)
      } else {
        setItems(
          // itemsList.data
          itemsList.data
            .filter( (key) => (key.categoryId.id === category))
            .map((key) => {
              return key;
          })
        );
      }
      
    }
  }, [itemsList]);

  return (
    <div className="px-4">
      {/* <div><strong>Is Loading: </strong>{JSON.stringify(itemsList.isLoading)}</div>
      <div><strong>Is Success: </strong>{JSON.stringify(itemsList.isSuccess)}</div>
      <div><strong>Error Message: </strong>{JSON.stringify(itemsList.errorMessage)}</div> */}
      {(itemsList.isLoading) ? (
        <Loading/>
      ) : (
        <div>
          <div className=" my-2">
            <form class="d-flex ">
              <div
                class="p-2 card rounded-start border-1 bg-light"
                style={{
                  borderRadius: "0%",
                  // "backgroundColor": "lightgray"
                }}
              >
                <SearchIcon style={{ fill: "gray" }} />
              </div>
              <input
                class="form-control rounded-end"
                type="search"
                // placeholder={"Search"}
                style={{ borderRadius: "0%" }}
                placeholder="Search"
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search"
              />
            </form>
          </div>
          {items.length === 0 ? (
            <div className="card border-0">
              <div>
                <div className="pt-4 d-flex justify-content-center">
                  <img
                    src="https://app.lssquare.com/static/media/empty_product_banner.c076afe7.png"
                    style={{ width: "300px" }}
                  />
                </div>
              </div>
              <div className="card-body d-flex justify-content-center">
                <h5 className="fw-bold">No Items Found</h5>
              </div>
            </div>
          ) : (
            <div />
          )}
          <div className="row">
            {role === "ROLE_ADMIN"
              ? items
                  .filter((post) => {
                    if (query === "") {
                      //if query is empty
                      return post;
                    } else if (
                      post.productName
                        .toLowerCase()
                        .includes(query.toLowerCase())
                        // && post.categoryId.id === category
                        ) {
                      //returns filtered array
                      return post;
                    }
                  })
                  .map((key) => {
                    return <ProductEditeCard item={key} />;
                  })
              : items
                  .filter((post) => {
                    if (query === "") {
                      //if query is empty
                      return post;
                    } else if (
                      post.productName
                        .toLowerCase()
                        .includes(query.toLowerCase())
                        // && post.categoryId.id === category
                    ) {
                      //returns filtered array
                      return post;
                    }
                  })
                  .map((key) => {
                    return <ItemCard item={key} />;
                  })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Items;
