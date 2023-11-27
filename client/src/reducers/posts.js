//reducer = ( state , action) =>{}
//state should have an initial value

export default (posts = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    case "UPDATE":
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case "LIKE":
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case "CREATE":
      return [...posts, action.payload];
    case "DELETE":
      return posts.filter((post) => post._id !== action.payload);
    // filter out the id to be deleted and keep the rest

    default:
      return posts;
  }
};
