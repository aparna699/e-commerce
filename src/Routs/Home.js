import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import CategoryCards from "../Component/Category/CategoryCards";
import { useSelector, useDispatch } from "react-redux";

import Items from "../Component/Items/Items";
import { getCategoryList } from "../store/Category/actions";
import { Loading } from "../Component/Loading";

const Home = () => {
  const [category, setCategory] = useState([]);
  const categoryList = useSelector((state) => state.category);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategoryList());
  }, []);
  useEffect(() => {
    setCategory(categoryList.data);
  }, [categoryList]);

  return (
    <div>
      <Outlet />
      {console.log(categoryList)}
      <div className=" py-2">
        {
            (categoryList.isLoading)?(
              <Loading/>
             ):(
            <div className="scroller row flex-row flex-nowrap overflow-auto px-4">
              {category.map((key) => {
                return (
                  <CategoryCards
                    categoryId={key.id}
                    categoryName={key.categoryName}
                    img={key.categoryImgUrl}
                  />
                );
              })}
            </div>
            )

        }
      </div>
      <Items url="/api/items" />
    </div>
  );
};

export default Home;
