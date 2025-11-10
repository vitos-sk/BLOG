import PropTypes from "prop-types";
import { useState } from "react";
import styled from "styled-components";
import { Icon } from "../../../../components";
import { Comment } from "./components";
import { selectUserRole } from "../../../../selectors";
import { useDispatch, useSelector } from "react-redux";
import { addCommentAsync } from "../../../../actions";
import { PROP_TYPE, ROLE } from "../../../../constants";

const CommentsContainer = ({ className, comments, postId }) => {
    const dispatch = useDispatch();
    const [newComment, setNewComment] = useState("");
    const userRole = useSelector(selectUserRole);

    const onNewCommentAdd = (postId, content) => {
        dispatch(addCommentAsync(postId, content));
        setNewComment("");
    };

    const isGuest = userRole === ROLE.GUST;

    return (
        <div className={className}>
            {!isGuest && (
                <div className="new-comment">
                    <textarea
                        name="comment"
                        value={newComment}
                        placeholder="Kommentar schreiben..."
                        onChange={(e) => setNewComment(e.target.value)}
                    ></textarea>
                    <Icon
                        id="fa-paper-plane-o"
                        size="22px"
                        onClick={() => onNewCommentAdd(postId, newComment)}
                    />
                </div>
            )}

            <div className="comments">
                {comments.map(({ id, author, content, publishedAt }) => (
                    <Comment
                        key={id}
                        id={id}
                        postId={postId}
                        author={author}
                        content={content}
                        publishedAt={publishedAt}
                    />
                ))}
            </div>
        </div>
    );
};

export const Comments = styled(CommentsContainer)`
    margin: 10px auto;

    & .new-comment {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
    }
    & .new-comment textarea {
        width: 100%;
        height: 80px;
        padding: 10px 10px;
        margin: 10px 0;
        font-size: 14px;
        border-radius: 10px;
        background-color: #393939;
        box-shadow: 0px 2px 10px rgba(63, 61, 61, 0.2);
        border: none;
        resize: none;
    }
`;

Comments.propTypes = {
    comments: PropTypes.arrayOf(PROP_TYPE.COMMENT),
    postId: PropTypes.string.isRequired,
};
