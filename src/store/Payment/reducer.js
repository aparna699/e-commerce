import createExtraActions from "./actions";

const extraActions = createExtraActions();

function createExtraReducers() {
    return (builder) => {
        createPaymentIntent();

        function createPaymentIntent() {
            var { pending, fulfilled, rejected } = extraActions.createPaymentIntent;
            builder
                .addCase(pending, (state) => {
                    state.isLoading = true;
                    state.data = [];
                })
                .addCase(fulfilled, (state, { payload }) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.data = payload;
                    state.clientSecret = payload.clientSecret;
                })
                .addCase(rejected, (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = false;
                    state.errorMessage = action;
                })
        }
    }
}

export default createExtraReducers;