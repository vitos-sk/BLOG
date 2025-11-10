import { request } from "../utils";
import { setPostData } from "./set-post-data";

export const savePostAsync = (id, newPostData) => (dispatch) => {
    const saveRequest =
        id && id.length > 0
            ? request(`/api/posts/${id}`, "PATCH", newPostData)
            : request("/api/posts", "POST", newPostData);

    return saveRequest.then((updatedPost) => {
        const postData = updatedPost.data ?? updatedPost;

        dispatch(setPostData(postData));

        return postData;
    });
};
