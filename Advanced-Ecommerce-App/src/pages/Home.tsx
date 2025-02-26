import React from "react";
import { useQuery } from 'react-query';
import { fetchProducts } from '../services/api';
import ProductCard from "../components/ProductCard";
import styles from './Home.module.css';
import CategoryFilter from "../components/CategoryFilter";


const Home: React.FC = () => {
    const { data: products, isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
    });

    if (isLoading) return <p>Loading products..... please wait</p>;
    if (error) return <p>Something went wrong....</p>;

    return (
        <div className="container">
            <h1 className={styles.heading}>Best Product Collection</h1>
            <h2 className={styles.heading2}>Welcome To Unique Where You Can Find The Finest Selection Of Clothing, Electronics, & Accessories!</h2>

            <div className="row">
                {products?.map((product) => (
                    <div key={product.id} className="col-md-4 mb-4">
                        <ProductCard
                            id={product.id}
                            title={product.title}
                            description={product.description}
                            price={product.price}
                            imageUrl={product.image}
                        />
                    </div>
                ))}
                <CategoryFilter/>
            </div>
        </div>
    );
};


export default Home;