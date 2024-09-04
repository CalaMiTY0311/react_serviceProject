import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchFromApi from "../utils/fetchFromApi";
import ProductView from "../component/product/ProductView";
import useGetModelPostDetail from "../hooks/useGetModelPostDetail";

import "./Product.css";

function Product() {

  const { createdAt } = useParams();
  const { isLoading, posts } = useGetModelPostDetail(createdAt);

  // console.log(createdAt)
  const [productData, setProductData] = useState([]);
  const { productId } = useParams();

  // useEffect(() => {
  //   async function getData() {
  //     let data = await fetchFromApi(`products/${productId}`);
  //     setProductData(data);
  //   }
  //   getData();
  // }, [productId]);
  if(isLoading){
    return <div>hello world</div>
  }

  return (
    <main className="product-view_main container">
      <ProductView productData={productData} post={posts}/>
    </main>
  );
}

export default Product;
