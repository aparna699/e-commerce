import React from "react";

const EditeItemsQty = (props) => {
  const qty = props.qty;
  return (
    <div>
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-outline-dark btn-sm"
          // onClick={removeItem}
          style={{ height: "30px" }}
        >
          -
        </button>
        <div className=" mx-2 my-1 "> {qty} </div>
        <button
          className="btn btn-outline-dark btn-sm"
          // onClick={addItem}
          style={{ height: "30px" }}
        >
          +
        </button>
      </div>
      <div>
        <button className="btn btn-dark btn-sm">
            Edite
        </button>
        <button className="btn btn-outline-dark btn-sm m-1">
            Delete
        </button>
      </div>
    </div>
  );
};

export default EditeItemsQty;
