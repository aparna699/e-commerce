import React from "react";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

const EditItemsQty = (props) => {
  const items = props.items;
  const qty = items.qty;
  
  return (
    <div>
      <div className="d-flex justify-content-end">
        <EditButton items={items} />
        <DeleteButton itemId={items.id}/>
      </div>
    </div>
  );
};

export default EditItemsQty;
