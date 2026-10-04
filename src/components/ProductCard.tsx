import { Card, Button } from "react-bootstrap";
import { useDispatch} from "react-redux";
import { addToCart } from "../redux/cartSlice";
import styles from "../styles/ProductCard.module.css"



interface ProductCardProps {
    id: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
}

const ProductCard = ({ id, title, description, price, imageUrl }: ProductCardProps) => {
    const dispatch = useDispatch();

    const normalizedDescription = description.trim().replace(/\s+/g, " ");
    const descriptionLimit = 132;
    const summary = normalizedDescription.length > descriptionLimit
        ? `${normalizedDescription.slice(0, descriptionLimit).replace(/\s+\S*$/, "")}...`
        : normalizedDescription;

    const handleAddToCart = () => {
        dispatch(addToCart({ id, title, description, price, image: imageUrl }));
    }

    return (
        <Card className={styles.card}>
            <div className={styles.imageFrame}>
                <Card.Img variant="top" src={imageUrl} alt={title} className={styles.image} loading="lazy" />
            </div>
            <Card.Body className={styles.body}>
                <Card.Title className={styles.title}>{title}</Card.Title>
                <Card.Text className={styles.description}>{summary}</Card.Text>
                <Card.Text className={styles.price}><strong>Price: ${price.toFixed(2)}</strong></Card.Text>
                <Button variant="primary" className={styles.addButton} onClick={handleAddToCart}>
                    Add to Cart
                </Button>
            </Card.Body>
        </Card>
    );
}

export default ProductCard;