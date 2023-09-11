import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import axios from '../api/axios'

const EditCategory = () => {
    const [categoryName, setCategoryName] = useState()
    const [imgUrl, setImgUrl] = useState()
    const token = Cookies.get('token')

    const [categoryId, setCategoryId] = useState();
    const [category, setCategory] = useState([]);

  useEffect(() => {
    console.log("category");
    const items = JSON.parse(localStorage.getItem("category"));
    if (items) {
      setCategory(items);
    }
  }, [localStorage.getItem("category")]);
    
    const editeCategory = async(e) => {
        e.preventDefault()
        const data = {
            categoryName: categoryName,
            categoryImgUrl: imgUrl
        }
        console.log(data)
        const header = {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
          }
          try {
            const response = await axios.put(
                `/api/category/${categoryId}`, 
                data, 
                { headers: header });
            console.log(response)
            console.log("Edite Item");
          } catch (err) {
            console.log(err);
          }
    }

  return (
    <div className='col-sm-6 col-md-3'>
      <button
        type="button"
        className="btn btn-outline-dark col-sm-12"
        data-bs-toggle="modal"
        data-bs-target="#Category"
      >
        Edit Category
      </button>

      <div
        class="modal fade"
        id="Category"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title"> Edite Category </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div class="modal-body">
              <form onSubmit={editeCategory}>
                <div className="container-fluid">
                <div className="row">
                  <select
                    class=" col-sm-12 opacity-60 p-2"
                    aria-label=".form-select-sm example"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    required
                  >
                    <option className="col-sm-12"> Select Category </option>
                    {category.map((key) => {
                      return (
                          <option className="col-sm-12" value={`${key.id}`}>
                            {`${key.categoryName}`}
                          </option>
                        )
                        })}
                  </select>
                </div>
                  <div className="row my-2">
                    <input
                      className="col-sm-12 opacity-60 p-2"
                      type="text"
                      onChange={(e) => setCategoryName(e.target.value)}
                      value={categoryName}
                      placeholder= "Category Name"
                    />
                  </div>
                  
                  <div className="row my-2">
                    <input
                      className="col-sm-12 opacity-60 p-2"
                      type="text"
                      onChange={(e) => setImgUrl(e.target.value)}
                      value={imgUrl}
                      placeholder="Category Image"
                    />
                  </div>
                  
                </div>
                <div class="modal-footer">
                  <button
                    type="submit"
                    class="btn btn-dark"
                    data-bs-dismiss="modal"
                  >
                    Edite Category
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditCategory;