import { useEffect, useState } from "react";
import ProductCard from "../component/explore/ProductCard";
import fetchFromApi from "../utils/fetchFromApi";
import SelectCategory from "../component/explore/SelectCategory";
import PriceFilter from "../component/explore/PriceFilter";
import "./ModelPosts.css";
import { useParams } from "react-router-dom";
import Shimmer from "../component/shimmer/Shimmer";

const ModelPosts = () => {

    const [priceFlter, setPriceFilter] = useState("default");
    const [checkBoxState, setCheckBoxState] = useState({
        men: false,
        women: false,
      });

      function handlePriceFilter(e) {
        let filter = e.target.value;
        if (filter === "low-to-high") {
          let priceFilteredData = products
            .slice()
            .sort((a, b) => a.price - b.price);
          setProducts(priceFilteredData);
        }
        if (filter === "high-to-low") {
          let priceFilteredData = products
            .slice()
            .sort((a, b) => b.price - a.price);
          setProducts(priceFilteredData);
        }
        setPriceFilter(filter);
      }
      
      function handleCategoryCheckBox(e) {
        let { name, checked } = e.target;
        setCheckBoxState({ ...checkBoxState, [name]: checked });
      }

    return (
        <main className="product-main">
              <PriceFilter
                priceFlter={priceFlter}
                handlePriceFilter={handlePriceFilter}
              />
              <SelectCategory
                checkBoxState={checkBoxState}
                handleCheckBox={handleCategoryCheckBox}
              />
              {/* <div className="products-container">
                <AllProducts products={products} />
              </div> */}
        </main>
    )
}

export default ModelPosts;