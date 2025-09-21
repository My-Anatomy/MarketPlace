import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { wishlistAPI } from '../../services/api';
import toast from 'react-hot-toast';

const ProductCard = ({
  product = {},         // Safe default empty object
  onWishlistChange
}) => {
  const { user } = useAuth();

  // Prevent crash if product is missing
  const isWishlisted = product?.isWishlisted || false;
  const imageSrc = product?.images?.[0] || 'https://images.pexels.com/photos/3945669/pexels-photo-3945669.jpeg';
  const title = product?.title || 'Untitled product';
  const description = product?.description || '';
  const price = product?.price || 0;
  const categoryName = product?.category?.name || '';
  const location = product?.location || '';
  const createdAt = product?.createdAt || new Date().toISOString();
  const status = product?.status || '';
  const seller = product?.seller || {};

  const handleWishlistToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast.error('Please login to add items to wishlist');
      return;
    }
    try {
      if (isWishlisted) {
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

  // Use INR format for price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
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

  // Dummy buy handler (replace with real logic or navigation)
  const handleBuy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (status === 'sold') {
      toast.error('This product is already sold!');
      return;
    }
    toast.success('Proceed to buy page or action');
    // Implement buy navigation or open modal here
    // e.g., navigate(`/buy/${product._id}`) if using react-router
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-200 group relative">
      {/* Wishlist Button */}
      <button
        onClick={handleWishlistToggle}
        className={`absolute top-3 right-3 p-2 rounded-full z-10 transition-all duration-200 ${
          isWishlisted
            ? 'bg-red-500 text-white'
            : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'
        }`}
        tabIndex={0}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        type="button"
      >
        <Heart className="w-4 h-4" fill={isWishlisted ? 'currentColor' : 'none'} />
      </button>

      <Link to={`/products/${product?._id || ''}`} className="block">
        <div className="relative">
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {status === 'sold' && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              SOLD
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
            {title}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {description}
          </p>
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl font-bold text-blue-600">
              {formatPrice(price)}
            </span>
            {categoryName && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                {categoryName}
              </span>
            )}
          </div>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{location}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{formatDate(createdAt)}</span>
            </div>
          </div>
          {seller && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center">
                {seller.avatar ? (
                  <img
                    src={seller.avatar}
                    alt={seller.name || "Seller"}
                    className="w-6 h-6 rounded-full mr-2"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                    <span className="text-xs font-semibold text-blue-600">
                      {seller.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                )}
                <span className="text-sm text-gray-600 font-medium">
                  {seller.name || "Unknown"}
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-4 flex gap-3">
            <Link
              to={`/products/${product?._id || ''}`}
              className="flex-1 inline-block text-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 transition-colors duration-200"
              onClick={e => e.stopPropagation()} // Prevent nested Link bug
            >
              View
            </Link>
            <button
              type="button"
              className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                status === 'sold'
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
              disabled={status === 'sold'}
              onClick={handleBuy}
            >
              Buy
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
