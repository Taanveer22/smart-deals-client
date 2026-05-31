import { Link } from 'react-router';
import ProductCard from './ProductCard';

const RecentProducts = ({ sixProducts }) => {
  // console.log(sixProducts);

  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold text-center">Recent Products</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {sixProducts.map((productItem) => (
          <ProductCard productItem={productItem} key={productItem._id}></ProductCard>
        ))}
      </div>
      <Link to="/allProducts">
        <button className="btn btn-accent block w-28 mx-auto">Show all</button>
      </Link>
    </div>
  );
};

export default RecentProducts;
