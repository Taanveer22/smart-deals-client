const BiddersList = ({ biddersTable }) => {
  // console.log(biddersTable);

  return (
    <section>
      <div className="container mx-auto max-w-7xl px-4">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Serial</th>
                <th>Buyer Email</th>
                <th>Bid Price</th>
                <th>status</th>
              </tr>
            </thead>
            {/* body */}
            <tbody>
              {biddersTable.map((bidderItem, index) => (
                <tr key={bidderItem._id}>
                  <th>{index + 1}</th>
                  <td>{bidderItem?.buyer_email}</td>
                  <td>$ {bidderItem?.bid_price}</td>
                  <td>
                    <button className="btn btn-xs btn-warning">{bidderItem?.status}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default BiddersList;
