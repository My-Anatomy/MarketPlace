import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MOCK_PRODUCTS } from "../mock/products";
import { MOCK_REVIEWS } from "../mock/review";
import WriteReviewForm from "../components/Review/WriteReviewForm";

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = MOCK_PRODUCTS.find((p) => p._id === id);

  // Manage review state locally
  const [reviews, setReviews] = useState(MOCK_REVIEWS);
  const [showForm, setShowForm] = useState(false);

  // ESC key support to close modal
  useEffect(() => {
    if (!showForm) return;
    const handleEsc = (e) => {
      if (e.key === "Escape") setShowForm(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [showForm]);

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto py-16 text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-3">Product Not Found</h3>
        <p className="text-gray-600">The product you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Blurred, dimmed modal backdrop */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backdropFilter: "blur(8px)" }}
          onClick={() => setShowForm(false)}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <div
            className="relative z-10"
            onClick={e => e.stopPropagation()}
          >
            <WriteReviewForm
              onSubmit={newReview => setReviews([newReview, ...reviews])}
              onClose={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      <div className={`max-w-7xl mx-auto p-4 pt-8 flex flex-col md:flex-row gap-8 ${showForm ? 'blur-sm pointer-events-none select-none' : ''}`}>
        {/* Left Panel: Product Content */}
        <div className="flex-1 bg-white rounded-xl shadow p-6">
          <div className="flex flex-col items-center">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full md:w-96 h-80 object-contain rounded-lg bg-gray-100 border border-gray-200 mb-8"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
          <div className="text-2xl font-semibold text-green-700 mb-4">₹{product.price}</div>
          <div className="flex flex-wrap gap-8 mb-4 text-gray-700">
            <div>
              <span className="font-semibold">Category: </span>
              <span>{product.category.name}</span>
            </div>
            <div>
              <span className="font-semibold">Location: </span>
              <span>{product.location}</span>
            </div>
          </div>
          <div className="mb-2">
            <span className="font-semibold text-gray-700">Seller: </span>
            <span>{product.seller.name}</span>
          </div>
          <div className="mb-2 text-gray-400 text-sm">
            Listed on {new Date(product.createdAt).toLocaleString()}
          </div>
          <div className="border-t border-gray-200 pt-4 mt-4">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">Product Description</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>
          <div className="flex gap-4 mt-8">
            <button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black py-3 px-5 rounded-lg text-lg font-semibold shadow-md transition-colors duration-200">
              Add to Cart
            </button>
            <button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 px-5 rounded-lg text-lg font-semibold shadow-md transition-colors duration-200">
              Buy Now
            </button>
          </div>
        </div>

        {/* Right Panel: Review Sidebar */}
        <aside className="md:w-1/3 w-full sticky top-24 h-full">
          <div className="bg-gray-50 rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Customer Reviews</h2>
              <button
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded font-medium hover:bg-blue-200 transition"
                onClick={() => setShowForm(true)}
              >
                Write Review
              </button>
            </div>
            <div className="overflow-y-auto space-y-6" style={{ maxHeight: "450px" }}>
              {reviews.length === 0 ? (
                <div className="text-gray-500">No reviews yet.</div>
              ) : (
                reviews.map((review) => (
                  <div key={review._id} className="border-b last:border-b-0 pb-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-yellow-500 text-lg">
                        {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
                      </span>
                      <span className="font-semibold text-gray-800">{review.reviewer}</span>
                      <span className="text-gray-400 text-xs">
                        | {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-gray-700">{review.comment}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ProductDetailPage;
