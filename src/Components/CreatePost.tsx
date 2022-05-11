import React from 'react';

const CreatePost = () => {
    return (
        <div className="new-post-modal">
            <form>
                <textarea name="message" id="message" placeholder="Message..."></textarea>
                <input type="submit" value="Publier"/>
            </form>
        </div>
    );
};

export default CreatePost;
