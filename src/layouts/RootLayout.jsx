import { Outlet } from 'react-router';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const RootLayout = () => {
  return (
    <>
      <section>
        <Navbar></Navbar>
      </section>
      <section>
        <Outlet></Outlet>
      </section>
      <section>
        <Footer></Footer>
      </section>
    </>
  );
};

export default RootLayout;
