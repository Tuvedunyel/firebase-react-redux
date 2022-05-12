import React, { FC, FormEvent, useRef, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase.config";
import CommentCard from "./CommentCard";
import { useDispatch } from "react-redux";
import { addComment } from "../actions/post.action";

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
    const dispatch = useDispatch();

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

        dispatch<any>( addComment( post.id, data ) )
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
