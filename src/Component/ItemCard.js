import { ConstructionOutlined } from "@mui/icons-material";
import Cookies from "js-cookie";
import React from "react";

const ItemCard = (props) => {
  const item = props.item;
  const role = Cookies.get('role')

  const addToCart = (e) => {
    e.preventDefault()
    console.log("Add")
  }

  return (
        <div className="col-md-3">
          <div className="card justify-content-center" style={{ "width": "auto"}}>
            <a href={`/items/${item.id}`} >
            <img 
                src={`${item.imgUrl}`} 
                className="card-img-top" alt="..."
                style={{"height": "200px"}}     
            />
            </a>
            <div className="card-body ">
              <h5 className="card-title">{`${item.productName}`}</h5>
              <p className="card-text overflow-hidden" style={{ "height": "50px"}}>
                {`${item.description}`}
              </p>
              {
                (role == 'ROLE_CUSTOMER')?
                (
                  <button className="btn btn-dark" onClick={addToCart}>Add To Cart</button>
                ):(
                  <div></div>
                )
              }
              {/* <a href="#" className="btn btn-primary">
                Go somewhere
              </a> */}
            </div>
          </div>
        </div>
  );
};

export default ItemCard;
