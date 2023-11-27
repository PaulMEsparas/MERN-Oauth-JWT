import React from "react";
import Post from "./Post/Post";

//mui
import { Grid, CircularProgress } from "@mui/material";

//redux
import { useSelector } from "react-redux";

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);
  console.log(posts);

  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      style={{ display: "flex", alignItems: "center" }}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6} md={6}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
