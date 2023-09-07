import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";

const EditButton = (props) => {
  const item = props.items;
  const itemId = item.id;
  console.log(item.id)
  
  const url = `/api/items/${itemId}`;
  const token = Cookies.get("token");

  const [productName, setProductName] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [qty, setQty] = useState();
  const [imgUrl, setImgUrl] = useState();
  const [categoryId, setCategoryId] = useState();

  const edit = (e) => {
    e.preventDefault();
    const data = JSON.stringify({
      productName: productName,
      price: price,
      description: description,
      qty: qty,
      imgUrl: imgUrl,
      categoryId: categoryId,
    });

    console.log("Edit: "+item.id);
    console.log(data);
  };
  console.log(`#${item.id}`)
  return (
    <div>
    {/* Button trigger modal  */}
      <button type="button" class="btn btn-dark btn-sm" data-bs-toggle="modal" data-bs-target={`#Edit${item.id}`}>
        Edit
      </button>
    {/* Modal */}
      <div class="modal fade" id={`Edit${item.id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Product {`${item.id}`}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div class="modal-body">
            <form onSubmit={edit}>
              <div className="container-fluid">
              <div className="row my-2">
                <label className="col-md-4">Product Name: </label>
                <input
                  className="col-md-8 px-2"
                  type= 'text'
                  onChange= {(e) => setProductName(e.target.value)}
                  value = {productName}
                  defaultValue = {item.productName}
                />
              </div>
              <div className="row my-2">
                <label className="col-md-4"> Price: </label>
                <input
                  className="col-md-8 px-2"
                  type= 'text'
                  onChange= {(e) => setPrice(e.target.value)}
                  value = {price}
                  defaultValue = {item.price}
                />
              </div>
              <div className="row my-2">
                <label className="col-md-4"> Quantity: </label>
                <input
                  className="col-md-8 px-2"
                  type= 'text'
                  onChange= {(e) => setQty(e.target.value)}
                  value = {qty}
                  defaultValue = {item.qty}
                />
              </div>
              <div className="row">
                <label className="col-md-4">Description: </label>
                <textarea
                  className="col-md-8 px-2"
                  type= 'text'
                  onChange= {(e) => setDescription(e.target.value)}
                  value = {description}
                  defaultValue = {item.description}
                />
              </div>
              </div>
              <div class="modal-footer">
            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
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
