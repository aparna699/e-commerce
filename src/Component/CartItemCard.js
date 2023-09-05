import React from "react";

const CartItemCard = (props) => {
  const item = props.item;
  const qty = props.qty;
  // console.log(Item)
  return (
    <div className="col-md-12 px-5">
      <div className="card m-2">
        <div className="row">
          <div className="col-md-3">
            <img
              src={item.imgUrl[0]}
              class="card-img-top"
              alt="..."
              style={{ height: "150px" }}
            />
          </div>
          <div className="col-md-9">
            <div className="card-body">
              <h5>{item.productName}</h5>
              <h7>Qty: {qty}</h7>
              <div className="d-flex justify-content-end" >
                <button className="btn btn-outline-dark btn-sm" style={{"height":"30px"}}>-</button>
                <div className=" mx-2 my-1 "> {qty} </div>
                <button className="btn btn-outline-dark btn-sm" style={{"height":"30px"}}>+</button>
                <button className="btn btn-dark btn-sm mx-2" style={{"height":"30px"}}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
