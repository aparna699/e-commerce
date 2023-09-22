import Cookies from "js-cookie";
import { useEffect , useState} from "react";
import axios from "../../api/axios";

const CategoryDropdown = () => {
  const [category, setCategory] = useState([]);
  const token = Cookies.get("token");
  const [items, setItems] = useState([]);

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
        localStorage.setItem("category", JSON.stringify(response.data));
        isMounted && setCategory(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getCategory();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

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
