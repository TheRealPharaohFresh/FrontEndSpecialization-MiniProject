
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { removeFromCart, clearCart } from "../redux/cartSlice";
import styles from '../styles/ShoppingCartPage.module.css';
import { useNavigate } from "react-router-dom";




const ShoppingCart: React.FC = () => {
    const cart = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItemsCount = cart.length;

    const totalPrice = cart.reduce((acc, item) => acc + item.price, 0).toFixed(2);

    return (
        <div className={styles.container}>
            <h1>Shopping Cart</h1>
            <p>Total Items: {cartItemsCount}</p>
            {cartItemsCount === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    <ul>
                        {cart.map((item) => (
                            <li key={item.id}>
                                <img src={item.image} alt={item.title} className={styles.image} />
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                    <p>Price: ${item.price.toFixed(2)}</p>
                                    <button onClick={() => dispatch(removeFromCart(item.id))}>
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <h3>Total: ${totalPrice}</h3>
                    <button className={styles.button} onClick={() => dispatch(clearCart())}>Clear Cart</button>
                    <button className={styles.button} onClick={() => navigate('/checkout')}>Checkout</button>
                </>
            )}
        </div>
    );
};

export default ShoppingCart;