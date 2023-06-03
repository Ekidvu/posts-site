import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import { Post } from '../post';
import { useContext } from "react";
import { PostsContext } from "../../contexts/post-context";
import { Spinner } from "../spinner";


export function PostList() {
    const { posts, isLoading, pagination } = useContext(PostsContext);
    // console.log(pagination);
    const postsListPag = posts.slice(pagination.from, pagination.to);

    return (
        <>
            {isLoading 
                ? <Spinner bg="body"/>
                : <>
                    <Grid2 container spacing={5} id='posts_container_grid2'>
                    {postsListPag.map(postData => <Post {...postData} key={postData._id} />)}
                    </Grid2>
                </>
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
