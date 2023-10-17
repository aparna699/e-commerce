import createExtraActions from "./actions";

const extraActions = createExtraActions();

function createExtraReducers() {
    return (builder) => {
        logIn();
        register();

        function logIn() {
            var { pending, fulfilled, rejected } = extraActions.logIn;
            builder
                .addCase(pending, (state) => {
                    state.isLoading = true;
                    state.data = {
                        token: undefined,
                        role: undefined,
                        userId: undefined
                    }
                })
                .addCase(fulfilled, (state, { payload }) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.isLogedIn = true
                    state.data.token = payload.accessToken;
                    state.data.role = payload.role;
                    state.data.userId = payload.id;
                })
                .addCase(rejected, (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = false;
                    state.errorMessage = action;
                })
        }

        function register() {
            var { pending, fulfilled, rejected } = extraActions.register;
            builder
                .addCase(pending, (state) => {
                    state.isLoading = true;
                    state.isLogedIn = false;
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