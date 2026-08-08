import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useOrders } from "../context/OrderContext";
import { FaCheckCircle, FaBox, FaArrowLeft } from "react-icons/fa";

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orders } = useOrders();

  const orderId = location.state?.orderId;
  const order = orders.find(o => o.orderId === orderId);

  return (

    <section
      className="py-5"
      style={{
        backgroundColor: "#eaf8ff",
        minHeight: "100vh"
      }}
    >

      <div className="container">

        <div className="card border-0 shadow-sm text-center p-5">

          <div className="mb-4">
            <FaCheckCircle className="text-success" style={{ fontSize: "70px" }} />
          </div>


          <h1 className="fw-bold text-success">
            Order Successful
          </h1>


          <p className="text-muted fs-5">
            Your service booking has been completed successfully.
          </p>



          {order ? (
            <div className="bg-light rounded p-4 my-4">
              <h5>
                Order ID: <span className="text-primary">#{order.orderId}</span>
              </h5>
              <h5>
                Invoice Number: <span className="text-primary">{order.invoiceNumber}</span>
              </h5>
              <h5>
                Total Items: <span className="text-primary"> {order.totalItems}</span>
              </h5>
              <h5>
                Total Amount: <span className="text-success"> ₹{order.grandTotal}</span>
              </h5>
              <h5>
                Payment Method: <span className="text-primary"> {order.paymentMethod}</span>
              </h5>
              <h5>
                Payment Status: <span className={`badge ${order.paymentStatus === 'Paid' ? 'bg-success' : 'bg-warning'}`}> {order.paymentStatus}</span>
              </h5>
            </div>
          ) : (
            <p className="text-muted">Order details not found.</p>
          )}

          <h5 className="fw-bold mb-3">
            Selected Services
          </h5>
          {
            order?.items?.map((item) => (


              <div
                key={item.id}
                className="border rounded p-3 mb-2 text-start"
              >

                <strong>
                  {item.title}
                </strong>


                <br />


                <small>
                  Quantity : {item.quantity}
                </small>


                <br />


                <small>
                  Price : ₹
                  {item.discountPrice * item.quantity}
                </small>


              </div>


            ))

          }
          <div className="d-flex gap-3 justify-content-center mt-4">
            <button className="btn btn-primary px-4" onClick={() => navigate("/products")}>
              <FaBox className="me-2" />
              Continue Shopping
            </button>
            <button className="btn btn-outline-dark px-4" onClick={() => navigate("/profile")}>
              <FaArrowLeft className="me-2" />
              View Orders
            </button>
          </div>

        </div>

      </div>
    </section>
  )
};
export default Success;