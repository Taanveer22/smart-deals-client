import { FaDollarSign, FaEnvelope, FaImage, FaPhone, FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';

const ModalBidProduct = ({ loadedDetailsCard, modalRef, setRefresh }) => {
  const { user } = useAuth();
  // console.log(loadedDetailsCard);
  const axiosSecure = useAxiosSecure();

  // ===============================
  // Get logged in user info
  // ==============================
  const buyerEmail = user?.email || user?.providerData?.[0]?.email;
  const buyerName = user?.displayName || user?.providerData?.[0]?.displayName;
  const buyerImage = user?.photoURL || user?.providerData?.[0]?.photoURL;
  // console.log(buyerEmail, buyerName, buyerImage);

  // ===============================
  // Handle form submit
  // ===============================
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const newBid = {
      ...Object.fromEntries(formData.entries()),
      bid_price: Number(formData.get('bid_price')),
      status: 'pending',
      productId: loadedDetailsCard?._id,
    };
    // console.log(newBid);

    // SEND DATA TO BACKEND
    axiosSecure
      .post(`/bids`, newBid)
      .then((res) => {
        // console.log(res.data);
        if (res?.data) {
          toast.success('Bid offer send succcessfully');
          // 🔁 TRIGGER REFRESH (VERY IMPORTANT)
          setRefresh((prev) => !prev);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    //CLOSE MODAL AFTER SUBMIT
    modalRef?.current?.close();
  };

  return (
    // ============ MODAL WRAPPER ============
    <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
      {/* ============ MODAL CONTAINER RESPONSIVE ============ */}
      <div className="modal-box w-full max-w-md sm:max-w-lg">
        {/* ============ HEADER ============ */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">Place Your Offer</h2>
            <p className="mt-2 text-sm sm:text-base text-base-content/70">
              Submit your best price to the seller.
            </p>
          </div>
          <button
            type="button"
            onClick={() => modalRef?.current?.close()}
            className="btn btn-error"
          >
            Close Modal
          </button>
        </div>

        {/* ============ BID FORM  ============ */}
        <form onSubmit={handleFormSubmit} className="mt-6 space-y-4">
          {/* Buyer Name */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Buyer Name</legend>

            <label className="input input-bordered w-full">
              <FaUser className="opacity-60" />
              <input defaultValue={buyerName} type="text" name="buyer_name" readOnly required />
            </label>
          </fieldset>

          {/* Buyer Email */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Buyer Email</legend>

            <label className="input input-bordered w-full">
              <FaEnvelope className="opacity-60" />
              <input defaultValue={buyerEmail} type="email" name="buyer_email" readOnly required />
            </label>
          </fieldset>

          {/* Buyer Image */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Buyer Image URL</legend>

            <label className="input input-bordered w-full">
              <FaImage className="opacity-60" />
              <input defaultValue={buyerImage} type="url" name="buyer_image" readOnly required />
            </label>
          </fieldset>

          {/* Offered Price */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Your Offered Price</legend>

            <label className="input input-bordered w-full">
              <FaDollarSign className="opacity-60" />
              <input
                type="number"
                name="bid_price"
                placeholder="Enter your offer"
                min="1"
                required
              />
            </label>
          </fieldset>

          {/* Contact Number */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Contact Number</legend>

            <label className="input input-bordered w-full">
              <FaPhone className="opacity-60" />
              <input type="text" name="buyer_contact" placeholder="+8801XXXXXXXXX" required />
            </label>
          </fieldset>

          {/* ============ SUBMIT BUTTON ============ */}
          <button type="submit" className="btn btn-primary w-full">
            Submit Bid
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default ModalBidProduct;
