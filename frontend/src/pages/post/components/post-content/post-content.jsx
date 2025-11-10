import styled from "styled-components";
import { H2, Icon } from "../../../../components";
import { SpecialPanel } from "../special-panel.jsx/special-panel";
import { useNavigate } from "react-router-dom";
import { PROP_TYPE } from "../../../../constants";

const PostContentContainer = ({
    post: { id, title, content, imageUrl, publishedAt },
    className,
}) => {
    const navigate = useNavigate();

    return (
        <div className={className}>
            {imageUrl ? (
                <img src={imageUrl} alt={title || "image"} loading="lazy" />
            ) : null}
            <H2>{title}</H2>
            <SpecialPanel
                id={id}
                publishedAt={publishedAt}
                editButton={
                    <Icon
                        id="fa-pencil-square-o"
                        margin_r="10px"
                        size="24px"
                        onClick={() => {
                            navigate(`/post/${id}/edit`);
                        }}
                    />
                }
            />

            <div className="post-text">{content}</div>
        </div>
    );
};

export const PostContent = styled(PostContentContainer)`
    & img {
        float: left;
        margin-right: 20px;
        margin-bottom: 10px;
    }
    & .special-panel {
        display: flex;
        justify-content: space-between;
        margin: -20px 0 20px;
        font-size: 12px;
    }
    & h2 {
        font-size: 18px;
    }
    & .published-at {
        display: flex;
        position: relative;
        color: #afafaf;
    }

    & .buttons {
        display: flex;
        position: relative;
        top: -6px;
    }
    & .post-text {
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        word-break: break-word;
    }
`;

PostContent.propTypes = {
    post: PROP_TYPE.POST.isRequired,
};
