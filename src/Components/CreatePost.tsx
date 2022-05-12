import { FC, FormEvent, useRef } from 'react';
import { useDispatch } from "react-redux";
import { addPost, getPosts } from "../actions/post.action";

type Data = {
    author: string,
    authorId: string,
    message: string,
    comments: [] | null,
    date: number | Date | string
}

const CreatePost: FC<{ uid: string, displayName: string }> = ( { uid, displayName } ) => {
    const message = useRef<HTMLTextAreaElement>( null )
    const dispatch = useDispatch()

    const handlePost = async ( e: FormEvent<HTMLFormElement> ) => {
        e.preventDefault()

        const data: Data = {
            author: displayName,
            authorId: uid,
            message: message.current!.value,
            comments: null,
            date: Date.now()
        }
        await dispatch<any>(addPost(data))
        message.current!.value = "";
        dispatch<any>(getPosts());
    }
    return (
        <div className="new-post-modal">
            <form onSubmit={ ( e ) => handlePost( e ) }>
                <textarea name="message" id="message" placeholder="Message..." ref={ message }></textarea>
                <input type="submit" value="Publier"/>
            </form>
        </div>
    );
};

export default CreatePost;
