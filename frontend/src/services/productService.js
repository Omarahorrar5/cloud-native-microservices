import axios from 'axios';

// Use relative URL (same origin as frontend)
const PRODUCT_SERVICE_URL = '/api/products';

const ProductService = {
  getAllProducts: async () => {
    try {
      const response = await axios.get(PRODUCT_SERVICE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }
};

export default ProductService;