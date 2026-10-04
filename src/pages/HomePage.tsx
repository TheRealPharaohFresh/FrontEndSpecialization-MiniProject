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
      <header className={styles.intro}>
        <span className={styles.eyebrow}>The Unique collection</span>
        <h1 className={styles.heading}>Good finds, made for every day.</h1>
        <p className={styles.heading2}>
          Explore a considered mix of clothing, technology, and everyday accessories.
        </p>
      </header>

      <h2 className={styles.sectionHeading}>Shop the collection</h2>

      <div className={styles.row}>
        {loading ? (
          <p className={styles.status}>Loading products...</p>
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
          <p className={styles.status}>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;

