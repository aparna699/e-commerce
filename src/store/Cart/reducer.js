import Cookies from "js-cookie";
import createExtraActions from "./actions";

const extraActions = createExtraActions();

function createExtraReducers() {
    return (builder) => {
        getCartList();
        addToCart();
        editQty();
        deleteCartItem();

        function getCartList() {
            var { pending, fulfilled, rejected } = extraActions.getCartList;
            builder
                .addCase(pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(fulfilled, (state, {payload})=> {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.data = payload;
                    let price =0
                    payload.map((key) => {
                        price = price + key.qty*(key.itemId.price)
                    })
                    state.totalPrice= price;
                    let qty=0
                    payload.map((key) => {
                        qty = qty + key.qty;
                    })
                    state.qty = qty
                    const body = {
                        items: payload,
                        amount: price
                    }
                    Cookies.set("items", JSON.stringify(payload))
                    Cookies.set("amount", price)
                }) 
                .addCase(rejected, (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = false;
                    state.errorMessage = JSON.stringify(action.payload);
                })
        }

        function addToCart() {
            var { pending, fulfilled, rejected } = extraActions.addToCart;
            builder
                .addCase(pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(fulfilled, (state, {payload})=> {
                    state.isLoading = false;
                    state.isSuccess = true;
                }) 
                .addCase(rejected, (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = false;
                    state.errorMessage = JSON.stringify(action.payload);
                })
        }

        function editQty(){
            var { pending, fulfilled, rejected } = extraActions.editQty;
            builder
                .addCase(pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(fulfilled, (state, {payload})=> {
                    state.isLoading = false;
                    state.isSuccess = true;
                }) 
                .addCase(rejected, (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = false;
                    state.errorMessage = JSON.stringify(action.payload);
                })
        }

        function deleteCartItem(){
            var { pending, fulfilled, rejected } = extraActions.deleteCartItem;
            builder
                .addCase(pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(fulfilled, (state, {payload})=> {
                    state.isLoading = false;
                    state.isSuccess = true;
                }) 
                .addCase(rejected, (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = false;
                    state.errorMessage = JSON.stringify(action.payload);
                })
        }
    }
}

export default createExtraReducers;