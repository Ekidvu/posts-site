import cn from "classnames";
import s from "./styles.module.css"
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { PostsContext } from "../../contexts/post-context";
import api from "../utils/api";
import { pageSize } from "../utils/global-funcs";



export function PostsPagination() {
    const { pagination, handlePageChange } = useContext(PostsContext);

    return (
        <Box className={s.pagination_box}>
            <Stack spacing={2} className={s.pagi_container}>
                <Pagination count={Math.ceil(pagination.count / pageSize)} 
                onChange={handlePageChange}
                color="secondary" />
            </Stack>
        </Box>
    )
}

    // const service = {
    //     getData: ({from, to}) => {    
    //         const data = posts.slice(from, to);   
    //         return api.getPostsList((resolve,reject) => {
    //             resolve({
    //                 count: posts.length,
    //                 data: data
    //             })
    //         })
    //     }
    // }

        // useEffect(() => {
    //     service.getData({from: pagination.from, to: pagination.to}).then(response => {
    //         setPagination({...pagination, count: response.count});
    //         console.log(response);

    //         setPosts(response.data)
    //     })
    // }, [pagination.from, pagination.to])