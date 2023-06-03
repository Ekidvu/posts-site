import { useContext } from "react";
import { PostsContext } from "../../contexts/post-context";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import { Spinner } from "../../components/spinner";
import { Post } from "../../components/post";
import { UserContext } from "../../contexts/current-user-context";


export const FavouritePage = () => {
    const { favourites: posts, isLoading, favsPagination: pagination } = useContext(PostsContext);
    // console.log(pagination);
    const postsListPag = posts.slice(pagination.from, pagination.to);
    
    return (
        <>
            {isLoading 
                ? <Spinner bg="body"/>
                : <>
                    <Grid2 container spacing={5}>
                    {postsListPag.map(postData => <Post {...postData} key={postData._id} />)}
                    </Grid2>
                </>
            }
        </>
    )
}

