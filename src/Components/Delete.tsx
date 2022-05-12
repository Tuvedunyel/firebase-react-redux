import { FC } from 'react';
import { useDispatch } from "react-redux";
import { deletePost } from "../actions/post.action";

const Delete: FC<{ postId: string }> = ( { postId } ) => {
    const dispatch = useDispatch();

    const handleDelete = (): void => {
        dispatch<any>(deletePost(postId))
    }

    return (
        <span className="delete" onClick={ () => handleDelete() }>
            <i className="fa-solid fa-trash-can"></i>
        </span>
    );
};

export default Delete;
