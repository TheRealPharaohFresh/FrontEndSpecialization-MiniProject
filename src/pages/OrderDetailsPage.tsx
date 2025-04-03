import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

interface Order {
  id: string;
  totalPrice: number;
  createdAt: { seconds: number };
  products: { id: number; title: string; price: number; quantity: number; image: string }[];
}

const OrderDetailsPage: React.FC = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    console.log("🔍 Order ID from URL:", orderId); // ✅ Debugging

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/login"); 
        return;
      }
      if (orderId) {
        await loadOrder(orderId);
      }
    });

    return () => unsubscribe();
  }, [auth, orderId, navigate]);

  const loadOrder = async (orderId: string) => {
    try {
      const docRef = doc(db, "orders", orderId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setOrder({ id: docSnap.id, ...docSnap.data() } as Order);
      } else {
        console.error("❌ Order not found");
      }
    } catch (error) {
      console.error("❌ Error loading order:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading order details...</p>;
  if (!order) return <p>Order not found.</p>;

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
            <img src={product.image} alt={product.title} style={{ width: "100px", height: "100px" }} />
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


