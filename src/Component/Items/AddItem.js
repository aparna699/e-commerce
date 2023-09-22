import React, { useState, useEffect } from "react";
import axios from "../../api/axios";

export const AddItem = () => {
  const [productName, setProductName] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [qty, setQty] = useState();
  const [imgUrl, setImgUrl] = useState();
  const [categoryId, setCategoryId] = useState();
  const [category, setCategory] = useState([]);
  const url = "/api/items";

  useEffect(() => {
    console.log("category");
    const items = JSON.parse(localStorage.getItem("category"));
    if (items) {
      setCategory(items);
    }
  }, [localStorage.getItem("category")]);

  const addItem = async (e) => {
    e.preventDefault();
    const data = {
      productName: productName,
      price: price,
      description: description,
      qty: qty,
      imgUrl: [imgUrl],
      categoryId: categoryId,
    };
    console.log(data);
    const header = {
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.post(url, data, { headers: header });
      console.log(response);
      console.log("Add Item");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="col-sm-6 col-md-3">
      <button
        type="button"
        className="btn btn-dark col-sm-12"
        data-bs-toggle="modal"
        data-bs-target="#Add"
      >
        Add Item
      </button>

      <div
        class="modal fade"
        id="Add"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title"> Add Item </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div class="modal-body">
              <form onSubmit={addItem}>
                <div className="container-fluid">
                  <div className="row my-2">
                    <input
                      className="col-sm-12 opacity-60 p-2"
                      type="text"
                      onChange={(e) => setProductName(e.target.value)}
                      value={productName}
                      placeholder="Product Name"
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
                      required
                    />
                  </div>
                  <div className="row my-2">
                    <input
                      className="col-sm-12 opacity-60 p-2"
                      type="text"
                      onChange={(e) => setImgUrl(e.target.value)}
                      value={imgUrl}
                      placeholder="Image"
                    />
                  </div>
                  <div className="row my-2">
                    <textarea
                      className="col-sm-12 opacity-60 p-2"
                      type="text"
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                      placeholder="Description"
                    />
                  </div>
                  <div className="row">
                    <select
                      class=" col-sm-12 opacity-60 p-2"
                      aria-label=".form-select-sm example"
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      required
                    >
                      <option className="col-sm-12"> Select Category </option>
                      {category.map((key) => {
                        return (
                          <option className="col-sm-12" value={`${key.id}`}>
                            {" "}
                            {`${key.categoryName}`}{" "}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="submit"
                    class="btn btn-dark"
                    data-bs-dismiss="modal"
                  >
                    Add Item
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
