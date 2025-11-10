import { request } from "../utils";
import { removeComment } from "./remove-comment";

export const removeCommentAsync = (postId, id) => (dispatch) => {
    return request(`/api/posts/${postId}/comments/${id}`, "DELETE").then(
        (res) => {
            dispatch(removeComment(id));
            return res;
        }
    );
};
