import { FC } from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from "../utils/firebase.config";

const Delete: FC<{ postId: string }> = ( { postId } ) => {

    const handleDelete = (): void => {
        deleteDoc(doc(db, "posts", postId));
    }

    return (
        <span className="delete" onClick={ () => handleDelete() }>
            <i className="fa-solid fa-trash-can"></i>
        </span>
    );
};

export default Delete;
