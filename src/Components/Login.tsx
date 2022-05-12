import {FC, FormEvent, useRef, useState} from 'react';
import {auth} from "../utils/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login: FC = () => {
    const loginEmail = useRef<HTMLInputElement>(null);
    const loginPassword = useRef<HTMLInputElement>(null);
    const [error, setError] = useState(false);

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
          const user = await signInWithEmailAndPassword(auth, loginEmail.current!.value, loginPassword.current!.value);
        } catch (err: any) {
            console.log(err.message);
            setError(true);
        }
    }
    return (
        <div className="login-container">
            <div className="login">
                <h3>Se connecter</h3>
                <form className="form-login" onSubmit={ (e) => handleLogin(e) }>
                    <input type="email" placeholder="email" required ref={loginEmail}/>
                    <input type="password" placeholder="mot de passe" required ref={loginPassword}/>
                    <input type="submit" value="Se connecter" />
                    { error && <p className="error">Email ou mot de passe incorrect</p> }
                </form>
            </div>
        </div>
    );
};

export default Login;
