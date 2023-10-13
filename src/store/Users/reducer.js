import createExtraActions from "./actions";

const extraActions = createExtraActions();

function createExtraReducers() {
    return (builder) => {
        getUsersList();
        getProfileInfo();
        addUsers();
        deleteUser();

        function getUsersList() {
            var { pending, fulfilled, rejected } = extraActions.getUsersList;
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

        function getProfileInfo() {
            var { pending, fulfilled, rejected } = extraActions.getProfileInfo;
            builder
                .addCase(pending, (state) => {
                    state.isLoading = true;
                    state.data = [];
                })
                .addCase(fulfilled, (state, { payload }) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.user = payload;
                })
                .addCase(rejected, (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = false;
                    state.errorMessage = action;
                })
        }

        function addUsers() {
            var { pending, fulfilled, rejected } = extraActions.addUsers;
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

        function deleteUser() {
            var { pending, fulfilled, rejected } = extraActions.deleteUser;
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
    }
}

export default createExtraReducers;