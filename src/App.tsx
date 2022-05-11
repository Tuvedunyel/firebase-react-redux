import {FC, useState} from 'react';
import ConnectModal from "./Components/CommectModal";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./utils/firebase.config";
import firebase from "firebase/compat";
import CreatePost from "./Components/CreatePost";

const App: FC = () => {
    const [user, setUser] = useState<any>(null);

    onAuthStateChanged(auth, ( currentUser ) => {
        setUser(currentUser);
    });

    const handleLogout = async () => {
        await signOut(auth);
    }

    return (
        <div>
            <div className="app-header">
                { user && (
                    <div className="user-infos">
                        <span>{ user?.displayName[0] }</span>
                        <h4>{ user?.displayName }</h4>
                        <button onClick={ () => handleLogout() }><i className="fa-solid fa-arrow-right-from-bracket"></i></button>
                    </div>
                ) }
                { user ? <CreatePost /> : <ConnectModal /> }
            </div>
            <div className="posts-container"></div>
        </div>
    );
};

export default App;
