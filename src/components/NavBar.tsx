import { Nav, Navbar } from 'react-bootstrap';
import logo from '../assets/logo.jpg';
import styles from '../styles/NavBar.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { selectCartItemsCount } from '../redux/cartSlice';

const NavBar = () => {
    const cartItemsCount = useSelector((state: RootState) => selectCartItemsCount(state));

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
                <Nav.Link className={styles.navLinks} href="/login">Logout</Nav.Link>
            </Nav>
        </Navbar>
    );
}

export default NavBar;