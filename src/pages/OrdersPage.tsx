import React, { useEffect, useState } from "react";
import { fetchOrdersByUser, OrderRecord } from "../services/orderServices";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        loadOrders(user.uid);
      } else {
        navigate("/login"); 
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  const loadOrders = async (userId: string) => {
    try {
      const orderList = await fetchOrdersByUser(userId);
      setOrders(orderList);
    } catch (error) {
      console.error("❌ Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading orders...</p>;

  return (
    <div>
      <h1>Order History</h1>
      {orders.length === 0 ? (
        <p>No past orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Date:</strong> {order.createdAt.toDate().toLocaleDateString()}</p>
              <p><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>
              <button onClick={() => navigate(`/order/${order.id}`)}> 
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

