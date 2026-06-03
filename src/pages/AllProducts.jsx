import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import useAxios from '../hooks/useAxios';

const AllProducts = () => {
  const [allCards, setAllCards] = useState([]);
  const axiosDefault = useAxios();

  useEffect(() => {
    axiosDefault
      .get(`/products/all`)
      .then((res) => {
        // console.log(res.data);
        setAllCards(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [axiosDefault]);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-center mb-3">
        Products Availbale : {allCards.length}
      </h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {allCards.map((productItem) => (
          <ProductCard productItem={productItem} key={productItem._id}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
