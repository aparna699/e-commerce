import Cookies from 'js-cookie'
import React, { useState } from 'react'
import axios from '../../api/axios'

import AddIcon from '@mui/icons-material/Add';

const AddCategory = () => {
    const [categoryName, setCategoryName] = useState()
    const [imgUrl, setImgUrl] = useState()
    const token = Cookies.get('token')
    const url = '/api/category'

    const addCategory = async(e) => {
        e.preventDefault()
        // if(imgUrl == undefined){
        //   setImgUrl("https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg")
        // }
        const data = {
            categoryName: categoryName,
            categoryImgUrl: (imgUrl === undefined)?
            ("https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"):
            (imgUrl)
        }
        console.log(data)
        const header = {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
          }
          try {
            const response = await axios.post(
                url, 
                data, { headers: header });
            console.log(response);
            console.log("Add Category");
          } catch (err) {
            console.log(err);
          }
    }

  return (
    <div className='my-2 d-flex justify-content-end'>
      <button
        type="button"
        className="btn btn-outline-dark"
        data-bs-toggle="modal"
        data-bs-target="#AddCategory"
      >
        <AddIcon style={{"fill": "gray"}}/> Add Category
      </button>

      <div
        class="modal fade"
        id="AddCategory"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title"> Add Category </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div class="modal-body">
              <form onSubmit={addCategory}>
                <div className="container-fluid">
                  <div className="row my-2">
                    <input
                      className="col-sm-12 opacity-60 p-2"
                      type="text"
                      onChange={(e) => setCategoryName(e.target.value)}
                      value={categoryName}
                      placeholder= "Category Name"
                      required
                    />
                  </div>
                  
                  <div className="row my-2">
                    <input
                      className="col-sm-12 opacity-60 p-2"
                      type="text"
                      onChange={(e) => setImgUrl(e.target.value)}
                      // value={}
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
                    Add Category
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

export default AddCategory;