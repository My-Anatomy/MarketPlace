import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import { productsAPI, categoriesAPI } from '../services/api';
import ProductCard from '../components/products/ProductCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

// ------ MOCK PRODUCT DATA ------
const MOCK_PRODUCTS = [
  {
    _id: "demo1",
    title: "Demo Product 1",
    description: "This is a sample product description for the first demo product!",
    price: 150,
    category: { name: "Gadgets" },
    location: "Chennai",
    createdAt: new Date().toISOString(),
    status: "",
    isWishlisted: false,
    images: [
      "https://images.pexels.com/photos/3945669/pexels-photo-3945669.jpeg"
    ],
    seller: {
      name: "Demo User A",
      avatar: ""
    }
  },
  {
    _id: "demo2",
    title: "Demo Product 2",
    description: "Second product, for showing a grid/list view in the catalog.",
    price: 99,
    category: { name: "Books" },
    location: "Bengaluru",
    createdAt: new Date().toISOString(),
    status: "",
    isWishlisted: true,
    images: [
      "https://images.pexels.com/photos/3935708/pexels-photo-3935708.jpeg"
    ],
    seller: {
      name: "Demo User B",
      avatar: ""
    }
  }
  // You can add more demo products here as needed
];

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState(MOCK_PRODUCTS); // Use mock data by default
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false); // No need to show spinner for mock/demo
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    location: searchParams.get('location') || '',
    sortBy: searchParams.get('sortBy') || 'createdAt',
    sortOrder: searchParams.get('sortOrder') || 'desc'
  });

  useEffect(() => {
    fetchCategories();
    // Uncomment below to fetch LIVE products (remove MOCK_PRODUCTS when doing this)
    // fetchProducts();
  }, []);

  // To fetch from API, uncomment below and set loading=true, setProducts from response
  // useEffect(() => {
  //   fetchProducts();
  // }, [currentPage, filters]);

  const fetchCategories = async () => {
    try {
      const response = await categoriesAPI.getAll();
      setCategories(response.data.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // For API fetch, only use when API is wanted
  // const fetchProducts = async () => {
  //   setLoading(true);
  //   try {
  //     const params = {
  //       page: currentPage,
  //       limit: 12,
  //       ...filters
  //     };
  //     // Remove empty filters
  //     Object.keys(params).forEach(key => {
  //       if (params[key] === '') delete params[key];
  //     });
  //     const response = await productsAPI.getAll(params);
  //     setProducts(response.data.data.products || []);
  //     setTotalPages(response.data.data.pages || 1);
  //   } catch (error) {
  //     console.error('Error fetching products:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    setCurrentPage(1);
    // Update URL params
    const newParams = new URLSearchParams();
    Object.keys(newFilters).forEach(key => {
      if (newFilters[key]) {
        newParams.set(key, newFilters[key]);
      }
    });
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      location: '',
      sortBy: 'createdAt',
      sortOrder: 'desc'
    });
    setSearchParams({});
  };

  const sortOptions = [
    { value: 'createdAt:desc', label: 'Newest First' },
    { value: 'createdAt:asc', label: 'Oldest First' },
    { value: 'price:asc', label: 'Price: Low to High' },
    { value: 'price:desc', label: 'Price: High to Low' },
    { value: 'title:asc', label: 'Name: A to Z' },
    { value: 'title:desc', label: 'Name: Z to A' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
          <p className="text-gray-600">
            {products.length > 0 && `Showing ${products.length} products`}
          </p>
        </div>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          {/* Sort Dropdown */}
          <select
            value={`${filters.sortBy}:${filters.sortOrder}`}
            onChange={(e) => {
              const [sortBy, sortOrder] = e.target.value.split(':');
              handleFilterChange('sortBy', sortBy);
              handleFilterChange('sortOrder', sortOrder);
            }}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors duration-200 ${
                viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors duration-200 ${
                viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
              <button
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Clear All
              </button>
            </div>
            {/* Search Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <input
                type="text"
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {/* Category Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Price Range */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            {/* Location Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                placeholder="Enter location..."
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
        {/* Products Grid/List & Demo Card */}
        <div className="flex-1">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your filters or search terms</p>
              {/* Demo card, appears only if actually empty after filtering */}
              <div className="flex flex-wrap justify-center gap-6 mt-8">
                <ProductCard />
                <ProductCard />
              </div>
            </div>
          ) : (
            <>
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' 
                  : 'space-y-4'
              }>
                {products.map(product => (
                  <ProductCard 
                    key={product._id} 
                    product={product} 
                    viewMode={viewMode}
                  />
                ))}
              </div>
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-12 space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-4 py-2 border rounded-lg ${
                        currentPage === i + 1
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
