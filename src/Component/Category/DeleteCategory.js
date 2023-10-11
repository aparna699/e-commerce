import React from 'react'
import axios from "../../api/axios";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from 'react-redux'
import { categoryActions } from '../../store/Category/categorySlice';

const DeleteCategory =  (props) => {
    const id = props.id
    const token = Cookies.get("token")

    const dispatch = useDispatch()
    const categoryList = useSelector((state) => state.category)

    const deleteCategory = async (e) => {
      e.preventDefault()
      const url =  `/api/category/${id}`;
        
      dispatch(categoryActions.deleteCategory(url))

      if(categoryList.isSuccess && !categoryList.isLoading){
        window.location.reload(true)
      }
    }
  return (
    <button onClick={deleteCategory} className='btn btn-outline-dark'>Delete</button>
  )
}

export default DeleteCategory;