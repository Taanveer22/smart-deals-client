const ProductCard = ({ productItem }) => {
  console.log(productItem);
  return (
    <div>
      <div className="card bg-base-100 shadow-sm border-2 border-primary">
        <figure>
          <img src={productItem?.image} className="object-cover" alt="product" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{productItem?.title}</h2>
          <p>
            ${productItem?.price_min}-{productItem?.price_max}
          </p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary">View Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
