import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Icon } from "../../../../components";

//
const PostCardContainer = ({
    className,
    id,
    imageUrl,
    title,
    publishedAt,
    commentsCount,
}) => {
    return (
        <div className={className}>
            <Link to={`/post/${id}`}>
                <img src={imageUrl} alt="Image" loading="lazy" />
                <div className="post-card-futer">
                    <h4>{title}</h4>
                    <div className="post-card--info">
                        <div className="published_at">
                            <Icon
                                inactiv={true}
                                id="fa-calendar-o"
                                size="18px"
                            />
                            {publishedAt}
                        </div>

                        <div className="comments-cout">
                            <Icon
                                inactiv={true}
                                id="fa-comment-o"
                                size="18px"
                            />
                            {commentsCount}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export const PostCard = styled(PostCardContainer)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    margin: 10px;
    border: 1px solid #ffffff;

    & h4 {
        margin: 0;
    }

    & img {
        display: block;
        width: 100%;
    }
    & .post-card-futer {
        border-top: 1px solid #ffffff;
        padding: 5px;
    }
    & .post-card--info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        margin-top: 5px;
    }
    & .published_at {
        display: flex;
        align-items: center;
        font-size: 12px;
        gap: 5px;
    }
    & .comments-cout {
        display: flex;
        align-items: center;
        font-size: 12px;
        gap: 5px;
    }
`;

PostCard.propTypes = {
    id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    publishedAt: PropTypes.string.isRequired,
    commentsCount: PropTypes.number.isRequired,
};
