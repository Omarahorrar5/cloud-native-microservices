import axios from 'axios';

const MINIKUBE_IP = '192.168.58.2';

const API_BASE_URL = `http://${MINIKUBE_IP}:30001/api/users`;

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