import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './config/firebaseConfig';
import Home from './pages/HomePage';
import Login from './pages/LoginPage';
import NavBar from './components/NavBar';
import ShoppingCart from './pages/ShoppingCartPage';
import CheckoutPage from './pages/CheckOutPage';
import AdminPage from './pages/AdminPage';
import ProductManagement from './pages/ProductManagementPage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailsPage from './pages/OrderDetailsPage';

function ProtectedRoute({ user, children }: { user: User | null; children: React.ReactNode }) {
  return user ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update the user state when auth state changes
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <NavBar />
      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<Login />} />
        
        {/* Home Route, redirected to login if no user */}
        <Route 
          path="/" 
          element={<Home />} 
        />

        {/* Other Routes */}
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route 
          path="/admin" 
          element={<ProtectedRoute user={user}><AdminPage /></ProtectedRoute>} 
        />
        <Route path="/product-management" element={<ProductManagement />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/order/:orderId" element={<OrderDetailsPage />} />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to={user ? '/' : '/login'} />} />
      </Routes>
    </Router>
  );
}

export default App;




