import { Nav, Navbar } from "react-bootstrap";
import logo from "../assets/logo.jpg";
import styles from "../styles/NavBar.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { selectCartItemsCount } from "../redux/cartSlice";
import { signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const cartItemsCount = useSelector((state: RootState) => selectCartItemsCount(state));
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/login"); // Redirect to login page after logout
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <Navbar className={styles.navbar} variant="dark">
            <Navbar.Brand href="/">
                <img src={logo} alt="logo" className={styles.logo} />
            </Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link className={styles.navLinks} href="/">Home</Nav.Link>
                <Nav.Link className={styles.navLinks} href="/cart">Cart ({cartItemsCount})</Nav.Link>
                <Nav.Link className={styles.navLinks} href="/checkout">Checkout</Nav.Link>
                <Nav.Link className={styles.navLinks} href="/product-management">Product Management</Nav.Link>
                <Nav.Link className={styles.navLinks} href="/orders">Order History</Nav.Link>
                {user ? (
                    <Nav.Link className={styles.navLinks} onClick={handleLogout} style={{ cursor: "pointer" }}>
                        Logout
                    </Nav.Link>
                ) : (
                    <Nav.Link className={styles.navLinks} href="/login">Login</Nav.Link>
                )}
            </Nav>
        </Navbar>
    );
};

export default NavBar;
