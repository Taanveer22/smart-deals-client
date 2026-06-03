import { Link, NavLink } from 'react-router';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  // console.log(user);

  const handleSignOutUser = async () => {
    try {
      await signOutUser();
      toast.success('Sign out successful');
    } catch (error) {
      // console.log(error);
      toast.error(error.message || 'sign out failed');
    }
  };

  const links = (
    <>
      <li>
        <NavLink to={'/'}>Home</NavLink>
      </li>
      <li>
        <NavLink to={'/allProducts'}>All Products</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to={'/createProduct'}>Create Product</NavLink>
          </li>
          <li>
            <NavLink to={'/sellerProducts'}>Seller Products</NavLink>
          </li>
          <li>
            <NavLink to={'/buyerBids'}>Buyer Bids</NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {' '}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{' '}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link className="btn btn-ghost text-xl">
          Smart <span className="text-primary">Deals</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <button onClick={handleSignOutUser} className="btn btn-sm btn-secondary">
            Signout
          </button>
        ) : (
          <div className="flex gap-2">
            <NavLink to={'/signin'} className="btn btn-sm btn-primary">
              Signin
            </NavLink>
            <NavLink to={'/register'} className="btn btn-sm btn-primary">
              Register
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
