import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminRoute from './components/common/AdminRoute';

// Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from '../src/pages/ProductDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import DashboardPage from './pages/DashboardPage';
import SellPage from './pages/SellPage';
import MessagesPage from './pages/MessagesPage';
import WishlistPage from './pages/WishlistPage';
import CategoriesPage from './pages/CategoriesPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminProducts from './pages/admin/AdminProducts';
import AdminReports from './pages/admin/AdminReports';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                
                {/* Protected Routes */}
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } />
                <Route path="/messages" element={
                  <ProtectedRoute>
                    <MessagesPage />
                  </ProtectedRoute>
                } />
                <Route path="/wishlist" element={
                  <ProtectedRoute>
                    <WishlistPage />
                  </ProtectedRoute>
                } />

                {/* Seller Routes */}
                <Route path="/sell" element={
                  <ProtectedRoute requiredRole={['seller', 'admin']}>
                    <SellPage />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard" element={
                  <ProtectedRoute requiredRole={['seller', 'admin']}>
                    <DashboardPage />
                  </ProtectedRoute>
                } />

                {/* Admin Routes */}
                <Route path="/admin" element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                } />
                <Route path="/admin/users" element={
                  <AdminRoute>
                    <AdminUsers />
                  </AdminRoute>
                } />
                <Route path="/admin/products" element={
                  <AdminRoute>
                    <AdminProducts />
                  </AdminRoute>
                } />
                <Route path="/admin/reports" element={
                  <AdminRoute>
                    <AdminReports />
                  </AdminRoute>
                } />

                {/* 404 Page */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster position="top-right" />
        </Router>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;