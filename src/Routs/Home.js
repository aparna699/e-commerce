import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import CategoryCards from "../Component/Category/CategoryCards";
import axios from "../api/axios";
import Items  from "../Component/Items/Items";

const Home = () => {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getCategory = async () => {
      console.log("get Category");
      try {
        const header = {
          // Authorization: `Bearer ${token}`,
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
  }, []);

  return (
    <div>
      <Outlet />
      <div className=" py-2">
        <div className="scroller row flex-row flex-nowrap overflow-auto px-4" >
          {
          category.map((key) => {
            return (
              <CategoryCards
                categoryId={key.id}
                categoryName={key.categoryName}
                img={key.categoryImgUrl}
              />
            );
          })}
        </div>
      </div>
      <Items url="/api/items"/>
    </div>
  );
};

export default Home;
