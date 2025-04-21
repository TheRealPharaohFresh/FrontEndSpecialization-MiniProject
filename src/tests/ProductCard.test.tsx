import {render, screen} from '@testing-library/react';
import ProductCard from '../components/ProductCard';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/cartSlice';

const setupStore = () => 
    configureStore({
        reducer: { cart: cartReducer },
    });

    describe('ProductCard Component', () => {
        test('renders product card with correct information and details', () => {
            const store = setupStore();
            render(
                <Provider store={store}>
                    <ProductCard
                        id={String(1)}
                        title="Product A"
                        description="Test description"
                        price={10}
                        imageUrl="test-image.jpg"
                    />
                </Provider>
            );
    
            // This is me checking for the title
            expect(screen.getByText(/Product A/i)).toBeInTheDocument();
            // This is me checking for the description
            expect(screen.getByText(/Test description/i)).toBeInTheDocument();
            // This is me checking for the price
            expect(screen.getByText(/Price: \$10.00/i)).toBeInTheDocument();
        });
    });