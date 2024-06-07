import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from '../Firebase/firebase.config'
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    //create new user
    const createNewUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    //login user
    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    //update profile
    const updateUserProfile = (name, profileImage) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: profileImage,
        })
    }

    //google login
    const googleLogin = () => {
        return signInWithPopup(auth, googleProvider);
    }

    // logout user
    const logOutUser = () => {
        setLoading(true)
        return signOut(auth);
    }

    //observe user 
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            const userEmail = currentUser?.email || user?.email;
            const loggedUser = { email: userEmail };

            setUser(currentUser);
            console.log('Current User', currentUser);
            setLoading(false);

            // If user exists then issue a token
            if (currentUser) {
                axiosPublic.post('/jwt', loggedUser)
                    .then(res => {
                        console.log('Token Response', res.data);
                    })
                    .catch(err => {
                        console.error('Error setting token', err);
                    });
            }
            else {
                axiosPublic.post('/clear-jwt', loggedUser)
                    .then(() => {
                        // console.log('Sign Out Response', res.data);
                    })
                    .catch(err => {
                        console.error('Error', err);
                    });
            }
        });

        return () => unsubscribe();
    }, [axiosPublic, user?.email]);



    //
    const authInfo = {
        user,
        loading,
        createNewUser,
        loginUser,
        updateUserProfile,
        logOutUser,
        googleLogin,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;