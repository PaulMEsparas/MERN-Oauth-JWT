import React, { useEffect, useState } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";

//importing images
import Akrho from "./images/Akrho.jpg";

//importing styles
// import useStyles from "./styles";

//redux
import { useDispatch } from "react-redux";

//actions
import { getPosts } from "./actions/posts.js";

function App() {
  const [currentId, setCurrentId] = useState(null);
  // const classes = useStyles();
  const dispatch = useDispatch(); //

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Container maxWidth="lg">
      <AppBar
        style={{
          borderRadius: 15,
          margin: "30px 0",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
        position="static"
        color="inherit"
      >
        <Typography
          style={{ color: "rgba(0,183,255, 1)" }}
          variant="h2"
          align="center"
        >
          Memories
        </Typography>
        <img
          style={{ marginLeft: "15px" }}
          src={Akrho}
          alt="Akrho"
          height="100"
        />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;
