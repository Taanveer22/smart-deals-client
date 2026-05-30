import { Outlet } from 'react-router';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const RootLayout = () => {
  return (
    <>
      <section>
        <Navbar></Navbar>
      </section>
      <section className="my-8 lg:my-16 w-11/12 mx-auto">
        <Outlet></Outlet>
      </section>
      <section>
        <Footer></Footer>
      </section>
    </>
  );
};

export default RootLayout;
