import useGetProducts from "../service/Products/useGetProducts";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import "../styles/Products.scss";

function Products() {
  const { data, isLoading } = useGetProducts();
  const navigate = useNavigate();

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
                  onClick={() => navigate(`${el.id}`)}
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
