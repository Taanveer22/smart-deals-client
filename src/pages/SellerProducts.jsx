import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';

const SellerProducts = () => {
  const { user } = useAuth();
  const [productsTable, setProductsTable] = useState([]);

  // console.log(user);
  const userEmail = user?.email || user?.providerData?.[0]?.email;

  const handleDeleteProduct = (id) => {
    // console.log(id);
    axios
      .delete(`http://localhost:5000/products/${id}`)
      .then((res) => {
        // console.log(res.data);
        const remainingProducts = productsTable.filter((productItem) => productItem._id !== id);
        setProductsTable(remainingProducts);
        if (res.data) {
          toast.error('product deleted done');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/products?email=${userEmail}`)
      .then((res) => {
        // console.log(res.data);
        setProductsTable(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userEmail]);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Serial</th>
              <th>Title</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          {/* body */}
          <tbody>
            {productsTable.map((productItem, index) => (
              <tr key={productItem._id}>
                <th>{index + 1}</th>
                <td>{productItem.title}</td>
                <td>
                  $ {productItem.price_min} - {productItem.price_max}
                </td>
                <td>{productItem.status}</td>
                <td>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleDeleteProduct(productItem._id)}
                      className="btn btn-xs btn-error"
                    >
                      Delete
                    </button>
                    <button className="btn btn-xs btn-warning">Update</button>
                    <button className="btn btn-xs btn-success">Sold</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerProducts;
