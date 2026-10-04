import { Nav, Navbar } from "react-bootstrap";
import logo from "../assets/logo.jpg";
import styles from "../styles/NavBar.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { selectCartItemsCount } from "../redux/cartSlice";
import { signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
            <Navbar.Brand as={Link} to="/">
                <img src={logo} alt="logo" className={styles.logo} />
            </Navbar.Brand>
            <Nav className={styles.links}>
                <Nav.Link as={Link} className={styles.navLink} to="/">Home</Nav.Link>
                <Nav.Link as={Link} className={styles.navLink} to="/cart">Cart ({cartItemsCount})</Nav.Link>
                <Nav.Link as={Link} className={styles.navLink} to="/product-management">Product Management</Nav.Link>
                <Nav.Link as={Link} className={styles.navLink} to="/orders">Order History</Nav.Link>
                {user ? (
                    <Nav.Link className={styles.navLink} onClick={handleLogout} style={{ cursor: "pointer" }}>
                        Logout
                    </Nav.Link>
                ) : (
                    <Nav.Link as={Link} className={styles.navLink} to="/login">Login</Nav.Link>
                )}
            </Nav>
        </Navbar>
    );
};

export default NavBar;
