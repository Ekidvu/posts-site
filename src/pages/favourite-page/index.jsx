import { useContext } from "react";
import { PostsContext } from "../../contexts/post-context";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import { Spinner } from "../../components/spinner";
import { Post } from "../../components/post";
import { UserContext } from "../../contexts/current-user-context";
import { PostList } from "../../components/post-list";


export const FavouritePage = () => {
    const { favourites: posts, isLoading, favsPagination: pagination } = useContext(PostsContext);
    const postsListPag = posts.slice(pagination.from, pagination.to);
    
    return (
        <>
            {isLoading 
                ? <Spinner bg="body"/>
                : <>
                    <PostList />
                    {/* <Grid2 container spacing={5} id='posts_container_grid2_fav'>
                    {postsListPag.map(postData => <Post {...postData} key={postData._id} />)}
                    </Grid2> */}
                </>
            }
        </>
    )
}

