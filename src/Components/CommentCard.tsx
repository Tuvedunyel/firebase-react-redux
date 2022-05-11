import { FC } from 'react';

type Comment = {
    commentAuthor: string,
    commentAuthorId: string,
    text: string
}

const CommentCard: FC< { comment: Comment } > = ( { comment } ) => {
    return (
        <div className="comment-post">
            <h5>{comment.commentAuthor}</h5>
            <p>{comment.text}</p>
        </div>
    );
};

export default CommentCard;
