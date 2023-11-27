import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

// Function to get post
export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    console.log(postMessages);
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Function to create post
export const createPost = async (req, res) => {
  const post = req.body; // coming from the post request

  const newPost = new PostMessage(post); // making a new entry/doc with the postmessage schema
  try {
    await newPost.save(); // saving the doc to datebase using the save() method
    res.status(201).json(newPost); //sending the newPost or the new post back to the client
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Function to update post
export const updatePost = async (req, res) => {
  const { id: _id } = req.params; // url has /posts/123(which is the id)
  const post = req.body;

  //mongoose check for valid id passed
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  //find and update post by ID. Hence new is set to true
  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    }
  );

  res.json(updatedPost);
};

// Function to delete post
export const deletePost = async (req, res) => {
  const { id } = req.params; // url has /posts/123(which is the id)

  //mongoose check for valid id passed
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  //find and delete post
  await PostMessage.findOneAndDelete(id);

  res.json({ message: "Post deleted successfully" });
};

//Function to like a pot

export const likePost = async (req, res) => {
  const { id } = req.params; // url has /posts/123(which is the id)

  //mongoose check for valid id passed
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  const post = await PostMessage.findById(id); //finding the post to update the like count

  // findByIdAndUpdate: This Mongoose function is used to find a document by its _id (specified by the id variable) and update it with the provided data.
  // id: This is the identifier of the document you want to update.
  // { likeCount: post.likeCount + 1 }: This is the update object. It specifies that the likeCount field of the document should be incremented by 1.
  // { new: true }: This option, when set to true, tells Mongoose to return the modified document rather than the original one. In this case, updatedPost will contain the document after the update.
  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    { likeCount: post.likeCount + 1 },
    { new: true }
  );

  res.json(updatedPost);
};
