import PropTypes from "prop-types";
import styled from "styled-components";
import { Icon } from "../../../../../../components";
import { useDispatch, useSelector } from "react-redux";
import {
    closeModal,
    openModal,
    removeCommentAsync,
} from "../../../../../../actions";

import { selectUserRole } from "../../../../../../selectors";
import { ROLE } from "../../../../../../constants";
//

const CommentContainer = ({
    className,
    id,
    postId,
    author,
    content,
    publishedAt,
}) => {
    const dispatch = useDispatch();
    const userRole = useSelector(selectUserRole);

    const onCommentRemove = (id) => {
        dispatch(
            openModal({
                text: "Kommentar löschen ?",
                onConfirm: () => {
                    dispatch(removeCommentAsync(postId, id)),
                        dispatch(closeModal());
                },
                onCancel: () => dispatch(closeModal()),
            })
        );
    };

    const hasAccess = userRole === ROLE.ADMIN || userRole === ROLE.MODERATOR;

    return (
        <div className={className}>
            <div className="comment">
                <div className="info-panel">
                    <div className="author">
                        {" "}
                        <Icon
                            className={"user-icon"}
                            id="fa-user-o"
                            size="18px"
                        />
                        {author}
                    </div>
                    <div className="published-at">
                        {" "}
                        <Icon
                            className={"published-at-icon"}
                            id="fa-calendar-o"
                            size="18px"
                        />
                        {publishedAt ?? "00:00:00"}
                    </div>
                </div>
                <div className="comment-text">{content}</div>
            </div>
            {hasAccess && (
                <Icon
                    className={"trash-icon"}
                    id="fa-trash-o"
                    size="22px"
                    onClick={() => onCommentRemove(id)}
                />
            )}
        </div>
    );
};

export const Comment = styled(CommentContainer)`
    display: flex;
    align-items: center;
    gap: 10px;

    & .comment {
        display: flex;
        flex-direction: column;
        margin: 5px 0;
        padding: 10px;
        width: 100%;
        border-radius: 10px;
        border: 1px solid #a4a1a1;
        background-color: #000000;
        box-shadow: 0px 2px 10px rgba(63, 61, 61, 0.2);
    }
    & .info-panel {
        display: flex;
        justify-content: space-between;
        padding: 5px 10px;
        color: #afafaf;
    }
    & .author {
        display: flex;
        justify-content: space-between;
    }
    & .published-at {
        display: flex;
        justify-content: space-between;
    }
    & .comment-text {
        display: flex;
        justify-content: space-between;
        padding: 10px;
    }
    & .published-at-icon {
        margin-right: 10px;
        color: #afafaf;
    }
    & .user-icon {
        margin-right: 10px;
        color: #afafaf;
    }
    & .trash-icon {
    }
`;

Comment.propTypes = {
    id: PropTypes.string.isRequired,
    postId: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    publishedAt: PropTypes.string.isRequired,
};
