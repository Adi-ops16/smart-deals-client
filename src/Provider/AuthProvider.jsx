import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { app } from '../firebase.config';
export const AuthContext = createContext()
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
    const auth = getAuth(app)
    const [user, setUser] = useState(null)
    const [userLoading, setUserLoading] = useState(true)
    // create user with email and password 
    const createUser = (email, password) => {
        userLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    // observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            const loggedUser = { email: currentUser?.email }
            if (currentUser) {
                fetch('http://localhost:3000/getToken', {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(loggedUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        localStorage.setItem("token", data.token)
                    })
            } else {
                localStorage.removeItem('token')
            }
            setUserLoading(false)
        })
        return () => {
            unsubscribe()
        }

    }, [auth])

    // sign in existing user
    const signInUser = (email, password) => {
        setUserLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    // google sign in
    const signInWithGoogle = () => {
        setUserLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    // signout 
    const logOut = () => {
        return signOut(auth)
    }

    const authInfo = {
        auth,
        createUser,
        signInUser,
        signInWithGoogle,
        user,
        setUser,
        logOut,
        userLoading,
        setUserLoading
    }
    return <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>;
}

export default AuthProvider;