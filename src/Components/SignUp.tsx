import {ChangeEvent, FC, FormEvent, useRef, useState} from 'react';
import {auth} from "../utils/firebase.config";
import firebase from "firebase/compat";
import UserCredential = firebase.auth.UserCredential;

const SignUp: FC = () => {
    const registerEmail = useRef<HTMLInputElement>(null);
    const registerPassword = useRef<HTMLInputElement>(null)
    const [displayName, setDisplayName] = useState("");

    const handleRegister = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            auth.createUserWithEmailAndPassword(registerEmail.current!.value, registerPassword.current!.value).then( async (userAuth: UserCredential) => {
                await userAuth?.user?.updateProfile({ displayName })
                console.log(userAuth);
            });
        } catch (error: any) {
            console.log(error.message)
        }
    }
    return (
        <div className="signup-container">
            <div className="signup">
                <h3>S'inscrire</h3>
                <form onSubmit={ e => handleRegister(e) } >
                    <input type="text" name="pseudo" placeholder="Pseudo" id="pseudo" onChange={ (e: ChangeEvent<HTMLInputElement>) => setDisplayName(e.target.value) } required/>
                    <input type="email" name="email" placeholder="Email" id="email" required ref={registerEmail}/>
                    <input type="password" name="password" placeholder="Mot de passe" id="email" required ref={registerPassword}/>
                    <input type="submit" value="Valider l'inscription"/>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
