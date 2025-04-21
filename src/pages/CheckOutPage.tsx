import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearCart } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../services/orderServices';
import { getAuth } from 'firebase/auth';
import styles from '../styles/CheckOutPage.module.css';

interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    quantity: number;
    image: string;
}

const CheckoutPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [cart, setCart] = useState<Product[]>([]);

    useEffect(() => {
        const savedCart = sessionStorage.getItem("cart");
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (error) {
                console.error("Failed to parse cart:", error);
                setCart([]); 
            }
        }
    }, []);

    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const auth = getAuth();
        const user = auth.currentUser;
    
        if (!user) {
            alert('Please login to place the order.');
            navigate('/login');
            return;
        }
    
      
        console.log("Cart Items:", cart);

        const totalPrice = cart.reduce((acc, item) => {
            const price = item.price != null ? parseFloat(item.price.toString()) : 0; // Ensure price is a number or 0
            const quantity = (item.quantity != null && item.quantity > 0) ? parseInt(item.quantity.toString(), 10) : 1; // Default quantity to 1 if invalid
            
            console.log("Item Price:", price, "Quantity:", quantity); // Log each item to check values
        
          
            if (isNaN(price) || isNaN(quantity)) {
                console.error("Invalid price or quantity", item);
                return acc;
            }
        
            return acc + (price * quantity); 
        }, 0);
    
       
        console.log("Calculated Total Price:", totalPrice);
    
        const orderData = {
            userId: user.uid,
            products: cart.length > 0 ? cart.map(item => ({
                id: item.id,
                title: item.title,
                price: item.price,
                quantity: item.quantity ?? 1,
                image: item.image || "https://via.placeholder.com/100" // Default image if undefined
            })) : [], 
            totalPrice: parseFloat(totalPrice.toFixed(2)), // Ensure it's a valid number
            createdAt: new Date(),
        };
    
 
        console.log('Order Data:', orderData);
    
        try {
            const orderId = await createOrder(user.uid, orderData);
            console.log('Order Created With Id:', orderId);
            alert('Order placed successfully!');
            dispatch(clearCart());
            sessionStorage.removeItem("cart");
            navigate(`/orders/${orderId}`);
        } catch (error) {
            console.error('Failed to place order:', error);
            alert('Failed to place order. Please try again later.');
        }
    };
    
    

    return (
        <div className={styles.container}>
            <h1>Checkout</h1>
            <p>Total Items: {cart.length}</p>

            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <h3>Total: ${totalPrice}</h3>
                    <ul>
                        {cart.map((item) => (
                            <li key={`cart-item-${item.id}`}>
                                <img src={item.image} alt={item.title} className={styles.image} />
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>Price: ${item.price.toFixed(2)}</p>
                                    <p>Quantity: {item.quantity}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <label>
                            Name:
                            <input type="text" required />
                        </label>
                        <label>
                            Address:
                            <input type="text" required />
                        </label>
                        <label>
                            Payment Info:
                            <input type="text" required />
                        </label>
                        <button type="submit">Place Order</button>
                    </form>
                </>
            )}
        </div>
    );
};

export default CheckoutPage;
