import useGetProducts from "../service/Products/useGetProducts";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../styles/Products.scss";
import useDeleteProducts from "../service/Products/useDeleteProducts";
import { useQueryClient } from "react-query";

function Products() {
  const queryClient = useQueryClient();
  const { data, isLoading, refetch} = useGetProducts();
  const {deleteProduct} = useDeleteProducts(queryClient)
  const navigate = useNavigate();

  useEffect(() => {
    refetch()
  }, [refetch]);

  return (
    <section className="products">
      <div className="container">
        <div className="product-grid">
          {isLoading ? (
            <p className="loading">Loading...</p>
          ) : (
            data?.map((el) => {
              return (
                <ProductCard
                  key={el.id}
                  img={el.images[0]}
                  title={el.title}
                  description={el.description}
                  price={el.price}
                  handleProductClik={() => navigate(`${el.id}`)}
                  handleDelete={() => deleteProduct(el.id)}
                />
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}

export default Products;
