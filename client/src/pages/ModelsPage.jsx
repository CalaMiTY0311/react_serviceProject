import { useEffect, useState } from "react";
import ProductCard from "../component/explore/ProductCard";
import fetchFromApi from "../utils/fetchFromApi";
import CategoryFilter from "../component/explore/CategoryFilter";
import PriceFilter from "../component/explore/PriceFilter";
import "./ModelsPage.css";
import { useParams } from "react-router-dom";
import Shimmer from "../component/shimmer/Shimmer";

import useGetModelPosts from "../hooks/useGetModelPosts";

const ModelPosts = () => {

 const { isLoading, posts } = useGetModelPosts();
 const [resultPosts, setResultPosts] = useState([]);
  // console.log(posts[0].category)
  // const [products, setProducts] = useState([]);
  //   const [priceFlter, setPriceFilter] = useState("default");

      // function handlePriceFilter(e) {
      //   let filter = e.target.value;
      //   if (filter === "low-to-high") {
      //     let priceFilteredData = products
      //       .slice()
      //       .sort((a, b) => a.price - b.price);
      //     setProducts(priceFilteredData);
      //   }
      //   if (filter === "high-to-low") {
      //     let priceFilteredData = products
      //       .slice()
      //       .sort((a, b) => b.price - a.price);
      //     setProducts(priceFilteredData);
      //   }
      //   setPriceFilter(filter);
      // }

      // function handleCategoryCheckBox(e) {
      //   let { name, checked } = e.target;
      //   setCheckBoxState({ ...checkBoxState, [name]: checked });
      // }

      const [checkBoxState, setCheckBoxState] = useState({
        Male: false,
        Female: false,
        Other: false,
        Actor: false,
        Anime: false,
        Vtuber: false,
      });
      
      function handleCategoryCheckBox(e) {
        const { name, checked } = e.target;
        setCheckBoxState({ ...checkBoxState, [name]: checked });
      }

      const getCategory = () => {
        return Object.keys(checkBoxState).filter(category => checkBoxState[category]);
      };

useEffect(() => {
    if (!isLoading && posts) {
      // 체크박스 상태가 모두 false인지 확인
      const allFalse = Object.values(checkBoxState).every(value => !value);

      if (allFalse) {
        // 모든 체크박스가 false인 경우 posts 그대로 사용
        setResultPosts(posts);
      } else {
        // 그렇지 않은 경우 필터링 적용
        const activeCategories = getCategory();
        const filteredPosts = posts.filter(post => {
          // 모든 활성화된 카테고리가 post.category에 포함되는지 확인
          return activeCategories.every(category => post.category[category]);
        });
        setResultPosts(filteredPosts);
      }
    }
  }, [posts, checkBoxState, isLoading]);
  console.log(resultPosts)

    return (
        <main className="product-main">
              {/* <PriceFilter
                priceFlter={priceFlter}
                handlePriceFilter={handlePriceFilter}
              /> */}
              <CategoryFilter
                checkBoxState={checkBoxState}
                handleCheckBox={handleCategoryCheckBox}
              />
              <div className="products-container">
                <AllProducts 
                isLoading = {isLoading}
                products={resultPosts}
                 />
              </div>
        </main>
    )
}

function AllProducts({ products, isLoading }) {
  // console.log(isLoading)
  if (isLoading) {
    return <Skeleton />;
  }

  // 데이터가 없을 때, 메시지를 표시합니다.
  if (!products || products.length === 0) {
    return <div>No products available</div>;
  }

  // 데이터를 올바르게 받았을 때, ProductCard 컴포넌트를 반환합니다.
  let productCards = products.map((product) => (
    <ProductCard key={product.createdAt} products={product} />
  ));

  // let productCards = products.length ? (
  //   products?.map((products) => {
  //     return <ProductCard key={products.createdAt} products={products} 
  //     // key={product.id} 
  //     />;
  //   })
  // ) : (
  //   <Skeleton />
  // );

  return productCards;
}

function Skeleton() {
  let a = [];
  for (let i = 0; i < 4; i++) {
    a.push(<Shimmer key={i} />);
  }
  return a;
}

export default ModelPosts;