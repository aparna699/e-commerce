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