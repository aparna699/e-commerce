import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { EditQtyButton } from "./EditQtyButton";

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { cartActions } from "../../store/Cart/cartSlice";

export const AddToCartButton = (props) => {
  const item = props.item;
  const token = Cookies.get("token");
  const role = Cookies.get("role");
  const userId = Cookies.get("userId");
  const [cart, setCart] = useState([]);
  

  const dispatch = useDispatch();
  const cartList = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(cartActions.getCartList(userId))
  }, []);

  useEffect(() => {
    if (!cartList.isLoading && cartList.isSuccess) {
      setCart(cartList.data);
    }
  },[cartList])

  const addItemToCart = async (e) => {
    e.preventDefault();
    const data = JSON.stringify({
      userId: `${userId}`,
      itemId: `${item.id}`,
      qty: 1,
    });

    dispatch(cartActions.addToCart(data))

    if(cartList.isSuccess && !cartList.isLoading){
      window.location.reload(true)
    }
    
  };

  return (
    // <button onClick={addItemToCart} className="btn btn-dark ">
    //   Add To Cart
    // </button>
    <div>
      {role === "ROLE_CUSTOMER" ? (
        cart.find((c) => c.itemId.id === item.id) ? (
          <EditQtyButton cart={cart.find((c) => c.itemId.id === item.id)} />
        ) : (
          <div className="d-flex justify-content-end">
            {/* <AddToCartButton item= {item}/> */}
            <button onClick={addItemToCart} className="btn btn-dark ">
              <ShoppingCartIcon style={{fill: "white"}}/> Add To Cart
            </button>
          </div>
        )
      ) : (
        // <button className="btn btn-dark" onClick={addToCart}>Add To Cart</button>
        <div></div>
      )}
    </div>
  );
};
