import '../styles/ProductCard.scss'

function ProductCard({title, price, description, img, onClick}) {
    const handleError = (event) => {
        event.target.src = 'https://i.imgur.com/sC0ztOB.jpeg';
    };
  return (
    <div className="product-card" onClick={onClick}>
        <img src={img} alt="Product" onError={handleError} />
        <div className="product-title">{title}</div>
        <div className="product-price">${price}</div>
        <div className="product-description">{description}</div>
    </div>
  )
}

export default ProductCard