import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import { Post } from '../post';
import { useContext } from "react";
import { PostsContext } from "../../contexts/post-context";

export function PostList() {
    const { posts } = useContext(PostsContext);
    // console.log(posts);
    return (
        <Grid2 container spacing={5}>
            {posts.map(postData => <Post {...postData} key={postData._id} />)}
        </Grid2>
    );
}

