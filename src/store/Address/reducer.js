import createExtraActions from "./actions";

const extraActions = createExtraActions();

function createExtraReducers() {
    return (builder) => {
      getAllAddress();
      addUserAddress();
      editAddess();
      deleteAddress();
  
      function getAllAddress() {
        var { pending, fulfilled, rejected } = extraActions.getAllAddress;
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
  
      function addUserAddress() {
        var { pending, fulfilled, rejected } = extraActions.addUserAddress;
  
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
  
      function editAddess() {
        var { pending, fulfilled, rejected } = extraActions.editAddress;
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
  
      function deleteAddress() {
        var { pending, fulfilled, rejected } = extraActions.deleteAddress;
  
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

export default createExtraReducers