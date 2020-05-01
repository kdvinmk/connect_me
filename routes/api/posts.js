const router = require("express").Router();
const User = require("../../models/User");
const auth = require("../../middleware/auth");

// Commenting on a post
router.post("/comments", auth, async (req, res) => {
  const { post_id, comment } = req.body;
  const { id } = req.user;

  const postedUser = await User.findById(id);
  if (!postedUser) return res.status(400).send("Error with finding the user");

  // const found = await ;
  // if (!found) return res.status(400).send("No User of this post found");

  const commentObj = {
    comment,
    posted_by: postedUser.name,
  };

  User.findOne({ "posts._id": post_id }, (err, found) => {
    // console.log(found, post_id);
    // found.posts[0].comments.push(commentObj);
    found.posts.map((post) => {
      if (post._id == post_id) {
        post.comments.push(commentObj);
        // console.log(post.comments);
      }
    });
    found.save();
    res.send(found);
  });

  // console.log(found[0].posts[0].comments);

  // try {
  //   await found.save();
  //   res.send(found);
  // } catch (err) {
  //   res.status(400).send(err);
  // }
});

// Post a post
router.post("/", auth, async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.user;

  const user = await User.findOne({ _id: id });
  if (!user) return res.status(400).send("Please login to post");

  const newPost = {
    title,
    description,
  };

  console.log(newPost);
  const update = await User.findOneAndUpdate(
    { _id: id },
    { $push: { posts: newPost } }
  );
  if (update) return res.send("Posted successfully");

  // user
  //   .update({
  //     $push: {
  //       posts: newPost,
  //     },
  //   })
  //   .then((resp) => res.send(resp));
});

// Get all posts
router.get("/", auth, async (req, res) => {
  User.find((err, found) => {
    // res.send(found);
    const senArr = [];
    found.map((user) => {
      senArr.push(user.posts);
    });
    const finalArr = [].concat(...senArr).reverse();
    res.send(finalArr);
  });
});

module.exports = router;

// const { email } = req.body;

//   const user = await User.findOne({ email });
//   if (!user) return res.status(400).send("User not found");

//   if (user) {
//     const { posts } = user;
//     if (!posts[0]) return res.status(400).send("User does not have any posts");
//     const finalPosts = [];
//     posts.map((post) => {
//       const obj = {
//         title: post.title,
//         description: post.description,
//       };
//       finalPosts.push(obj);
//     });
//     res.send(finalPosts);
//   }
