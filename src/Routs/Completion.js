import Cookies from "js-cookie";
import { useState } from "react";
import { useEffect } from "react";
import { orderAction } from "../store/Order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/Cart/cartSlice";
import { itemsActions } from "../store/items/itemsSlice";
import { useSelect } from "@mui/base";
import CartItemCard from "../Component/Cart/CartItemCard";
 
import {Loading} from "../Component/Loading"


const Completion = () => {
    const dispatch = useDispatch();
    const orderList = useSelector((state) => state.order)
    let count = 0
    const amount = Cookies.get("amount")

    useEffect(() => {
        const userId = Cookies.get("userId")
        const address = Cookies.get("address")
        // const amount = Cookies.get("amount")
        var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + 'T' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()+"."+today.getMilliseconds();
        
        const body = {
            userId: userId,
            orderDate: date,
            addressId: address,
            totalCost: amount,
            statusId: 0
        }
        // const items = JSON.parse(Cookies.get("items"));
        console.log("Ordering")
        if(items.length > 0){
            dispatch(orderAction.createOrder(body));
            dispatch(cartActions.deleteCartItem(`api/user-cart-items/${userId}`))
        }
        console.log("delte")
    },[])

    useEffect(() => {
        console.log("orderId: ", orderList.orderId)
        const items = JSON.parse(localStorage.getItem("items"));

        if(items != undefined){
            const arr = items.map((k) => {
                return(
                    {
                        "itemId": k.itemId.id,
                        "orderId": orderList.orderId,
                        "qty": k.qty,
                        "price": k.itemId.price
                    }
                )
            })

            if(!orderList.isLoading && orderList.isSuccess && !orderList.isOrderListSuccess ){
                console.log("enter")
                if(count == 0){
                    dispatch(orderAction.createOrderLine(arr));
                    count = count + 1
                    arr.map((k) => {
                        const body = JSON.stringify({
                            qty: k.qty,
                        })
                        const itemId = k.itemId
                        dispatch(itemsActions.reduceItemQty({itemId ,body}));
                        // console.log("qty",)
                    })
                    console.log("excute1")
                }
            }
        }  
    }, [orderList.isSuccess])
    const items = JSON.parse(localStorage.getItem("items"));
    return (
        <div className="d-flex justify-content-center" >
            <div className="card w-50 text-center m-5 p-3  border-0" >
                {
                    (orderList.isLoading)? (
                        <Loading />
                    ):(
                        <></>
                    )
                }
                {
                    (!orderList.isSuccess && !orderList.isLoading)?(
                        <div>
                            <img
                                width="100px"
                                src="https://cdn1.iconfinder.com/data/icons/color-bold-style/21/08-512.png" 
                            />
                            <h1>Sorry Order Failed</h1>
                            <h7>We are unable to process your order</h7>
                        </div>
                    ):(
                        <></>
                    )
                }
                {(orderList.isSuccess && !orderList.isLoading)?
                (
                    <div className="p-2">
                        <img
                            width= "100px" 
                            src="https://www.iconpacks.net/icons/3/free-icon-check-7058.png" 
                        />
                        <h1>Thank you !!</h1>
                        <h1>Order Confirmed</h1>
                        <div className="card"></div>
                        <h5 className="row m-2">
                            <div className="col-sm-3"></div>
                            <span className="col-sm-3 col-md-4 fw-bold">Item</span>
                            <span className="col-sm-2 col-md-2 fw-bold">Qty</span>
                            <span className="col-sm-3 col-md-3 text-end fw-bold">Price</span>
                        </h5>
                    {
                        items.map((k) => {
                            return (
                                <div className="m-2">
                                    <p className="row">
                                    <a className="col-sm-3" href={`/items/${k.itemId.id}`}>
                                        <img
                                        className="col-sm-12"
                                        src={k.itemId.imgUrl[0]}
                                        style={{ height: "80px" }}
                                        />
                                    </a>
                                    <span className="col-sm-3 col-md-4 ">
                                        {k.itemId.productName}
                                    </span>
                                    <span className="col-sm-2 col-md-2 text-center">{k.qty}</span>
                                    <span className="col-sm-3 col-md-3 text-end">
                                        Rs.
                                        {(k.itemId.price * k.qty)
                                        .toFixed(2)
                                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                                    </span>
                                    </p>
                                </div>
                            )
                            })
                    }
                    <div className="card"></div>
                    <h6 className="row m-2">
                        <span className="col-sm-9 col-md-7 fw-bold">Total: </span>
                        {/* <span className="col-sm-3 col-md-1 fw-bold">{qty}</span> */}
                        <span className="col-sm-3 col-md-5 fw-bold text-end">
                        Rs.{" "}
                        {Number(amount)
                            .toFixed(2)
                            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                        }
                        </span>
                    </h6>
                    </div>
                ):(<></>)}

                

            </div>
            

        </div>
    );
}

export default Completion;