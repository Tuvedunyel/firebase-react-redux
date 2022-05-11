import {FC, FormEvent, useRef} from 'react';
import {auth} from "../utils/firebase.config";

const SignUp: FC = () => {
    const registerEmail = useRef<HTMLInputElement>(null);
    const registerPassword = useRef<HTMLInputElement>(null)

    const handleRegister = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            auth.createUserWithEmailAndPassword(registerEmail.current!.value, registerPassword.current!.value);
        } catch (error: any) {
            console.log(error.message)
        }
    }
    return (
        <div className="signup-container">
            <div className="signup">
                <h3>S'inscrire</h3>
                <form onSubmit={ e => handleRegister(e) } >
                    <input type="text" name="pseudo" placeholder="Pseudo" id="pseudo" required/>
                    <input type="email" name="email" placeholder="Email" id="email" required ref={registerEmail}/>
                    <input type="password" name="password" placeholder="Mot de passe" id="email" required ref={registerPassword}/>
                    <input type="submit" value="Valider l'inscription"/>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
