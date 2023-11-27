import React from "react";

//redux
import { useDispatch } from "react-redux";

//actions
import { deletePost, likePost } from "../../../actions/posts";

//date library
import moment from "moment";

//mui
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import ThumbUpAltSharpIcon from "@mui/icons-material/ThumbUpAltSharp";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import MoreHorizSharpIcon from "@mui/icons-material/MoreHorizSharp";

const Post = ({ post, setCurrentId }) => {
  //initialise useDispatch
  const dispatch = useDispatch();

  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "15px",
        height: "100%",
        position: "relative",
      }}
    >
      <CardMedia
        style={{
          height: 0,
          paddingTop: "56.25%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backgroundBlendMode: "darken",
        }}
        image={post.selectedFile}
        title={post.title}
      />
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          color: "white",
        }}
      >
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          color: "white",
        }}
      >
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={() => {
            setCurrentId(post._id);
          }}
        >
          <MoreHorizSharpIcon fontSize="medium" />
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "20px",
        }}
      >
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography
        style={{ padding: "0 16px" }}
        gutterBottom
        variant="h5"
        component="h2"
      >
        {post.title}
      </Typography>
      <CardContent>
        <Typography color="textSecondary" component={"p"} variant="body2">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions
        style={{
          padding: "0 16px 8px 16px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(likePost(post._id))}
        >
          <ThumbUpAltSharpIcon fontSize="small" />
          &nbsp; Like &nbsp;
          {post.likeCount}
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(deletePost(post._id))}
        >
          <DeleteOutlineSharpIcon fontSize="small" />
          &nbsp; Delete &nbsp;
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
