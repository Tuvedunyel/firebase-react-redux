import React, { FC, FormEvent, useRef, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../utils/firebase.config";
import firebase from "firebase/compat";
import User = firebase.User;
import { updateDoc, doc } from "firebase/firestore";
import CommentCard from "./CommentCard";

type Post = {
    author: string,
    authorId: string,
    message: string,
    comments: [] | null,
    date: number | Date | string,
    id: string
}

const CommentPost: FC<{ post: Post }> = ( { post } ) => {
    const [ user, setUser ] = useState<any>( null );
    const answerContent = useRef<HTMLTextAreaElement>( null );

    onAuthStateChanged( auth, ( currentUser ) => {
        setUser( currentUser );
    } );

    const handleComment = ( e: FormEvent<HTMLFormElement> ) => {
        e.preventDefault()
        let data: [ { commentAuthor: string, commentAuthorId: string, text: string } ] | [] = [];

        if (post.comments === null) {
            data = [
                {
                    commentAuthor: user.displayName,
                    commentAuthorId: user.uid,
                    text: answerContent?.current!.value
                }
            ];
        } else {
            data = [ ...post.comments, {
                commentAuthor: user.displayName,
                commentAuthorId: user.uid,
                text: answerContent?.current!.value
            } ]
        }

        updateDoc( doc( db, "posts", post.id ), { comments: data } );
        answerContent!.current!.value = "";
    }

    return (
        <div className="comment-container">
            <h5 className="comment-title">Commentaires</h5>
            { post.comments && post.comments.map( (comment, index) => (
                <CommentCard key={index} comment={comment} />
            ) ) }
            {
                user ? (
                    <form onSubmit={ ( e ) => handleComment( e ) }>
                        <textarea name="comments" placeholder="Envoyer un commentaire" ref={ answerContent }></textarea>
                        <input type="submit" value="Envoyer"/>
                    </form>
                ) : (
                    <p>Vous devez être connecté pour poster un commentaire</p>
                )
            }
        </div>
    );
};

export default CommentPost;
