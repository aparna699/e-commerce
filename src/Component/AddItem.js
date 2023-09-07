import React, { useState , useEffect} from "react";

export const AddItem = () => {
  const [productName, setProductName] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [qty, setQty] = useState();
  const [imgUrl, setImgUrl] = useState();
  const [categoryId, setCategoryId] = useState();
  const [category, setCategory] = useState([]);

  useEffect(() => {
    console.log("category");
    const items = JSON.parse(localStorage.getItem("category"));
    if (items) {
        setCategory(items);
    }
  }, [localStorage.getItem("category")]);  

  const addItem = (e) => {
    e.preventDefault();
    const data = JSON.stringify({
        productName: productName,
        price: price,
        description: description,
        qty: qty,
        imgUrl: imgUrl,
        categoryId: categoryId,
      });
    console.log("Add Item");
    console.log(data);
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-dark col-md-2"
        data-bs-toggle="modal"
        data-bs-target="#Add"
      >
        Add Item
      </button>

      <div
        class="modal fade"
        id="Add"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title"> Add Item </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div class="modal-body">
              <form onSubmit={addItem}>
                <div className="container-fluid">
                  <div className="row my-2">
                    <label className="col-md-4">Product Name: </label>
                    <input
                      className="col-md-8 px-2"
                      type="text"
                      onChange={(e) => setProductName(e.target.value)}
                      value={productName}
                    />
                  </div>
                  <div className="row my-2">
                    <label className="col-md-4"> Price: </label>
                    <input
                      className="col-md-8 px-2"
                      type="text"
                      onChange={(e) => setPrice(e.target.value)}
                      value={price}
                    />
                  </div>
                  <div className="row my-2">
                    <label className="col-md-4"> Quantity: </label>
                    <input
                      className="col-md-8 px-2"
                      type="text"
                      onChange={(e) => setQty(e.target.value)}
                      value={qty}
                    />
                  </div>
                  <div className="row">
                    <label className="col-md-4">Description: </label>
                    <textarea
                      className="col-md-8 px-2"
                      type="text"
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                    />
                  </div>
                  <div>
                  <select class="form-select form-select-sm" aria-label=".form-select-sm example" 
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    >
                    {
                        category.map((key) => {
                            return <option value={`${key.id}`}> {`${key.categoryName}`} </option>
                        })
                    }
                    {/* <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option> */}
                    </select>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="submit"
                    class="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
