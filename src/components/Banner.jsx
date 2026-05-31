import { FaSearch } from 'react-icons/fa';

const Banner = () => {
  return (
    <div>
      <div className="hero bg-base-300 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Deal your Products in a Smart way !</h1>
            <p className="py-6">
              SmartDeals helps you sell, resell, and shop from trusted local sellers — all in one
              place!
            </p>
            <div className="join">
              <div>
                <label className="input join-item">
                  <input type="email" placeholder="Search for products" />
                </label>
              </div>
              <button className="btn btn-primary join-item">
                <FaSearch></FaSearch>
              </button>
            </div>
            <div className="py-6 flex gap-6 justify-center items-center">
              <button className="btn btn-accent">Watch all products</button>
              <button className="btn btn-accent">Post an product</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
