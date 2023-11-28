import Cookies from "js-cookie";
import { useState } from "react";
import { useEffect } from "react";
import { orderAction } from "../store/Order/orderSlice";
import { useDispatch, useSelector } from "react-redux";


const Completion = () => {
    const dispatch = useDispatch();
    const orderList = useSelector((state) => state.order)
    useEffect(() => {
        const userId = Cookies.get("userId")
        const items = JSON.parse(Cookies.get("items"));
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
        // dispatch(orderAction.createOrder(body));
        
        const arr = items.map((k) => {
            console.log(k)
            return(
                {
                    "itemId": k.itemId.id,
                    "orderId": 352,
                    "qty": k.qty,
                    "price": k.itemId.price
                }
            )
        })
        console.log(arr)
    },[])

    return (
        <div>
            <h1>Thank you! 🎉</h1>
            {(orderList.isSuccess && !orderList.isLoading)?
            <h1>Order Confirmed</h1>:<></>}
        </div>
    );
}

export default Completion;