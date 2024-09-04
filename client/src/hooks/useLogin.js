// import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
// import { auth, firestore } from "../config/firebase-config";
// import { doc, getDoc } from "firebase/firestore";
// import useAuthStore from "../store/authStore";

// import useShowToast from "./useShowToast";


// const useLogin = () => {
// 	const showToast = useShowToast();
// 	const [signInWithEmailAndPassword, , loading, error] = useSignInWithEmailAndPassword(auth);
// 	const loginUser = useAuthStore((state) => state.login);
// 	console.log(loginUser)
	

// 	const login = async (inputs) => {
// 		if (!inputs.email || !inputs.password) {
// 			return showToast("Error", "Please fill all the fields", "error");

// 			// console.log("Error", "Please fill all the fields", "error");
// 		}
// 		try {
// 			const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password);

// 			if (userCred) {
// 				const docRef = doc(firestore, "users", userCred.user.uid);
// 				const docSnap = await getDoc(docRef);
// 				localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
// 				console.log(docSnap.data())
// 				loginUser(docSnap.data());
// 				// console.log(loginUser(docSnap.data()));
// 			}
// 		} catch (error) {
// 			showToast("Error", error.message, "error");

// 			// console.log("Error", error.message, "error");
// 		}
// 	};

// 	return { loading, error, login };
// };

// export default useLogin;

import axios from 'axios';
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";

const useLogin = () => {
    const showToast = useShowToast();
    const loginUser = useAuthStore((state) => state.login);

    const login = async (inputs) => {
        if (!inputs.email || !inputs.password) {
            return showToast("Error", "Please fill all the fields", "error");
        }

        try {
            const response = await axios.post('http://localhost:5050/auth/login', {
                email: inputs.email,
                password: inputs.password
            }, { withCredentials: true });
            const { user } = response.data;
            const access_token = response.headers['access_token'];
			const expireAt = new Date(new Date().getTime() + 10 * 1000);
			const token = {
				token: access_token,
				expireAt: expireAt
			  };

            if (response.status === 200) {
                if (access_token) {
                    localStorage.setItem("user-info",JSON.stringify(user));
					localStorage.setItem("token",JSON.stringify(token));
                    loginUser(user);
                    showToast("Success", "User logged in successfully", "success");
                } else {
                    throw new Error("ID token not found in response body");
                }
            }
        } catch (error) {
            const errorMessage = error.message || JSON.stringify(error);
            console.log('Error Message:', errorMessage);
            showToast("Error", errorMessage);
        }
    };

    return { login };
};

export default useLogin;
