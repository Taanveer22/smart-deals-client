import { useEffect, useState } from 'react';
import Banner from '../components/Banner';
import RecentProducts from '../components/RecentProducts';
import useAxios from '../hooks/useAxios';

const Home = () => {
  const [sixProducts, setSixProducts] = useState([]);
  const axiosDefault = useAxios();

  useEffect(() => {
    axiosDefault
      .get(`/products/recent`)
      .then((res) => {
        // console.log(res.data);
        setSixProducts(res.data);
      })
      .catch((error) => {
        // console.log(error);
        alert(error?.message);
      });
  }, [axiosDefault]);

  return (
    <div>
      <section className="mb-8 lg:mb-16">
        <Banner></Banner>
      </section>
      <section>
        <RecentProducts sixProducts={sixProducts}></RecentProducts>
      </section>
    </div>
  );
};

export default Home;
