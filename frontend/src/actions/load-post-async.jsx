// src/actions/load-post-async.jsx
import { request } from "../utils";
import { setPostData } from "./set-post-data";

export const loadPostAsync = (postId) => async (dispatch) =>
    request(`/api/posts/${postId}`).then((postData) => {
        if (postData.data) {
            dispatch(setPostData(postData.data));
        }
        return postData;
    });
