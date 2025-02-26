import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearCart } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/CheckOutPage.module.css';



interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
}



const CheckoutPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [cart, setCart] = useState<Product[]>([]);
    const cartItemsCount = cart.length;

    
    useEffect(() => {
        const savedCart = sessionStorage.getItem("cart");
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    const totalPrice = cart.reduce((acc, item) => acc + item.price, 0).toFixed(2);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        alert('Order Will Be Shipped Shortly!');
        
       
        dispatch(clearCart());
        sessionStorage.removeItem("cart");

       
        navigate('/');
    };

    return (
        <div className={styles.container}>
            <h1>Checkout</h1>
            <p>Total Items: {cartItemsCount}</p>

            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <h3>Total: ${totalPrice}</h3>
                    <ul>
                        {cart.map((item) => (
                            <li key={item.id}>
                                <img src={item.image} alt={item.title} className={styles.image} />
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>Price: ${item.price.toFixed(2)}</p>
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
