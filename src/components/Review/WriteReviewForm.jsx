import React, { useState } from "react";

const WriteReviewForm = ({ onSubmit, onClose }) => {
  const [reviewer, setReviewer] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reviewer.trim() || !comment.trim() || rating === 0) {
      setError("Please fill all fields and select a rating.");
      return;
    }
    setError("");
    onSubmit &&
      onSubmit({
        reviewer,
        rating,
        comment,
        date: new Date().toISOString().slice(0, 10),
        _id: Date.now().toString(),
      });
    setReviewer("");
    setRating(0);
    setComment("");
    onClose && onClose();
  };

  return (
    <div
      className="
        flex items-center justify-center
        w-full max-w-[90vw] max-h-[90vh]
        xs:w-[300px] xs:h-[400px]
        sm:w-[360px] sm:h-[420px]
        md:w-[420px] md:h-[500px]
        lg:w-[500px] lg:h-[500px]
        bg-white rounded-2xl shadow-2xl border
        overflow-y-auto my-4
      "
      style={{
        minWidth: "270px",
        minHeight: "320px"
      }}
    >
      <form
        className="flex flex-col justify-center w-full h-full px-4 py-4 sm:px-6 md:px-10 md:py-8"
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-800 text-center">
          Write a Review
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Your Name
          </label>
          <input
            type="text"
            value={reviewer}
            onChange={(e) => setReviewer(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 text-base"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Rating
          </label>
          <div className="flex justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={`text-xl mx-1 sm:text-2xl md:text-3xl transition ${
                  star <= rating ? "text-yellow-500" : "text-gray-300"
                }`}
                onClick={() => setRating(star)}
                aria-label={`${star} Star`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Review
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 text-base"
            placeholder="Write your review here..."
            rows={4}
          />
        </div>
        {error && (
          <div className="mb-2 text-red-500 font-medium text-center">{error}</div>
        )}
        <div className="flex gap-2 justify-center mt-2">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 font-medium"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg transition"
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default WriteReviewForm;
