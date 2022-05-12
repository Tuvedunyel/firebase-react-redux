import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase.config";
import { Action, AnyAction, Dispatch } from "redux";

type Data = [{
    commentAuthor: string,
    commentAuthorId: string,
    text: string,
    message?: string
}]

export const GET_POSTS = "GET_POSTS";
export const ADD_POST = "ADD_POST";
export const EDIT_POST = "EDIT_POST";
export const DELETE_POST = "DELETE_POST";
export const ADD_COMMENT = "ADD_COMMENT";

export const getPosts = () => {
    return ( dispatch: Dispatch ): Promise<any> => {
        return getDocs( collection( db, "posts" ) ).then( res => {
            dispatch( { type: GET_POSTS, payload: res.docs.map( doc => ({ ...doc.data(), id: doc.id }) ) } );
        } ).catch( err => console.log( err ) )
    }
}

export const addPost = ( data: {} ) => {
    return ( dispatch: Dispatch ): Promise<any> => {
        return addDoc( collection( db, "posts" ), data )
            .then( () => {
                dispatch( { type: ADD_POST, payload: data } );
            } ).catch( err => console.log( err ) )
    }
}

export const editPost = ( data: { id: string, message: string } ) => {
    return ( dispatch: Dispatch ) => {
        return updateDoc( doc( db, "posts", data.id ), { message: data.message } )
            .then( () => {
                dispatch( { type: EDIT_POST, payload: { ...data } } );
            } )
            .catch( ( err ) => console.log( err ) );
    };
};

export const deletePost = ( postId: string ) => {
    return ( dispatch: Dispatch ) => {
        return deleteDoc( doc( db, "posts", postId ) ).then( () => {
            dispatch( { type: DELETE_POST, payload: { postId } } )
        }).catch( err => console.log( err ) );
    }
}

export const addComment = ( postId: string, data: Data ) => {
    return (dispatch: Dispatch) => {
        return updateDoc( doc( db, "posts", postId ), { comments: data } )
            .then( () => {
                dispatch( { type: ADD_COMMENT, payload: { postId, data } } );
            }).catch( err => console.log( err ) );
    }
}