import axios from 'axios';

// Use relative URL (same origin as frontend)
const USER_SERVICE_URL = '/api/users';

const UserService = {
  getAllUsers: async () => {
    try {
      const response = await axios.get(USER_SERVICE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }
};

export default UserService;