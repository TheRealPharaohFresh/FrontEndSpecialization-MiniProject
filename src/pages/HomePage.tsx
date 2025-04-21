import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/productServices';


interface Product {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  price: number;
  stock: number;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true); // ✅ Add this

  useEffect(() => {
    console.log("Loading products..."); // ✅ Debugging
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const productList = await fetchProducts();
    console.log('Fetched products:', productList); // ✅ Debugging
    setProducts(productList);
    setLoading(false); // ✅ Move this after fetch
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Best Product Collection</h1>
      <h2 className={styles.heading2}>
        Welcome To Unique Where You Can Find The Finest Selection Of Clothing, Electronics, & Accessories!
      </h2>

      <div className={styles.row}>
        {loading ? (
          <p>Loading products...</p> // ✅ Add loading feedback
        ) : products.length > 0 ? (
          products.map((product, index) => (
            <ProductCard
              key={product.id || `product-${index}`}
              id={product.id}
              title={product.name}
              description={product.description}
              price={product.price}
              imageUrl={product.imageUrl}
            />
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;

