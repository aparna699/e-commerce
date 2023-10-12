import createExtraActions from "./actions";

const extraActions = createExtraActions();

function createExtraReducers() {
    return (builder) => {
        getCategoryList();
        addCategory();
        deleteCategory();

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
        
        function addCategory() {
            var { pending, fulfilled, rejected } = extraActions.addCategory;
            builder
                .addCase(pending, (state) => {
                    state.isLoading = true
                })
                .addCase(fulfilled, (state, { payload }) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                })
                .addCase(rejected, (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = false;
                })    
        }

        function deleteCategory() {
            var { pending, fulfilled, rejected } = extraActions.deleteCategory;
            builder
                .addCase(pending, (state) => {
                    state.isLoading = true
                })
                .addCase(fulfilled, (state, { payload }) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                })
                .addCase(rejected, (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = false;
                })    
        }

    }
}

export default createExtraReducers