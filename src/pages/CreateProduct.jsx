import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';

const CreateProduct = () => {
  const { user } = useAuth();
  // console.log(user);
  const axiosSecure = useAxiosSecure();

  const sellerEmail = user?.email || user?.providerData?.[0]?.email;
  const buyerName = user?.displayName || user?.providerData?.[0]?.displayName;
  const sellerImage = user?.photoURL || user?.providerData?.[0]?.photoURL;
  // console.log(sellerEmail, buyerName, sellerImage);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const newProduct = {
      title: formData.get('title'),
      category: formData.get('category'),
      price_min: Number(formData.get('price_min')),
      price_max: Number(formData.get('price_max')) || Number(formData.get('price_min')),
      condition: formData.get('condition'),
      usage: formData.get('usage'),
      image: formData.get('image'),
      seller_name: formData.get('seller_name'),
      seller_email: formData.get('seller_email'),
      seller_contact: formData.get('seller_contact'),
      seller_image: formData.get('seller_image'),
      location: formData.get('location'),
      description: formData.get('description'),
      status: 'pending',
      created_at: new Date().toISOString(),
    };

    // console.log(newProduct);

    axiosSecure
      .post('/products', newProduct)
      .then((res) => {
        // console.log(res.data);
        if (res?.data?.insertedId) {
          toast.success('product created successfully');
        }
      })
      .catch((error) => {
        // console.log(error);
        alert(error?.message);
      });
  };

  return (
    <section className="min-h-screen bg-base-200 py-10 px-4">
      <div className="mx-auto max-w-5xl">
        <div className="card bg-base-100 border border-base-300 shadow-sm">
          <div className="card-body p-6 md:p-8">
            <form onSubmit={handleFormSubmit} className="space-y-6">
              {/* Row 1 */}
              <div className="grid gap-4 md:grid-cols-2">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Title</legend>
                  <input
                    name="title"
                    type="text"
                    placeholder="e.g. Yamaha Guitar for Sale"
                    className="input input-bordered w-full"
                    required
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Category</legend>
                  <select
                    name="category"
                    defaultValue=""
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="" disabled>
                      Select a Category
                    </option>
                    <option value="Electronics">Electronics</option>
                    <option value="Vehicles">Vehicles</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Fashion">Fashion</option>
                  </select>
                </fieldset>
              </div>

              {/* Row 2 */}
              <div className="grid gap-4 md:grid-cols-2">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Minimum Price ($)</legend>
                  <input
                    name="price_min"
                    type="number"
                    placeholder="e.g. 100"
                    className="input input-bordered w-full"
                    required
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Maximum Price ($)</legend>
                  <input
                    name="price_max"
                    type="number"
                    placeholder="Optional"
                    className="input input-bordered w-full"
                  />
                </fieldset>
              </div>

              {/* Row 3 */}
              <div className="grid gap-4 md:grid-cols-2">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Product Condition</legend>

                  <div className="flex items-center gap-6 pt-2">
                    <label className="label cursor-pointer gap-2">
                      <input
                        type="radio"
                        name="condition"
                        value="fresh"
                        defaultChecked
                        className="radio radio-primary"
                      />
                      <span>Fresh</span>
                    </label>

                    <label className="label cursor-pointer gap-2">
                      <input
                        type="radio"
                        name="condition"
                        value="used"
                        className="radio radio-primary"
                      />
                      <span>Used</span>
                    </label>
                  </div>
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Product Usage Time</legend>
                  <input
                    name="usage"
                    type="text"
                    placeholder="e.g. 1 year 3 months"
                    className="input input-bordered w-full"
                  />
                </fieldset>
              </div>

              {/* Product Image */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Product Image URL</legend>
                <input
                  name="image"
                  type="url"
                  placeholder="https://..."
                  className="input input-bordered w-full"
                  required
                />
              </fieldset>

              {/* Seller Information */}
              <div className="grid gap-4 md:grid-cols-2">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Seller Name</legend>
                  <input
                    defaultValue={buyerName}
                    name="seller_name"
                    type="text"
                    placeholder="Your Name"
                    className="input input-bordered w-full"
                    readOnly
                    required
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Seller Email</legend>
                  <input
                    defaultValue={sellerEmail}
                    name="seller_email"
                    type="email"
                    placeholder="your@email.com"
                    className="input input-bordered w-full"
                    readOnly
                    required
                  />
                </fieldset>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Seller Contact</legend>
                  <input
                    name="seller_contact"
                    type="text"
                    placeholder="+8801XXXXXXXXX"
                    className="input input-bordered w-full"
                    required
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Seller Image URL</legend>
                  <input
                    defaultValue={sellerImage}
                    name="seller_image"
                    type="url"
                    placeholder="https://..."
                    className="input input-bordered w-full"
                    readOnly
                    required
                  />
                </fieldset>
              </div>

              {/* Location */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Location</legend>
                <input
                  name="location"
                  type="text"
                  placeholder="Dhaka, Bangladesh"
                  className="input input-bordered w-full"
                  required
                />
              </fieldset>

              {/* Description */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Product Description</legend>

                <textarea
                  name="description"
                  rows="5"
                  placeholder="Describe your product..."
                  className="textarea textarea-bordered w-full"
                  required
                />
              </fieldset>

              <button type="submit" className="btn btn-primary w-full h-12 text-base">
                Create Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateProduct;
