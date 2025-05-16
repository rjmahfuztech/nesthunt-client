import { Button } from "@material-tailwind/react";
import { format } from "date-fns";
import {
  handleApiError,
  handleDeleteWarning,
  handleSuccessMessage,
} from "../Messages/Alert";
import authApiClient from "../../services/authApiClient";

const OrderDetail = ({ order, setOrders }) => {
  const handleCancelOrder = (id) => {
    // cancel warning
    handleDeleteWarning().then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await authApiClient.post(`/orders/${id}/cancel_order/`);
          if (res.status == 200) {
            // Update the local state
            setOrders((prevOrders) =>
              prevOrders.map((order) =>
                order.id === id ? { ...order, status: "Cancelled" } : order
              )
            );
            handleSuccessMessage(
              "Order Cancelled!",
              "Your order has been successfully Cancelled."
            );
          }
        } catch (error) {
          handleApiError(error);
        }
      }
    });
  };
  return (
    <div key={order.id} className="bg-gray-100 flex justify-center mb-8">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-xl">
        <div className="bg-indigo-600 px-6 py-4">
          <div className="flex items-center flex-wrap justify-between gap-2">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Order Confirmation
              </h2>
              <p className="text-slate-200 text-sm mt-2">
                Thank you for your order!
              </p>
            </div>
            <div className="flex gap-4 items-center mt-4 md:mt-0">
              <span
                className={`${
                  order.status == "Not Paid"
                    ? "bg-white/20"
                    : order.status == "Booked"
                    ? "bg-success"
                    : "bg-error"
                } text-white text-sm font-medium px-2.5 py-1 rounded-full`}
              >
                {order.status}
              </span>
              {order.status == "Not Paid" && (
                <Button
                  onClick={() => handleCancelOrder(order.id)}
                  variant="ghost"
                  className="bg-black/20 text-red-500 font-semibold underline"
                >
                  Cancel Order
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div>
              <p className="text-slate-500 text-sm font-medium">Order Id</p>
              <p className="text-slate-900 text-sm font-medium mt-2">
                #{order.id}
              </p>
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium">Order Date</p>
              <p className="text-slate-900 text-sm font-medium mt-2">
                {format(new Date(order.created_at), "yyyy/MM/dd")}
              </p>
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium">Rent Amount</p>
              <p className="text-[15px] font-semibold text-indigo-700 mt-2">
                ${order.advertisement?.rental_amount}
              </p>
            </div>
          </div>

          <div className="bg-gray-100 rounded-xl p-4 mt-8">
            <h3 className="text-base font-medium text-slate-900 mb-6">
              Customer Information
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="col-span-2">
                <p className="text-slate-500 text-sm font-medium">
                  Customer Name
                </p>
                <p className="text-slate-900 text-sm font-medium mt-2">
                  {order.full_name}
                </p>
              </div>
              <div>
                <p className="text-slate-500 text-sm font-medium">Address</p>
                <p className="text-slate-900 text-sm font-medium mt-2">
                  {order.address}
                </p>
              </div>
              <div>
                <p className="text-slate-500 text-sm font-medium">Phone</p>
                <p className="text-slate-900 text-sm font-medium mt-2">
                  {order.phone_number}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 rounded-xl p-4 mt-8">
            <h3 className="text-base font-medium text-slate-900 mb-6">
              House Information
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="text-sm text-slate-500 font-medium">Title:</p>
                <p className="text-slate-900 text-sm font-semibold">
                  {order.advertisement.title}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-slate-500 font-medium">Location:</p>
                <p className="text-slate-900 text-sm font-semibold">
                  {order.advertisement.location}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-slate-500 font-medium">Bedroom:</p>
                <p className="text-slate-900 text-sm font-semibold">
                  {order.advertisement.bedroom} Bedroom
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-slate-500 font-medium">Bathroom:</p>
                <p className="text-slate-900 text-sm font-semibold">
                  {order.advertisement.bathroom} Bathroom
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-slate-500 font-medium">Size:</p>
                <p className="text-slate-900 text-sm font-semibold">
                  {order.advertisement.apartment_size} Square fit
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 px-6 py-4">
          <div className="flex justify-end">
            <Button
              disabled={order.status == "Booked" || order.status == "Cancelled"}
              className="bg-indigo-600 hover:bg-indigo-700 text-white w-48"
            >
              {order.status == "Booked" ? "Paid" : "Pay Now"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
