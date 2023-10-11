import Cookies from "js-cookie";
import { useEffect , useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCategoryList } from "../../store/Category/actions";


const CategoryDropdown = () => {
  const [category, setCategory] = useState([]);
  const token = Cookies.get("token");
  const categoryList = useSelector((state) => state.category);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getCategoryList());
  // }, []);
  useEffect(() => {
    setCategory(categoryList.data);
  }, [categoryList]);

  return (
    <div>
      <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li>
              <a className="dropdown-item" href="/">
                All
              </a>
            </li>
        {category.map((key) => {
          return (
            <li id= {key.id}>
              <a className="dropdown-item" href={key.categoryName}>
                {key.categoryName}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoryDropdown;
