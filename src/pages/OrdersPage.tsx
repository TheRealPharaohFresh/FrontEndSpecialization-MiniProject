import React, { useEffect, useState } from "react";
import { fetchOrdersByUser } from "../services/orderServices";
import { getAuth } from "firebase/auth";
// import styles from "../styles/OrdersPage.module.css";

interface Order {
  id: string;
  totalPrice: number;
  createdAt: { seconds: number };
}

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      loadOrders(user.uid);
    }
  }, [user]);

  const loadOrders = async (userId: string) => {
    const orderList = await fetchOrdersByUser(userId);
    setOrders(orderList);
  };

  return (
    <div >
      <h1>Order History</h1>
      {orders.length === 0 ? (
        <p>No past orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Date:</strong> {new Date(order.createdAt.seconds * 1000).toLocaleDateString()}</p>
              <p><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>
              <button onClick={() => window.location.href = `/order/${order.id}`}>
                View Details
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrdersPage;
