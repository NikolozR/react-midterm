import { useContext } from "react";
import "../styles/ProductCard.scss";
import UserContext from "../contexts/userContext";

function ProductCard({
  title,
  price,
  description,
  img,
  handleProductClik,
  handleDelete,
}) {
  const { user } = useContext(UserContext);
  const handleError = (event) => {
    event.target.src = "https://i.imgur.com/sC0ztOB.jpeg";
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    handleDelete();
  };
  return (
    <div className="product-card" onClick={handleProductClik}>
      <button
        onClick={handleDeleteClick}
        className={"delete" + (user?.role !== "admin" ? " hidden" : "")}
      >
        Delete
      </button>
      <img src={img} alt="Product" onError={handleError} />
      <div className="product-title">{title}</div>
      <div className="product-description">{description}</div>
      <div className="product-price">${price}</div>
    </div>
  );
}

export default ProductCard;
