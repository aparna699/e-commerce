import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

import EditIcon from '@mui/icons-material/Edit';

const EditButton = (props) => {
  const item = props.items;
  const itemId = item.id;
  // console.log(item.id);

  const url = `/api/items/${itemId}`;
  const token = Cookies.get("token");

  const [productName, setProductName] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [qty, setQty] = useState();
  const [imgUrl, setImgUrl] = useState();
  const [categoryId, setCategoryId] = useState();
  const [category, setCategory] = useState([]);

  useEffect(() => {
    console.log("category");
    const items = JSON.parse(localStorage.getItem("category"));
    if (items) {
      setCategory(items);
    }
  }, [localStorage.getItem("category")]);

  const edit = async (e) => {
    e.preventDefault();
    let isMounted = true;
    const data = JSON.stringify({
      productName: productName,
      price: price,
      description: description,
      qty: qty,
      imgUrl: (imgUrl)?([imgUrl]):(item.imgUrl),
      categoryId: categoryId,
    });
    const header = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.put(url, data, {
        headers: header,
        withCredentials: true,
      });
      console.log(response);

      isMounted && window.location.reload(true);
    } catch (err) {
      console.log(err);
    }

    console.log("Edit: " + item.id);
    console.log(data);
  };

  return (
    <div>
      {/* Button trigger modal  */}
      <button
        type="button"
        class="btn btn-dark btn-sm"
        data-bs-toggle="modal"
        data-bs-target={`#Edit${item.id}`}
      >
        <EditIcon style={{"fill": "white"}}/>
      </button>
      {/* Modal */}
      <div
        class="modal fade"
        id={`Edit${item.id}`}
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title fw-bold">Edit:  {`${item.productName}`}</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div class="modal-body">
              <form onSubmit={edit}>
                <div className="row my-2">
                  <input
                    className="col-sm-12 opacity-60 p-2"
                    type="text"
                    onChange={(e) => setProductName(e.target.value)}
                    value={productName}
                    placeholder="Product Name"
                    defaultValue={item.productName}
                    required
                  />
                </div>
                <div className="row my-2">
                  <input
                    className="col-sm-12 opacity-60 p-2"
                    type="number"
                    step={500}
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                    placeholder="Price"
                    defaultValue={item.price}
                    required
                  />
                </div>
                <div className="row my-2">
                  <input
                    className="col-sm-12 opacity-60 p-2"
                    type="number"
                    onChange={(e) => setQty(e.target.value)}
                    value={qty}
                    placeholder="Quantity"
                    defaultValue={item.qty}
                    required
                  />
                </div>
                <div className="row my-2">
                  <input
                    className="col-sm-12 opacity-60 p-2"
                    type="text"
                    onChange={(e) => setImgUrl(e.target.value)}
                    value={imgUrl}
                    defaultValue={item.imgUrl}
                    placeholder="Image"
                  />
                </div>
                <div className="row my-2">
                  <textarea
                    className="col-sm-12 opacity-60 p-2"
                    type="text"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    defaultValue={item.description}
                    placeholder="Description"
                  />
                </div>
                <div className="row">
                  <select
                    class=" col-sm-12 opacity-60 p-2"
                    aria-label=".form-select-sm example"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    defaultValue={item.categoryId}
                    required
                  >
                    <option className="col-sm-12"> Select Category </option>
                    {category.map((key) => {
                      return (
                        (key.id === item.id)?(
                          <option selected className="col-sm-12" value={`${key.id}`}>
                            {`${key.categoryName}`}
                          </option>
                        ):(
                          <option className="col-sm-12" value={`${key.id}`}>
                            {`${key.categoryName}`}
                          </option>
                        )
                      );
                        })}
                  </select>
                </div>
                <div class="modal-footer">
                  <button
                    type="submit"
                    class="btn btn-dark"
                    data-bs-dismiss="modal"
                  >
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditButton;
