import { useState } from 'react';
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase-config";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";

const useLogout = () => {
	const showToast = useShowToast();
	const [loading, setLoading] = useState(false);
  
	const logout = async () => {
	  setLoading(true);
	  try {
		// 서버에 로그아웃 요청을 보냅니다.
		const response = await axios.post('http://localhost:5050/auth/logout', {}, { withCredentials: true });
  
		if (response.status === 200) {
			localStorage.removeItem('user-info'); 
			localStorage.removeItem('token')
		  showToast('Success', response.data.message, 'success');
		}
	  } catch (error) {
		showToast('Error', error.response?.data?.error || 'An error occurred during logout', 'error');
	  } finally {
		setLoading(false);
	  }
	};
	return { logout }
}

export default useLogout;