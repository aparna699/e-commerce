import React from "react";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

const EditItemsQty = (props) => {
  const items = props.items;
  const qty = items.qty;

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
      <div className="d-flex">
        <EditButton items={items} />
        <DeleteButton items={items}/>
      </div>
    </div>
  );
};

export default EditItemsQty;
