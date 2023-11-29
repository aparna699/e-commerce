import createExtraActions from "./actions";

const extraActions = createExtraActions();

function createExtraReducers() {
    return (builder) => {
        createOrder();

        function createOrder() {
            var { pending, fulfilled, rejected } = extraActions.createOrder;
            builder
                .addCase(pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(fulfilled, (state, {payload})=> {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.orderId = payload.id;
                }) 
                .addCase(rejected, (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = false;
                    state.errorMessage = JSON.stringify(action.payload);
                })
        }

        function createOrderList() {
            var { pending, fulfilled, rejected } = extraActions.createOrderLine;
            builder
                .addCase(pending, (state) => {
                    state.isOrderListLoading = true;
                })
                .addCase(fulfilled, (state, {payload})=> {
                    state.isOrderListLoading = false;
                    state.isOrderListSuccess = true;
                }) 
                .addCase(rejected, (state, action) => {
                    state.isOrderListLoading = false;
                    state.isOrderListSuccess = false;
                    state.errorMessage = JSON.stringify(action.payload);
                })
        }
    }
}

export default createExtraReducers;