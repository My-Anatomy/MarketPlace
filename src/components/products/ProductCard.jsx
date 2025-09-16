import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { wishlistAPI } from '../../services/api';
import toast from 'react-hot-toast';

const ProductCard = ({ product, onWishlistChange }) => {
  const { user } = useAuth();

  const handleWishlistToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error('Please login to add items to wishlist');
      return;
    }

    try {
      if (product.isWishlisted) {
        await wishlistAPI.remove(product._id);
        toast.success('Removed from wishlist');
      } else {
        await wishlistAPI.add(product._id);
        toast.success('Added to wishlist');
      }
      if (onWishlistChange) onWishlistChange();
    } catch (error) {
      toast.error('Failed to update wishlist');
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays <= 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-200 group">
      <Link to={`/products/${product._id}`} className="block">
        <div className="relative">
          <img
            src={product.images?.[0] || 'https://images.pexels.com/photos/3945669/pexels-photo-3945669.jpeg'}
            alt={product.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
              product.isWishlisted
                ? 'bg-red-500 text-white'
                : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'
            }`}
          >
            <Heart className="w-4 h-4" fill={product.isWishlisted ? 'currentColor' : 'none'} />
          </button>

          {/* Status Badge */}
          {product.status === 'sold' && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              SOLD
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
            {product.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl font-bold text-blue-600">
              {formatPrice(product.price)}
            </span>
            {product.category && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                {product.category.name}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{product.location}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{formatDate(product.createdAt)}</span>
            </div>
          </div>

          {product.seller && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center">
                {product.seller.avatar ? (
                  <img
                    src={product.seller.avatar}
                    alt={product.seller.name}
                    className="w-6 h-6 rounded-full mr-2"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                    <span className="text-xs font-semibold text-blue-600">
                      {product.seller.name.charAt(0)}
                    </span>
                  </div>
                )}
                <span className="text-sm text-gray-600 font-medium">
                  {product.seller.name}
                </span>
              </div>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;