import { Nav, Navbar } from 'react-bootstrap';
import logo from '../assets/logo.jpg';
import styles from '../styles/NavBar.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { selectCartItemsCount } from '../redux/cartSlice';

const NavBar = () => {
    const cartItemsCount = useSelector((state: RootState) => selectCartItemsCount(state));

    return (
        <Navbar className={styles.navbar}  variant="dark">
            <Navbar.Brand href="/">
                <img src={logo} alt="logo" className={styles.logo} />
            </Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link className={styles.navLinks} href="/">HomePage</Nav.Link>
                <Nav.Link className={styles.navLinks} href="/cart">Cart ({cartItemsCount})</Nav.Link>
            </Nav>
        </Navbar>
    );
}

export default NavBar;