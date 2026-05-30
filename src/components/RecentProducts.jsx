import ProductCard from './ProductCard';

const RecentProducts = ({ sixProducts }) => {
  console.log(sixProducts);
  return (
    <div>
      <h1 className="text-2xl font-semibold text-center mb-3">Recent Products</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {sixProducts.map((productItem) => (
          <ProductCard productItem={productItem} key={productItem._id}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default RecentProducts;
