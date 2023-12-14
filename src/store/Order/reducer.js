import createExtraActions from "./actions";

const extraActions = createExtraActions();

function createExtraReducers() {
    return (builder) => {
        createOrder();
        createOrderList();
        getOrders();
        getOrderItems();

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

        function getOrders() {
            var { pending, fulfilled, rejected } = extraActions.getOrders;
            builder
                .addCase(pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(fulfilled, (state, {payload})=> {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.orders = payload;
                }) 
                .addCase(rejected, (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = false;
                    state.errorMessage = JSON.stringify(action.payload);
                })  
        }

        function getOrderItems(){
            var { pending, fulfilled, rejected } = extraActions.getOrderItems;
            builder
                .addCase(pending, (state) => {
                    state.isOrderListLoading = true;
                    // state.orderLines =[]
                })
                .addCase(fulfilled, (state, action)=> {
                    state.isOrderListLoading = false;
                    state.isOrderListSuccess = true;
                    // state.orderLines =[{
                    //     id: action.payload.orderId.id,
                    //     items: action.payload,
                    // }];
                    state.orderLines = action.payload;
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