import React from 'react'
// import ItemCard from '../Component/Items/ItemCard';
import Items from '../Component/Items/Items';

const CategoryItems = (props) => {
  const items = props.category.id;
  const url = `/api/items/category/${items}`
  console.log("items")
  console.log(items)
  return (
    <div className="">
      <h3 className='mx-4 mt-2'>{props.category.categoryName}</h3>
      <Items url={url}/>
    </div>
  )
}

export default CategoryItems;
