import { FC, useEffect, useState } from 'react';
import ConnectModal from "./Components/CommectModal";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "./utils/firebase.config";
import firebase from "firebase/compat";
import CreatePost from "./Components/CreatePost";
import { collection, getDocs } from "firebase/firestore";
import login from "./Components/Login";
import Post from "./Components/Post";

type Posts = [ {
    author: string,
    authorId: string,
    message: string,
    comments: [] | null,
    date: number | Date | string,
    id: string
} ]

const App: FC = () => {
    const [user, setUser] = useState<any>(null);
    const [posts, setPosts] = useState<Posts | null>(null);

    onAuthStateChanged(auth, ( currentUser ) => {
        setUser(currentUser);
    });

    useEffect( () => {
        getDocs(collection(db, "posts")).then( res => {
            const receivePosts = res.docs.map( doc => ({ ...doc.data(), id: doc.id }) )
            setPosts( receivePosts )
        })
    }, [])

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
                { user ? <CreatePost uid={user.uid} displayName={user.displayName} /> : <ConnectModal /> }
            </div>
            <div className="posts-container">
                { posts!?.length > 0 && (
                    posts!.sort((a, b) => Number(b.date) - Number(a.date)).map( post => <Post post={post} key={post.id} user={user} />)
                ) }
            </div>
        </div>
    );
};

export default App;
