const { default: mongoose } = require("mongoose");
const mapComment = require("./mapComment");

module.exports = function mapPost(post) {
  return {
    id: post._id,
    title: post.title,
    content: post.content,
    comments: post.comments
      ? post.comments.map((comment) =>
          mongoose.isObjectIdOrHexString(comment)
            ? comment
            : mapComment(comment)
        )
      : [],
    imageUrl: post.image,
    publishedAt: post.createdAt,
  };
};
