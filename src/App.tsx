import {FC, useState} from 'react';
import ConnectModal from "./Components/CommectModal";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase.config";
import firebase from "firebase/compat";
import User = firebase.User;

const App: FC = () => {
    const [user, setUser] = useState<User | null>(null);

    onAuthStateChanged(auth, ( currentUser ) => {
        setUser(currentUser);
    });

    return (
        <div>
            <div className="app-header">
                <ConnectModal />
            </div>
            <div className="posts-container"></div>
        </div>
    );
};

export default App;
