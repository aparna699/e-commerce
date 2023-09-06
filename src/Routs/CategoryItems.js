import React from 'react'
import ItemCard from '../Component/ItemCard';
import Items from '../Component/Items';

const CategoryItems = (props) => {
  const items = props.category.id;
  const url = `/api/items/category/${items}`
  console.log("items")
  console.log(items)
  return (
    <div className="">
      <h3>{props.category.categoryName}</h3>
      <Items url={url}/>
    </div>
  )
}

export default CategoryItems;
