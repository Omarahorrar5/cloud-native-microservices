# **Microservices App**

Simple app with 2 independent services + React frontend.

## **Quick Start**

```bash
# Terminal 1: User Service
cd user-service
mvn clean install
mvn spring-boot:run
# http://localhost:8081

# Terminal 2: Product Service  
cd product-service
mvn clean install
mvn spring-boot:run
# http://localhost:8082

# Terminal 3: Frontend
cd frontend
npm install
npm start
# http://localhost:3000
```

## **What It Does**

- **User Service**: Manages users (port 8081)
- **Product Service**: Manages products (port 8082)  
- **React Frontend**: UI to manage both (port 3000)

Each service has its own H2 database.

## **Test It**

1. Open `http://localhost:3000`
2. Click "Users" to manage users table
3. Click "Products" to manage products table

---