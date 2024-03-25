import { useParams } from "react-router-dom";
import useGetProducts from "../service/Products/useGetProducts";
import "../styles/Product.scss";

function Product() {
  const { id } = useParams();
  const { data, isLoading } = useGetProducts(id);
  const handleError = (event) => {
    event.target.src = "https://i.imgur.com/sC0ztOB.jpeg";
  };
  return (
    <section>
      <div className="container">
        {isLoading ? (
          <p className="loading">Loading...</p>
        ) : (
          <div class="product">
            <img
              className="product-image"
              src={data?.images[0]}
              alt="Product"
              onError={handleError}
            />
            <div class="product-details">
              <h1 class="product-title">{data?.title}</h1>
              <div className="product-desc">{data?.description}</div>
              <p class="product-price">${data?.price}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Product;
