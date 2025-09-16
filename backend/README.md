# Used Item Marketplace - Backend API

A comprehensive Node.js/Express.js REST API for a used item marketplace application with MongoDB, real-time messaging, and file upload capabilities.

## 🚀 Features

### Authentication & Authorization
- **JWT-based Authentication**: Secure token-based user authentication
- **Role-based Access Control**: Buyer, Seller, and Admin roles with different permissions
- **Password Security**: Bcrypt hashing with salt rounds
- **Token Management**: Automatic token validation and refresh

### User Management
- **User Registration**: Email-based registration with role selection
- **Profile Management**: Update user information and preferences
- **Avatar Upload**: Profile picture upload to Firebase Storage
- **Account Security**: Password change and account deactivation

### Product Management
- **CRUD Operations**: Create, read, update, delete products
- **Image Upload**: Multiple image upload with Firebase Storage
- **Search & Filter**: Advanced search with category, price, location filters
- **Status Management**: Active, sold, pending, inactive product states
- **Pagination**: Efficient pagination for large product lists

### Real-time Messaging
- **Socket.io Integration**: Real-time bidirectional communication
- **Private Messaging**: Direct messages between buyers and sellers
- **Online Status**: Real-time user presence indicators
- **Message History**: Persistent message storage and retrieval
- **Typing Indicators**: Real-time typing status

### Admin Features
- **User Management**: View, edit, delete user accounts
- **Product Moderation**: Approve/reject product listings
- **Report Handling**: Manage user reports and disputes
- **Analytics**: Platform statistics and insights
- **Content Management**: Category and system settings

### Additional Features
- **Wishlist System**: Save favorite products
- **Review System**: Product reviews and ratings
- **Report System**: Report inappropriate content or users
- **File Upload**: Secure file upload with validation
- **Email Notifications**: Automated email notifications
- **Rate Limiting**: API rate limiting for security
- **Compression**: Response compression for better performance

## 🛠️ Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.18+
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: Bcrypt
- **File Storage**: Firebase Storage
- **Real-time**: Socket.io
- **Validation**: Express Validator
- **Security**: Helmet, CORS, Rate Limiting
- **Email**: Nodemailer
- **Development**: Nodemon, Morgan logging
- **Testing**: Jest, Supertest

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd marketplace-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration values.

4. **Set up MongoDB**
   - Install MongoDB locally or use MongoDB Atlas
   - Update the `MONGODB_URI` in your `.env` file

5. **Set up Firebase (for file uploads)**
   - Create a Firebase project
   - Generate a service account key
   - Add Firebase configuration to your `.env` file

6. **Seed the database (optional)**
   ```bash
   npm run seed
   ```

7. **Start the development server**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:5000`

## 🏗️ Project Structure

```
backend/
├── config/              # Configuration files
│   ├── database.js      # MongoDB connection
│   └── firebase.js      # Firebase admin setup
├── controllers/         # Route controllers
│   ├── authController.js
│   ├── productController.js
│   ├── userController.js
│   └── ...
├── middleware/          # Custom middleware
│   ├── auth.js         # Authentication middleware
│   ├── validation.js   # Request validation
│   ├── upload.js       # File upload middleware
│   └── errorMiddleware.js
├── models/             # Mongoose models
│   ├── User.js
│   ├── Product.js
│   ├── Category.js
│   └── ...
├── routes/             # Express routes
│   ├── auth.js
│   ├── products.js
│   ├── users.js
│   └── ...
├── utils/              # Utility functions
│   ├── generateToken.js
│   ├── sendEmail.js
│   └── helpers.js
├── scripts/            # Database scripts
│   └── seed.js         # Seed data script
├── tests/              # Test files
└── server.js           # Main server file
```

## 🔐 API Endpoints

### Authentication
```
POST   /api/auth/register     # User registration
POST   /api/auth/login        # User login
GET    /api/auth/profile      # Get user profile
PUT    /api/auth/profile      # Update user profile
POST   /api/auth/logout       # User logout
```

### Products
```
GET    /api/products          # Get all products (with filters)
GET    /api/products/:id      # Get single product
POST   /api/products          # Create new product
PUT    /api/products/:id      # Update product
DELETE /api/products/:id      # Delete product
GET    /api/products/user/:id # Get user's products
```

### Categories
```
GET    /api/categories        # Get all categories
POST   /api/categories        # Create category (Admin)
PUT    /api/categories/:id    # Update category (Admin)
DELETE /api/categories/:id    # Delete category (Admin)
```

### Messages
```
GET    /api/messages/conversations    # Get user conversations
GET    /api/messages/:userId          # Get messages with user
POST   /api/messages                  # Send message
PUT    /api/messages/:id/read         # Mark message as read
```

### Wishlist
```
GET    /api/wishlist          # Get user's wishlist
POST   /api/wishlist          # Add to wishlist
DELETE /api/wishlist/:id      # Remove from wishlist
```

### Reviews
```
GET    /api/reviews/product/:id    # Get product reviews
POST   /api/reviews               # Create review
PUT    /api/reviews/:id           # Update review
DELETE /api/reviews/:id           # Delete review
```

### Upload
```
POST   /api/upload/image       # Upload single image
POST   /api/upload/images      # Upload multiple images
```

### Admin
```
GET    /api/admin/users        # Get all users
PUT    /api/admin/users/:id/role    # Update user role
DELETE /api/admin/users/:id    # Delete user
GET    /api/admin/stats        # Get platform statistics
GET    /api/admin/reports      # Get all reports
PUT    /api/admin/reports/:id  # Update report status
```

## 🔒 Authentication & Authorization

### JWT Token Structure
```javascript
{
  "id": "user_id",
  "email": "user@example.com",
  "role": "buyer|seller|admin",
  "iat": 1234567890,
  "exp": 1234567890
}
```

### Role Permissions
- **Buyer**: Browse products, message sellers, manage wishlist
- **Seller**: All buyer permissions + create/manage products
- **Admin**: All permissions + user management, content moderation

### Protected Routes
Routes are protected using the `protect` middleware:
```javascript
app.use('/api/products', protect, productRoutes);
```

Admin routes require additional role verification:
```javascript
app.use('/api/admin', protect, admin, adminRoutes);
```

## 📊 Database Schema

### User Schema
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (buyer|seller|admin),
  avatar: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Product Schema
```javascript
{
  sellerId: ObjectId (ref: User),
  title: String,
  description: String,
  categoryId: ObjectId (ref: Category),
  price: Number,
  location: String,
  images: [String],
  status: String (active|sold|pending|inactive),
  createdAt: Date,
  updatedAt: Date
}
```

### Message Schema
```javascript
{
  senderId: ObjectId (ref: User),
  receiverId: ObjectId (ref: User),
  productId: ObjectId (ref: Product),
  content: String,
  timestamp: Date,
  read: Boolean
}
```

## 🔄 Real-time Features

### Socket.io Events

**Client to Server:**
- `joinRoom`: Join a conversation room
- `leaveRoom`: Leave a conversation room
- `sendMessage`: Send a message
- `typing`: User typing indicator

**Server to Client:**
- `onlineUsers`: Updated list of online users
- `newMessage`: New message received
- `messageNotification`: Message notification
- `userTyping`: User typing status

### Connection Handling
```javascript
// Client connection
socket.auth = { token: 'jwt_token' };
socket.connect();

// Server authentication
io.use(socketAuth); // Custom authentication middleware
```

## 🛡️ Security Features

### Input Validation
- Express Validator for request validation
- Sanitization of user inputs
- File type and size validation

### Rate Limiting
- 100 requests per 15 minutes per IP
- Different limits for different endpoints
- DDoS protection

### Security Headers
- Helmet.js for security headers
- CORS configuration
- XSS protection

### Password Security
- Bcrypt with 12 salt rounds
- Password strength validation
- Secure password reset flow

## 📈 Performance Optimizations

### Database Optimization
- MongoDB indexes on frequently queried fields
- Efficient pagination with limit/skip
- Population optimization for related data

### Caching
- Response compression with gzip
- Static asset caching headers
- Database query optimization

### File Upload
- Firebase Storage for scalable file storage
- Image compression and optimization
- Multiple format support (JPEG, PNG, WebP)

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Structure
- Unit tests for utility functions
- Integration tests for API endpoints
- Authentication and authorization tests
- Database operation tests

## 📦 Deployment

### Environment Setup
1. Set up production MongoDB instance
2. Configure Firebase Storage
3. Set up email service (Gmail, SendGrid, etc.)
4. Configure domain and SSL certificate

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

### Environment Variables (Production)
```bash
NODE_ENV=production
MONGODB_URI=mongodb://your-production-db
JWT_SECRET=your-production-secret
CLIENT_URL=https://your-frontend-domain.com
```

## 🔍 Monitoring & Logging

### Logging
- Morgan for HTTP request logging
- Custom error logging
- Performance monitoring

### Health Checks
```
GET /health
```
Returns server status, uptime, and database connectivity.

## 🚀 API Usage Examples

### User Registration
```javascript
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "role": "buyer"
}
```

### Create Product
```javascript
POST /api/products
Authorization: Bearer jwt_token
Content-Type: application/json

{
  "title": "iPhone 13 Pro",
  "description": "Excellent condition iPhone 13 Pro",
  "categoryId": "64a7b8c9d1e2f3g4h5i6j7k8",
  "price": 800,
  "location": "New York, NY",
  "images": ["image_url_1", "image_url_2"]
}
```

### Send Message
```javascript
POST /api/messages
Authorization: Bearer jwt_token
Content-Type: application/json

{
  "receiverId": "64a7b8c9d1e2f3g4h5i6j7k8",
  "productId": "64a7b8c9d1e2f3g4h5i6j7k9",
  "content": "Is this item still available?"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow RESTful API conventions
- Add tests for new features
- Update documentation
- Use consistent error handling
- Follow security best practices

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Email: dev-support@marketplace.com
- Documentation: [api-docs.marketplace.com](https://api-docs.marketplace.com)
- Issues: [GitHub Issues](https://github.com/your-repo/issues)

## 🔗 Related Projects

- [Marketplace Frontend](../frontend) - React.js frontend application
- [Marketplace Mobile](../mobile) - React Native mobile application
- [Marketplace Admin](../admin) - Admin dashboard application