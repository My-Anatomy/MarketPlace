# Used Item Marketplace - Frontend

A modern React.js frontend for a used item marketplace application built with Vite, Tailwind CSS, and modern web technologies.

## 🚀 Features

### User Management
- **Multi-role Authentication**: Buyers, Sellers, and Admins with different permissions
- **JWT-based Security**: Secure token-based authentication
- **Profile Management**: Users can update their profiles and settings

### Product Management
- **Product Listings**: Browse and search through thousands of products
- **Advanced Filtering**: Filter by category, price range, location, and more
- **Product Details**: Detailed product pages with image galleries
- **Wishlist**: Save favorite items for later

### Communication
- **Real-time Messaging**: Chat directly with buyers and sellers
- **Socket.io Integration**: Instant message delivery and online status
- **Message History**: Keep track of all conversations

### Seller Features
- **Product Upload**: Easy product listing with multiple image support
- **Inventory Management**: Track and manage listed items
- **Sales Dashboard**: Analytics and performance metrics

### Admin Features
- **User Management**: Manage user accounts and permissions
- **Product Moderation**: Approve/reject product listings
- **Reports Handling**: Review and resolve user reports
- **Analytics Dashboard**: Comprehensive platform statistics

## 🛠️ Tech Stack

- **Frontend Framework**: React.js 18 with functional components and hooks
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS for responsive, utility-first styling
- **Routing**: React Router DOM for single-page application navigation
- **State Management**: React Context API with useReducer for global state
- **HTTP Client**: Axios for API communication
- **Real-time**: Socket.io-client for live messaging
- **Notifications**: React Hot Toast for user feedback
- **Icons**: Lucide React for consistent iconography
- **File Uploads**: Firebase Storage integration

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd marketplace-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```
   VITE_API_URL=http://localhost:5000
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Shared components (Header, Footer, etc.)
│   ├── products/        # Product-related components
│   ├── auth/            # Authentication components
│   └── admin/           # Admin-specific components
├── context/             # React Context providers
│   ├── AuthContext.jsx  # Authentication state management
│   └── SocketContext.jsx # Socket.io connection management
├── pages/               # Page components
│   ├── HomePage.jsx
│   ├── ProductsPage.jsx
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   └── admin/           # Admin pages
├── services/            # API service functions
│   └── api.js          # Axios configuration and API calls
├── utils/              # Utility functions
├── hooks/              # Custom React hooks
└── styles/             # Global styles and Tailwind config
```

## 🎨 UI/UX Features

### Design System
- **Color Palette**: Professional blue (#3B82F6) and neutral tones
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Consistent 8px spacing system
- **Components**: Reusable, accessible UI components

### Responsive Design
- **Mobile-first**: Optimized for mobile devices
- **Breakpoints**: Tailored layouts for tablet and desktop
- **Touch-friendly**: Appropriate touch targets for mobile users

### User Experience
- **Loading States**: Skeleton screens and loading indicators
- **Error Handling**: User-friendly error messages
- **Form Validation**: Real-time validation with helpful feedback
- **Animations**: Smooth transitions and micro-interactions

## 🔐 Authentication Flow

1. **Registration**: Users choose between buyer or seller roles
2. **Login**: JWT token-based authentication
3. **Protected Routes**: Role-based access control
4. **Token Management**: Automatic token refresh and storage
5. **Logout**: Secure token cleanup

## 📱 Key Pages

### Public Pages
- **Home**: Hero section, featured products, categories
- **Products**: Filterable product listings with search
- **Product Details**: Comprehensive product information
- **Categories**: Organized category browser

### Authenticated Pages
- **Profile**: User settings and information
- **Wishlist**: Saved favorite products
- **Messages**: Real-time chat interface

### Seller Pages
- **Dashboard**: Sales analytics and product management
- **Sell**: Product listing creation form

### Admin Pages
- **Admin Dashboard**: Platform overview and statistics
- **User Management**: User accounts and role management
- **Product Moderation**: Approve/reject listings
- **Reports**: Handle user reports and disputes

## 🚀 Performance Optimizations

- **Code Splitting**: Lazy loading for pages and components
- **Image Optimization**: Responsive images with proper formats
- **Bundle Optimization**: Tree shaking and minification
- **Caching**: API response caching and browser caching
- **Debounced Search**: Optimized search input handling

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 📦 Building for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## 🔧 Configuration

### Vite Configuration
The project uses Vite for fast development and optimized builds. Configuration is in `vite.config.js`.

### Tailwind CSS
Tailwind configuration is in `tailwind.config.js` with custom themes and utilities.

### ESLint
Code linting is configured in `eslint.config.js` with React-specific rules.

## 🌐 API Integration

The frontend communicates with a Node.js/Express backend through RESTful APIs:

- **Authentication**: `/api/auth/*`
- **Products**: `/api/products/*`
- **Users**: `/api/users/*`
- **Messages**: `/api/messages/*`
- **Categories**: `/api/categories/*`
- **Admin**: `/api/admin/*`

## 🔄 Real-time Features

Socket.io is used for real-time functionality:

- **Live Messaging**: Instant message delivery
- **Online Status**: User presence indicators
- **Notifications**: Real-time updates for important events

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📈 Future Enhancements

- **PWA Support**: Service workers and offline functionality
- **Push Notifications**: Browser push notifications
- **Advanced Search**: Elasticsearch integration
- **Payment Integration**: Stripe payment processing
- **Social Features**: User ratings and reviews
- **Mobile App**: React Native mobile application

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if needed
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License. See LICENSE file for details.

## 📞 Support

For support and questions:
- Email: support@marketplace.com
- Documentation: [docs.marketplace.com](https://docs.marketplace.com)
- Issues: [GitHub Issues](https://github.com/your-repo/issues)#   M a r k e t P l a c e  
 