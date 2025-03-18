import { Card, Button } from "react-bootstrap";
import { useDispatch} from "react-redux";
import { addToCart } from "../redux/cartSlice";
import styles from "../styles/ProductCard.module.css"



interface ProductCardProps {
    id: number;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
}

const ProductCard = ({ id, title, description, price, imageUrl }: ProductCardProps) => {
    const dispatch = useDispatch();
    

    const handleAddToCart = () => {
        dispatch(addToCart({ id, title, description, price, image: imageUrl }));
    }

    return (
        <Card className={styles.card}>
            <Card.Img variant="top" src={imageUrl} className={styles.image} />
            <Card.Body>
                <Card.Title className={styles.title}>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Card.Text className={styles.price}><strong>Price: ${price.toFixed(2)}</strong></Card.Text>
                <Button variant="primary" onClick={handleAddToCart}>
                    Add to Cart 🛒
                </Button>
            </Card.Body>
        </Card>
    );
}

export default ProductCard;