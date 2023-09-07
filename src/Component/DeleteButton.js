import React from "react";

const DeleteButton = (props) => {
  const itemId = props.id;
  const url = `/api/items/${itemId}`;
  const edite = () => {
    console.log("Edite");
  };
  return (
    <div>
      <button className="btn btn-outline-dark btn-sm mx-2" onClick={edite}>
        Delete
      </button>
    </div>
  );
};

export default DeleteButton;
