// src/pages/post/post.jsx
import styled from "styled-components";
import { useEffect, useLayoutEffect, useState } from "react";
import { useMatch, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Comments, PostContent, PostForm } from "./components";
import { loadPostAsync, resetPostData } from "../../actions";
import { selectPost } from "../../selectors";
import { Error, PrivetContent } from "../../components";
import { ROLE } from "../../constants";

const PostContainer = ({ className }) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const post = useSelector(selectPost);
    const isCreating = !!useMatch("/post/create");
    const isEditing = !!useMatch(`/post/${id}/edit`);
    const [error, setError] = useState(null);

    useLayoutEffect(() => {
        if (isCreating) {
            return;
        }

        dispatch(loadPostAsync(id))
            .then((postData) => {
                if (postData.error) {
                    const errorMessage =
                        typeof postData.error === "string"
                            ? postData.error
                            : postData.error?.message ?? String(postData.error);
                    setError(errorMessage);
                }
            })
            .catch((err) => {
                setError(err.message ?? String(err));
            });
    }, [dispatch, id, isEditing]);

    useEffect(() => {
        if (isCreating) {
            dispatch(resetPostData());
        }
    }, [isCreating]);

    const SpecificPostPage =
        isCreating || isEditing ? (
            <PrivetContent access={[ROLE.ADMIN]}>
                <div className={className}>
                    <PostForm post={post} />
                </div>
            </PrivetContent>
        ) : (
            <>
                <div className={className}>
                    <PostContent post={post} />
                    <Comments comments={post.comments} postId={post.id} />
                </div>
            </>
        );

    return error ? <Error error={error} /> : SpecificPostPage;
};

export const Post = styled(PostContainer)`
    margin: 40px 0;
    padding: 40px 50px;
`;
