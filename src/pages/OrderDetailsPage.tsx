import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

interface Order {
  id: string;
  totalPrice: number;
  createdAt: { seconds: number };
  products: { id: number; title: string; price: number; quantity: number; image: string }[]; // ✅ image should be inside products
}

const OrderDetailsPage: React.FC = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrder = async () => {
      if (!orderId) return;
      const docRef = doc(db, "orders", orderId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setOrder({ id: docSnap.id, ...docSnap.data() } as Order);
      }
      setLoading(false);
    };

    loadOrder();
  }, [orderId]);

  if (loading) return <p>Loading order details...</p>;
  if (!order) return <p>Order not found.</p>; // ✅ Better error handling

  return (
    <div>
      <h1>Order Details</h1>
      <p><strong>Order ID:</strong> {order.id}</p>
      <p><strong>Date:</strong> {new Date(order.createdAt.seconds * 1000).toLocaleDateString()}</p>
      <p><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>

      <h2>Products</h2>
      <ul>
        {order.products.map((product) => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} style={{ width: "100px", height: "100px" }} /> {/* ✅ Fixed img tag */}
            <p><strong>{product.title}</strong></p>
            <p>Price: ${product.price.toFixed(2)}</p>
            <p>Quantity: {product.quantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetailsPage;

