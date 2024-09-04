import { Link } from "react-router-dom";
// import toast from "react-hot-toast";
// import usePostStore from "../../store/postStore";
import "./ProductCard.css";

function ProductCard({ products }) {

  // console.log(products)
  const categories = products.category 
    ? Object.keys(products.category).filter(key => products.category[key]).join(', ')
    : '';

  return (
    <div className="product-card_wrapper">
      <Link to={`/product/${products.createdAt}`}>
        <div className="product-card_img">
          <img src={products?.imageURL} />
        </div>
      </Link>
      <div className="product-card_description">
        <h3>{products.title}</h3>
        <p>{products?.body}</p>
        <span className="product-card_bottom">
          Categories: {categories}
        </span>
      </div>
    </div>
  );
}

export default ProductCard;
