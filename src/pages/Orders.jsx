import { useEffect, useState } from "react";
import authApiClient from "../services/authApiClient";
import useAuthContext from "../hooks/useAuthContext";
import OrderDetail from "../components/Orders/OrderDetail";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();

  useEffect(() => {
    setLoading(true);
    authApiClient
      .get("/orders/")
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex justify-center h-72 items-center">
        <div className="loader"></div>
      </div>
    );

  console.log(orders);
  return (
    <>
      {orders.length === 0 ? (
        <h2 className="text-gray-500 text-lg font-semibold text-center my-14 md:my-20">
          {user.is_staff ? "No order found" : "You do not have any order yet"}
        </h2>
      ) : (
        orders.map((order) => (
          <OrderDetail key={order.id} order={order} setOrders={setOrders} />
        ))
      )}
    </>
  );
};

export default Orders;
