import { fetchCategories, fetchProductsByCategory } from "../services/api";
import { useQuery } from 'react-query'; 
import { useState } from 'react';
import styles from '../styles/CategoryFilter.module.css';
import ProductCard from './ProductCard';

const CategoryFilter: React.FC = () => {
    const { data: categories, isLoading, error } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
    });

    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const { data: products, isLoading: productsLoading, error: productsError } = useQuery({
        queryKey: ['products', selectedCategory],
        queryFn: () => selectedCategory ? fetchProductsByCategory(selectedCategory) : [],
        enabled: !!selectedCategory,  // Only fetch when a category is selected
    });

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };

    if (isLoading) return <p>Loading categories... please wait</p>;
    if (error) return <p>Something went wrong...</p>;

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Categories</h1>
            <div className="row">
                <div className="col-md-3">
                    <select className={styles.form} onChange={handleCategoryChange} value={selectedCategory || ''}>
                        <option value="" disabled>Select a category</option>
                        {categories?.map((category: string) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="row mt-4">
                {productsLoading && <p>Loading products... please wait</p>}
                {productsError && <p>Something went wrong...</p>}
                {products?.map((product: any) => (
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
            </div>
        </div>
    );
};

export default CategoryFilter;


