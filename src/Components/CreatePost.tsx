import { FC, FormEvent, useRef } from 'react';
import { addDoc, collection } from 'firebase/firestore'
import { db } from "../utils/firebase.config";

type Data = {
    author: string,
    authorId: string,
    message: string,
    comments: [] | null,
    date: number | Date | string
}

const CreatePost: FC<{ uid: string, displayName: string }> = ( { uid, displayName } ) => {
    const message = useRef<HTMLTextAreaElement>( null )

    const handlePost = async ( e: FormEvent<HTMLFormElement> ) => {
        e.preventDefault()

        const data: Data = {
            author: displayName,
            authorId: uid,
            message: message.current!.value,
            comments: null,
            date: Date.now()
        }
        await addDoc( collection(db, "posts"), data )
        message.current!.value = "";
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
