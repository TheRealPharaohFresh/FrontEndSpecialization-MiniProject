import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./config/firebaseConfig";
import Home from './pages/HomePage'
import NavBar from './components/NavBar'
import ShoppingCart from './pages/ShoppingCartPage';
import CheckoutPage from './pages/CheckOutPage'
import Login from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import ProductManagement from './pages/ProductManagementPage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailsPage from './pages/OrderDetailsPage';

function ProtectedRoute({ user, children }: { user: User | null; children: React.ReactNode }) {
  return user ? <>{children}</> : <Navigate to="/" />;
}

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/" 
          element={<ProtectedRoute user={user}><Home /></ProtectedRoute>} 
        />
        <Route 
          path="/cart" 
          element={<ShoppingCart/>}
        />
        <Route 
          path="/checkout" 
          element={<CheckoutPage/>}
        />
        <Route 
          path="/admin" 
          element={<ProtectedRoute user={user}><AdminPage /></ProtectedRoute>} 
        />
        <Route path='product-management' element={<ProductManagement/>} />
        <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
        <Route path='/orders' element={<OrdersPage/>} />
        <Route  path='/order/:orderId' element={<OrderDetailsPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
