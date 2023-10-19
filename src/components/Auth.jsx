import { useState } from "react";
import { auth, googleProvider } from "../config/firebase"
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    console.log(auth?.currentUser?.email);

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);


        } catch (error) {
            console.log(error)
        }
    }

    const logOut = async () => {
        console.log('hit');
        try {
            await signOut(auth);
            console.log('log out')
        } catch (error) {
            console.log(error);
        }
    }

    const signInWithG = async () => {
        try {
            await signInWithPopup(auth, googleProvider);

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <input onChange={(e) => setEmail(e.target.value)} type="text" name="" id="" placeholder="Email" />
            <input onChange={(e) => setPassword(e.target.value)} type="password" name="" id="" placeholder="Password" />
            <button onClick={signIn}>Sign in</button >

            <button onClick={signInWithG}>Sign in but with google</button >

            <button onClick={logOut}>logout user</button>
        </div>
    )
}
export default Auth