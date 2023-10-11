import createExtraActions from "./actions";

const extraActions = createExtraActions();

function createExtraReducers() {
    return (builder) => {
        getCategoryList();

        function getCategoryList() {
            var { pending, fulfilled, rejected } = extraActions.getCategoryList;
            builder
            .addCase(pending, (state) => {
                        state.isLoading = true
            })
            .addCase(fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.data = payload;
            })
            .addCase(rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.errorMessage = action;
            })
            }
    }
}

export default createExtraReducers