import createExtraActions from "./actions";

const extraActions = createExtraActions();

function createExtraReducers() {
    return (builder) => {
        getCartList();

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