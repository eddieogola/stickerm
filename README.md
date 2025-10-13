# Stickerm - Microservice Architecture

A modern e-commerce platform built with microservices architecture, featuring gRPC communication, GraphQL API Gateway, and distributed services for scalability and maintainability.

## 🏗️ Architecture Overview

Stickerm follows a microservices architecture pattern with the following key components:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Client App    │───▶│  API Gateway    │───▶│ Microservices   │
│  (Frontend)     │    │   (GraphQL)     │    │    (gRPC)       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Services

| Service                    | Technology         | Port  | Description                                       |
| -------------------------- | ------------------ | ----- | ------------------------------------------------- |
| **API Gateway**            | TypeScript/Node.js | 3000  | GraphQL endpoint, request routing, authentication |
| **Product Service**        | Go                 | 50051 | Product management, CRUD operations               |
| **Recommendation Service** | Python             | TBD   | Product recommendations, ML algorithms            |

## 🛠️ Technology Stack

### API Gateway

- **Framework**: Express.js with TypeScript
- **GraphQL**: Apollo Server with Federation
- **Communication**: gRPC clients
- **Logging**: Pino logger
- **Development**: Nodemon, ts-node

### Product Service

- **Language**: Go 1.25.1
- **Framework**: gRPC server
- **Protocol**: Protocol Buffers (protobuf)
- **Architecture**: Clean architecture pattern

### Recommendation Service

- **Language**: Python 3.11+
- **Framework**: TBD (FastAPI/Flask planned)
- **Package Management**: uv/pip

## 📋 API Documentation

### GraphQL Schema

The API Gateway exposes a GraphQL endpoint at `/api/v1/graphql` with the following operations:

#### Types

```graphql
type Product {
  id: ID!
  name: String!
  description: String!
  price: Float!
  imageUrl: String!
}
```

#### Queries

| Query      | Arguments | Returns     | Description       |
| ---------- | --------- | ----------- | ----------------- |
| `products` | None      | `[Product]` | Get all products  |
| `product`  | `id: ID!` | `Product`   | Get product by ID |

#### Mutations

| Mutation        | Arguments                                    | Returns   | Description             |
| --------------- | -------------------------------------------- | --------- | ----------------------- |
| `createProduct` | `name, description, price, imageUrl`         | `Product` | Create new product      |
| `updateProduct` | `id, name?, description?, price?, imageUrl?` | `Product` | Update existing product |
| `deleteProduct` | `id: ID!`                                    | `Boolean` | Delete product          |

### gRPC Services

#### Product Service Proto Definition

```proto
service ProductService {
    rpc CreateProduct (CreateProductRequest) returns (CreateProductResponse);
    rpc GetProducts (GetProductsRequest) returns (GetProductsResponse);
    rpc GetProductById (GetProductByIdRequest) returns (GetProductByIdResponse);
    rpc UpdateProduct (UpdateProductRequest) returns (UpdateProductResponse);
    rpc DeleteProduct (DeleteProductRequest) returns (DeleteProductResponse);
}
```

## 🚦 Communication Flow

### gRPC Communication Pattern

| Step | Component    | Action                     | Protocol     |
| ---- | ------------ | -------------------------- | ------------ |
| 1    | Client       | Sends GraphQL query        | HTTP/GraphQL |
| 2    | API Gateway  | Validates & routes request | -            |
| 3    | API Gateway  | Calls microservice         | gRPC         |
| 4    | Microservice | Processes request          | -            |
| 5    | Microservice | Returns response           | gRPC         |
| 6    | API Gateway  | Formats response           | GraphQL      |
| 7    | Client       | Receives formatted data    | HTTP/JSON    |

### Request Flow Example

```
POST /api/v1/graphql
{
  query: "{ products { id name price } }"
}
      ↓
API Gateway (GraphQL Resolver)
      ↓
gRPC Call: ProductService.GetProducts({})
      ↓
Product Service (Go)
      ↓
Returns: GetProductsResponse{products: [...]}
      ↓
GraphQL Response: { data: { products: [...] } }
```

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+
- Go 1.25+
- Python 3.11+
- Protocol Buffers compiler (protoc)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd stickerm
   ```

2. **API Gateway Setup**

   ```bash
   cd server/apigateway
   npm install
   # or
   pnpm install
   ```

3. **Product Service Setup**

   ```bash
   cd server/productservice
   go mod tidy
   ```

4. **Recommendation Service Setup**
   ```bash
   cd server/recommendationservice
   pip install -e .
   ```

### Running the Services

#### Development Mode

1. **Start Product Service**

   ```bash
   cd server/productservice
   go run main.go
   # Server starts on localhost:50051
   ```

2. **Start API Gateway**

   ```bash
   cd server/apigateway
   npm run dev
   # Server starts on http://localhost:3000
   # GraphQL endpoint: http://localhost:3000/api/v1/graphql
   ```

3. **Start Recommendation Service** (Coming Soon)
   ```bash
   cd server/recommendationservice
   python main.py
   ```

#### Production Mode

1. **Build API Gateway**
   ```bash
   cd server/apigateway
   npm run build
   npm start
   ```

## 🔧 Configuration

### Environment Variables

#### API Gateway (.env)

| Variable        | Default     | Description        |
| --------------- | ----------- | ------------------ |
| `PORT`          | 3000        | Server port        |
| `NODE_ENV`      | development | Environment mode   |
| `API_PREFIX`    | /api/v1     | API route prefix   |
| `WHITELIST_IPS` | []          | CORS whitelist IPs |
| `LOG_LEVEL`     | info        | Logging level      |

### Service Configuration

#### gRPC Client Configuration

```typescript
// API Gateway gRPC client setup
const client = new ProductService(
  "localhost:50051",
  credentials.createInsecure()
);
```

## 📁 Project Structure

```
stickerm/
├── server/
│   ├── apigateway/           # GraphQL API Gateway (Node.js/TypeScript)
│   │   ├── src/
│   │   │   ├── config/       # Configuration files
│   │   │   ├── controllers/  # Business logic controllers
│   │   │   ├── grpc/         # gRPC client setup
│   │   │   ├── middlewares/  # Express middlewares
│   │   │   ├── models/       # TypeScript interfaces
│   │   │   ├── resolvers/    # GraphQL resolvers
│   │   │   ├── utils/        # Utility functions
│   │   │   ├── schema.graphql # GraphQL schema
│   │   │   └── server.ts     # Main server file
│   │   └── package.json
│   │
│   ├── productservice/       # Product microservice (Go)
│   │   ├── controllers/      # Service handlers
│   │   ├── genproto/        # Generated protobuf files
│   │   ├── main.go          # Main server file
│   │   └── go.mod
│   │
│   ├── recommendationservice/ # Recommendation service (Python)
│   │   ├── main.py
│   │   └── pyproject.toml
│   │
│   └── protos/              # Protocol Buffer definitions
│       └── stickerm.proto
│
└── README.md
```

## 🧪 Testing

### API Gateway Tests

```bash
cd server/apigateway
npm test
npm run test:watch
```

### GraphQL Playground

Navigate to `http://localhost:3000/api/v1/graphql` to access the GraphQL playground for testing queries and mutations.

### Example Queries

#### Get All Products

```graphql
query GetProducts {
  products {
    id
    name
    description
    price
    imageUrl
  }
}
```

#### Create Product

```graphql
mutation CreateProduct {
  createProduct(
    name: "Awesome Sticker"
    description: "A really cool sticker"
    price: 9.99
    imageUrl: "https://example.com/sticker.png"
  ) {
    id
    name
    price
  }
}
```

## 🔍 Monitoring & Logging

### Health Checks

- API Gateway: `GET /api/v1/healthz`
- Product Service: Built-in gRPC health checking

### Logging

- **API Gateway**: Pino logger with structured JSON logging
- **Product Service**: Go standard library logging
- **Recommendation Service**: Python logging (TBD)

## 🚀 Deployment

### Docker Support (Coming Soon)

Each service will include Dockerfile for containerization.

### Kubernetes Support (Planned)

Kubernetes manifests for orchestration and scaling.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🔮 Roadmap

- [ ] Add authentication & authorization
- [ ] Implement caching layer (Redis)
- [ ] Add database integration
- [ ] Complete recommendation service
- [ ] Add Docker support
- [ ] Implement monitoring (Prometheus/Grafana)
- [ ] Add API rate limiting
- [ ] Implement event-driven architecture
- [ ] Add comprehensive testing suite

## 📞 Support

For questions and support, please open an issue in the repository.

---

**Author**: Eddie Ogola  
**Version**: 1.0.0  
**Last Updated**: 2025
