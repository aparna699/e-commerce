import createExtraActions from "./actions";

const extraActions = createExtraActions();

function createExtraReducers() {
    return (builder) => {
        getItemsList();
        addItems();
        editItems();
        deleteItems();
        reduceItemQty();

        function getItemsList() {
            var { pending, fulfilled, rejected } = extraActions.getItemsList;
            builder
                .addCase(pending, (state) => {
                    state.isLoading = true;
                    state.data = [];
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

        function addItems() {
            var { pending, fulfilled, rejected } = extraActions.addItems;
            builder
                .addCase(pending, (state) => {
                    state.isLoading = true;
                    state.data = [];
                })
                .addCase(fulfilled, (state, { payload }) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                })
                .addCase(rejected, (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = false;
                    state.errorMessage = action;
                })
        }

        function editItems() {
            var { pending, fulfilled, rejected } = extraActions.editItems;
            builder
                .addCase(pending, (state) => {
                    state.isLoading = true;
                    state.data = [];
                })
                .addCase(fulfilled, (state, { payload }) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                })
                .addCase(rejected, (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = false;
                    state.errorMessage = action;
                })
        }

        function deleteItems() {
            var { pending, fulfilled, rejected } = extraActions.deleteItems;
            builder
                .addCase(pending, (state) => {
                    state.isLoading = true;
                    state.data = [];
                })
                .addCase(fulfilled, (state, { payload }) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                })
                .addCase(rejected, (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = false;
                    state.errorMessage = action;
                })
        }

        function reduceItemQty() {
            var { pending, fulfilled, rejected } = extraActions.reduceItemQty
            builder
                .addCase(pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(fulfilled, (state, { payload }) => {
                    state.isLoading = false;
                    state.isSuccess = true;
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