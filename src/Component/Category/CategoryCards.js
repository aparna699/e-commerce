import React from "react";

const CategoryCards = (props) => {
  return (
    <div className="col-md-3 col-6">
      {/* CategoryCards: {`${props.categoryId} ${props.categoryName}`} */}
      <div class="card" style={{"width": "auto"}}>
        <a href={`/${props.categoryName}`} >
        <div className="card-img">
          <img 
              src={`${props.img}`} 
              class="card-img-top" alt="..." 
              style={{"height": "100px"}}
          />
        </div>
        <div 
            class= "card-img-overlay text-white bg-dark bg-opacity-10 d-flex flex-column justify-content-end"
            // style= {{"--bs-bg-opacity": ".1"}}   
        >
          <h5 class="card-title fw-bold" > {`${props.categoryName}`} </h5>
          {/* <a href="#" class="card-link text-warning fw-bold" >Product</a> */}
        </div>
        </a>
        
      </div>
    </div>
  );
};

export default CategoryCards;
