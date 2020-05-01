import React, { useEffect } from "react";
import Post from "../Post/Post";
import { connect } from "react-redux";
import { loadPosts } from "../../actions/postsAction";
import CreatePost from "../createPost/createPost";

const HomePage = ({ posts, loadPosts }) => {
  useEffect(() => {
    // console.log("Comp HomePage Mounted");
    loadPosts();
  }, []);

  if (posts) console.log(posts);
  return (
    <>
      <CreatePost />
      {posts
        ? posts.map((post, index) => {
            return (
              <Post
                title={post.title}
                description={post.description}
                posted_at={post.posted_at}
                comments={post.comments}
                post_id={post._id}
                key={`Post${index}`}
              />
            );
          })
        : null}
    </>
  );
};

const mapStateToProps = (state) => ({
  posts: state.post.posts,
});
export default connect(mapStateToProps, { loadPosts })(HomePage);
