import { useEffect, useRef, useState } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaPhone, FaUser } from 'react-icons/fa';
import { useLoaderData } from 'react-router';
import { toast } from 'react-toastify';
import BiddersList from '../components/BiddersList';
import ModalBidProduct from '../components/ModalBidProduct';
import useAxiosSecure from '../hooks/useAxiosSecure';

const ProductCardDetails = () => {
  // ✅ 1. Hooks (ALWAYS FIRST)
  const [biddersTable, setBiddersTable] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const modalRef = useRef(null);
  const loadedDetailsCard = useLoaderData();
  const axiosSecure = useAxiosSecure();
  //   console.log(loadedDetailsCard);

  // ✅ 2. Destructuring props/data
  const {
    _id,
    title,
    description,
    category,
    condition,
    created_at,
    image,
    location,
    price_min,
    price_max,
    seller_contact,
    seller_email,
    seller_image,
    seller_name,
    status,
    usage,
  } = loadedDetailsCard;

  // ✅ 3. Functions (API calls, event handlers )
  const handleModalOpen = () => {
    modalRef?.current?.showModal();
  };

  // ✅ 4. useEffect (side effects)
  useEffect(() => {
    if (!loadedDetailsCard?._id) {
      return;
    }
    axiosSecure
      .get(`/bids/product/${loadedDetailsCard?._id}`)
      .then((res) => {
        // console.log(res.data);
        setBiddersTable(res.data);
      })
      .catch((error) => {
        // console.log(error);
        if (error) {
          toast.error('product bids not found ');
        }
      });
  }, [loadedDetailsCard?._id, refresh, axiosSecure]);
  // 👈 refresh triggers re-fetch

  return (
    <section className="bg-base-200 min-h-screen py-10">
      {/*================ FULL CARD DATA ================*/}
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* LEFT SIDE */}
          <div className="space-y-6">
            {/* Image */}
            <div className="card bg-base-100 shadow-xl overflow-hidden">
              <figure>
                <img src={image} alt="Product" className="w-full h-75 object-cover" />
              </figure>
            </div>

            {/* Description */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl">Product Description</h2>

                <div className="divider my-1" />

                <div className="flex flex-wrap gap-8 text-sm">
                  <div>
                    <p className="font-semibold text-primary">Condition</p>
                    <p>{condition} </p>
                  </div>

                  <div>
                    <p className="font-semibold text-primary">Usage Time</p>
                    <p>{usage} Months</p>
                  </div>
                </div>

                <div className="divider" />

                <p className="text-base-content/70 leading-7">{description}</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">
            {/* Product Info */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="badge badge-primary badge-outline">{category}</div>

                <h1 className="text-4xl font-bold">{title}</h1>

                <div className="rounded-xl bg-base-200 p-5 mt-2">
                  <h2 className="text-3xl font-bold text-success">
                    ${price_min} - {price_max}
                  </h2>
                  <p className="text-sm text-base-content/60">Price starts from</p>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Product Details</h2>

                <div className="space-y-4 mt-2">
                  <div>
                    <span className="font-semibold">Product ID:</span> {_id}
                  </div>

                  <div className="flex items-center gap-2">
                    <FaCalendarAlt />
                    <span>{created_at}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Seller */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title mb-4">Seller Information</h2>

                <div className="flex gap-4 items-center">
                  <div className="avatar">
                    <div className="w-16 rounded-full">
                      <img src={seller_image} alt="seller" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold">{seller_name}</h3>
                    <p className="text-sm opacity-70">{seller_email}</p>
                  </div>
                </div>

                <div className="divider my-2" />

                <div className="space-y-3">
                  <div className="flex gap-2 items-center">
                    <FaMapMarkerAlt />
                    <span>{location}</span>
                  </div>

                  <div className="flex gap-2 items-center">
                    <FaPhone />
                    <span>{seller_contact}</span>
                  </div>

                  <div className="flex gap-2 items-center">
                    <FaUser />
                    <span>Status:</span>
                    <div className="badge badge-warning">{status}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={handleModalOpen}
              className="btn w-full text-white text-lg bg-linear-to-r from-violet-600 to-purple-500 hover:from-violet-700 hover:to-purple-600 border-0"
            >
              I Want To Buy This Product
            </button>
            {/*================ pass data into modal form ================*/}
            <ModalBidProduct
              modalRef={modalRef}
              loadedDetailsCard={loadedDetailsCard}
              setRefresh={setRefresh}
            ></ModalBidProduct>
          </div>
        </div>
      </div>

      {/*================ BIDDERS LIST================= */}
      <BiddersList biddersTable={biddersTable}></BiddersList>
    </section>
  );
};

export default ProductCardDetails;
