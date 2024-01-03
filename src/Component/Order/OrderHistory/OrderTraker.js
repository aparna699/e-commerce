import React from "react";

export const OrderTraker = (props) => {
    const statusId = props.statusId
  let progress = 25;
  if (statusId == "Order_Packed") {
    progress = 50;
  } else if (statusId == "Shipped") {
    progress = 75;
  } else if (statusId == "Delivered") {
    progress = 100;
  }

  return (
    <div className="p-1">
         <div className="row p-2">
        <div className="col-3 d-flex justify-content-end p-0">
          <h5>Recived</h5>
        </div>
        <div className="col-3 d-flex justify-content-end p-0">
          <h5>Packed</h5>
        </div>
        <div className="col-3 d-flex justify-content-end p-0">
          <h5>Shipped</h5>
        </div>
        <div className="col-3 d-flex justify-content-end ">
          <h5>Delivered</h5>
        </div>
      </div>
      
      <div class="progress" style={{ height: "20px" }}>
        <div
          class="progress-bar bg-secondary"
          role="progressbar"
          style={{ width: `${progress}%` }}
          aria-valuenow={`${progress}`}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
     
    </div>
  );
};
