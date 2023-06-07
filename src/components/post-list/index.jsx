import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import { Post } from '../post';
import { useContext } from "react";
import { PostsContext } from "../../contexts/post-context";
import { Spinner } from "../spinner";
import { useLocation } from "react-router-dom";


export function PostList() {
    const { isLoading, posts, pagination, favourites, favsPagination } = useContext(PostsContext);
    // console.log(pagination);
    const location = useLocation();
    const postsListPag = posts.slice(pagination.from, pagination.to);
    const postsListFavPag = favourites.slice(favsPagination.from, favsPagination.to);


    return (
        <>
            {isLoading 
                ? <Spinner bg="body"/>
                : location.pathname === '/posts'
                    ?   <>
                        <Grid2 container spacing={5} id='posts_container_grid2'>
                        {postsListPag.map(postData => <Post {...postData} key={postData._id} />)}
                        </Grid2>
                    </>
                    : <Grid2 container spacing={5} id='posts_container_grid2_fav'>
                    {postsListFavPag.map(postData => <Post {...postData} key={postData._id} />)}
                    </Grid2>
              
            }
        </>
    )
}



// return (
//     <>
//         {isLoading 
//             ? <Spinner bg="body"/>
//             : <>
//                 <Grid2 container spacing={5}>
//                 {posts.map(postData => <Post {...postData} key={postData._id} />)}
//                 </Grid2>
//             </>
//         }
//     </>
    
// )
