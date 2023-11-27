import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";

import FileBase from "react-file-base64"; // img to string

import { useDispatch, useSelector } from "react-redux"; // redux
import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
  const initState = {
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  };
  const dispatch = useDispatch();
  const [postData, setPostData] = useState(initState);

  //getting data from the store with the same ID as the current ID passed on then returns a null if no currentID
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]); // if post has value, meaning user clicked on the edit button to update a post

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      // if currentId is present, it means that a post is to be updated
      dispatch(updatePost(currentId, postData));
    } else {
      // if no currentId, create new post
      dispatch(createPost(postData));
    }

    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setPostData(initState);
  };

  return (
    <Paper style={{ padding: "10px" }}>
      <form
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} a Memory
        </Typography>
        <TextField
          style={{ padding: "0 0 10px 0" }}
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
        <TextField
          style={{ padding: "0 0 10px 0" }}
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          style={{ padding: "0 0 10px 0" }}
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          style={{ padding: "0 0 10px 0" }}
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <div style={{ width: "97%", margin: "10px 0" }}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          style={{ marginBottom: "10px" }}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
