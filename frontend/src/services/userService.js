import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api/users';

const UserService = {
  getAllUsers: async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }
};

export default UserService;