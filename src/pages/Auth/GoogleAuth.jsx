import { Button, Center, Text } from '@chakra-ui/react';
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../config/firebase-config";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

const GoogleAuth = ({ prefix }) => {
    const [signInWithGoogle, , , error] = useSignInWithGoogle(auth);
    const showToast = useShowToast();
    const loginUser = useAuthStore((state) => state.login);

    const handleGoogleAuth = async () => {
        try {
            const newUser = await signInWithGoogle();
            if (!newUser && error) {
                showToast("Error", error.message, "error");
                return;
            }
            const userRef = doc(firestore, "users", newUser.user.uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                // login
                const userDoc = userSnap.data();
                localStorage.setItem("user-info", JSON.stringify(userDoc));
                loginUser(userDoc);
                console.log(loginUser)
            } else {
                // signup
                const userDoc = {
                    uid: newUser.user.uid,
                    email: newUser.user.email,
                    username: newUser.user.displayName,
                    bio: "",
                    profilePicURL: newUser.user.photoURL,
                    followers: [],
                    following: [],
                    posts: [],
                    createdAt: Date.now(),
                };
                await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
                localStorage.setItem("user-info", JSON.stringify(userDoc));
                loginUser(userDoc);
                console.log(loginUser)
            }
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    };

    return (
        <Button w={'full'} variant={'outline'} leftIcon={<FcGoogle />} onClick={handleGoogleAuth}>
          <Center>
            <Text>Sign in with Google</Text>
          </Center>
        </Button>
    );
};

export default GoogleAuth;