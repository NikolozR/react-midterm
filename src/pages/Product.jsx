import { useParams } from "react-router-dom";
import useGetProducts from "../service/Products/useGetProducts";
import "../styles/Product.scss";
import { useContext } from "react";
import UserContext from "../contexts/userContext";
import { useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import useDeleteProducts from "../service/Products/useDeleteProducts";

function Product() {
  const queryClient = useQueryClient();
  const { user } = useContext(UserContext);
  const { deleteProduct } = useDeleteProducts(queryClient);
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
          <div className="product">
            <img
              className="product-image"
              src={data?.images[0]}
              alt="Product"
              onError={handleError}
            />
            <div className="product-details">
              <h1 className="product-title">{data?.title}</h1>
              <div className="product-desc">{data?.description}</div>
              <p className="product-price">${data?.price}</p>
              {user?.role === "admin" && (
                <Link to="/admin/products">
                  <button
                    onClick={() => deleteProduct(id)}
                    className="delete"
                  >
                    Delete
                  </button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Product;
