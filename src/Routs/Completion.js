import Cookies from "js-cookie";
import { useState } from "react";
import { useEffect } from "react";
import { orderAction } from "../store/Order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/Cart/cartSlice";


const Completion = () => {
    const dispatch = useDispatch();
    const orderList = useSelector((state) => state.order)
    useEffect(() => {
        const userId = Cookies.get("userId")
        const address = Cookies.get("address")
        const amount = Cookies.get("amount")
        var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + 'T' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        
        const body = {
            userId: userId,
            orderDate: date,
            addressId: address,
            totalCost: amount,
            statusId: null
        }
        console.log("Ordering")
        dispatch(orderAction.createOrder(body));
        dispatch(cartActions.deleteCartItem(`api/cart-item/${userId}`))
        console.log("delte")
    },[])

    useEffect(() => {
        console.log("orderId: ", orderList.orderId)
        const items = JSON.parse(Cookies.get("items"));
        
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

            console.log("arr1")
            if(!orderList.isLoading && orderList.isSuccess && !orderList.isOrderListSuccess){
                console.log("arr")
                dispatch(orderAction.createOrderLine(arr));
            }
        }
        
        
    }, [orderList])

    return (
        <div>
            <h1>Thank you! 🎉</h1>
            {(orderList.isSuccess && !orderList.isLoading)?
            <h1>Order Confirmed</h1>:<></>}
        </div>
    );
}

export default Completion;