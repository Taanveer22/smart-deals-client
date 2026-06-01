import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';

const BuyerBids = () => {
  const [bidsTable, setBidsTable] = useState([]);
  const { user } = useAuth();
  const userEmail = user?.email || user?.providerData?.[0]?.email;

  const handleDeleteBid = (id) => {
    // console.log(id);
    axios
      .delete(`http://localhost:5000/bids/${id}`)
      .then((res) => {
        // console.log(res.data);
        if (res?.data?.deletedCount > 0) {
          const remainingBids = bidsTable.filter((bidItem) => bidItem._id !== id);
          setBidsTable(remainingBids);
          toast.success('Delted bids completely');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/bids?email=${userEmail}`)
      .then((res) => {
        // console.log(res.data);
        setBidsTable(res?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userEmail]);

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Serial</th>
            <th>Product Id</th>
            <th>Status</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        {/* body */}
        <tbody>
          {bidsTable.map((bidItem, index) => (
            <tr key={bidItem._id}>
              <th>{index + 1}</th>
              <td>{bidItem?.productId}</td>
              <td>{bidItem?.status}</td>
              <td>$ {bidItem?.bid_price}</td>
              <td>
                <button
                  onClick={() => handleDeleteBid(bidItem?._id)}
                  className="btn btn-xs btn-error"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BuyerBids;
