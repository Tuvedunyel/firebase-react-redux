import { FC, useState } from 'react';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from "../utils/firebase.config";
import Delete from "./Delete";
import CommentPost from "./CommentPost";

type Post = {
    author: string,
    authorId: string,
    message: string,
    comments: [] | null,
    date: number | Date | string,
    id: string
}

type User = {
    uid: string,
    displayName: string,
}

const Post: FC<{ post: Post, user: User }> = ( { post, user } ) => {
    const [ edit, setEdit ] = useState( false );
    const [ editMessage, setEditMessage ] = useState<string | null>( null );

    const dateFormater = ( date: string | number | Date ): string => {
        let currentDate = new Date();
        let postDate = new Date( date );
        let days = Math.floor( (Number( currentDate ) - Number( postDate )) / (1000 * 3600 * 24) );
        if (days === 0) {
            return "Posté aujourd'hui";
        } else if (days === 1) {
            return "Il y a 1 jour";
        } else {
            return "Il y a " + days + " jours";
        }
    }

    const handleEdit = (): void => {
        setEdit( false );
        if (editMessage) {
            updateDoc( doc( db, "posts", post.id ), { message: editMessage } )
        }
    }

    return (
        <div className="post">
            <div className="post-header">
                <div className="left-part">
                    <div className="title">
                        <span>{ post.author[ 0 ] }</span>
                        <h2>{ post.author }</h2>
                    </div>
                    <h5>{ dateFormater( post.date ) }</h5>
                </div>
                { post.authorId === user?.uid && (
                    <div className="right-part">
                        <span onClick={ () => setEdit( !edit ) }><i className="fa-solid fa-pen-to-square"></i></span>
                        <Delete postId={post.id} />
                    </div>
                ) }
            </div>
            { edit ? (
                <>
                    <textarea name="message" id="message" value={ editMessage ? editMessage : post.message } autoFocus
                              onChange={ ( e ) => setEditMessage( e.target?.value ) }></textarea>
                    <button className="edit-btn" onClick={ () => handleEdit() }>
                        Modifier le message
                    </button>
                </>
            ) : (
                <p>{ editMessage ? editMessage : post.message }</p>
            ) }
            <CommentPost post={post} />
        </div>
    );
};

export default Post;
