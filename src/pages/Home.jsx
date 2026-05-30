import axios from 'axios';
import { useEffect, useState } from 'react';
import Banner from '../components/Banner';
import RecentProducts from '../components/RecentProducts';

const Home = () => {
  const [sixProducts, setSixProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/recent`)
      .then((res) => {
        console.log(res.data);
        setSixProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <section>
        <Banner></Banner>
      </section>
      <section>
        <RecentProducts sixProducts={sixProducts}></RecentProducts>
      </section>
    </div>
  );
};

export default Home;
