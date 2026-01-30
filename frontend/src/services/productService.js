import axios from 'axios';

const API_BASE_URL = 'http://localhost:8082/api/products';

const ProductService = {
  getAllProducts: async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }
};

export default ProductService;