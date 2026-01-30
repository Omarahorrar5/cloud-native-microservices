import React, { useState, useEffect } from 'react';
import UserService from './services/userService';
import ProductService from './services/productService';
import './index.css';

function App() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorUsers, setErrorUsers] = useState(null);
  const [errorProducts, setErrorProducts] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Fetch users and products on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Fetch users
    setLoadingUsers(true);
    setErrorUsers(null);
    try {
      const usersData = await UserService.getAllUsers();
      setUsers(usersData);
    } catch (err) {
      setErrorUsers('Cannot connect to User Service (port 8081). Make sure it is running.');
    } finally {
      setLoadingUsers(false);
    }

    // Fetch products
    setLoadingProducts(true);
    setErrorProducts(null);
    try {
      const productsData = await ProductService.getAllProducts();
      setProducts(productsData);
    } catch (err) {
      setErrorProducts('Cannot connect to Product Service (port 8082). Make sure it is running.');
    } finally {
      setLoadingProducts(false);
    }
    
    setLastUpdated(new Date().toLocaleTimeString());
  };

  const getStatusColor = (error) => {
    return error ? '#dc3545' : '#28a745';
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Microservices Dashboard</h1>
        <p>Displaying data from two independent microservices</p>
        <div className="services-info">
          <div className="service-badge user" style={{ borderLeftColor: getStatusColor(errorUsers) }}>
            User Service: Port 8081
            <span style={{ 
              color: getStatusColor(errorUsers), 
              marginLeft: '8px',
              fontSize: '20px'
            }}>
              ●
            </span>
          </div>
          <div className="service-badge product" style={{ borderLeftColor: getStatusColor(errorProducts) }}>
            Product Service: Port 8082
            <span style={{ 
              color: getStatusColor(errorProducts), 
              marginLeft: '8px',
              fontSize: '20px'
            }}>
              ●
            </span>
          </div>
        </div>
      </header>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <button 
          className="refresh-btn" 
          onClick={fetchData}
          disabled={loadingUsers || loadingProducts}
        >
          {loadingUsers || loadingProducts ? 'Loading...' : 'Refresh Data'}
        </button>
        
        {lastUpdated && (
          <div style={{ color: '#666', fontSize: '0.9rem' }}>
            Last updated: {lastUpdated}
          </div>
        )}
      </div>

      <div className="section">
        <h2>Users Table ({users.length} users)</h2>
        <div className="table-container">
          {loadingUsers ? (
            <div className="loading">Loading users from User Service...</div>
          ) : errorUsers ? (
            <div className="error">{errorUsers}</div>
          ) : users.length === 0 ? (
            <div className="empty-message">No users found.</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className="section">
        <h2>Products Table ({products.length} products)</h2>
        <div className="table-container">
          {loadingProducts ? (
            <div className="loading">Loading products from Product Service...</div>
          ) : errorProducts ? (
            <div className="error">{errorProducts}</div>
          ) : products.length === 0 ? (
            <div className="empty-message">No products found.</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.description || '-'}</td>
                    <td>${parseFloat(product.price).toFixed(2)}</td>
                    <td>{product.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;