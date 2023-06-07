import { Avatar, Box, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material';
import s from './styles.module.css';
import '../component-styles.css'
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { red } from '@mui/material/colors';
import cn from 'classnames';
import dayjs from 'dayjs';
import 'dayjs/locale/ru'
import { useContext, useEffect, useState } from 'react';
import { PostsContext } from '../../contexts/post-context';
import { isLiked, parseTags } from '../utils/global-funcs';
import { UserContext } from '../../contexts/current-user-context';
import api from '../utils/api';
dayjs.locale('ru')


export function Post({ title, text, author, _id, image, created_at, tags, likes, ...rest }) {
    const [longTagsHoverState, setLongTagsHoverState] = useState(false);
    const [appearTagsBox, setAppearTagsBox] = useState(false);
    const thisPost = { title, text, author, _id, image, created_at, tags, likes, ...rest };
    const { setCurrentPost, handlePostLike, handleClickOpenPost } = useContext(PostsContext);
    const { currentUser } = useContext(UserContext)

    const like = isLiked(likes, currentUser?._id);
    const handleClickLike = () => handlePostLike({ likes, _id });

    function handleClickPost(e) {
        e.preventDefault();
        setCurrentPost(thisPost);
        console.log(thisPost);
        handleClickOpenPost(thisPost);
    }

    const handleHoverLongTags = (e) => {
        // console.log(e.target.innerText);
        if (parseTags(tags).join().length > 20) {
            setLongTagsHoverState(true);
            setTimeout(() => {
                setAppearTagsBox(true)
            }, 3600)
        }
    }
    const handleHideLongTags = (e) => {
        setLongTagsHoverState(false);
        setTimeout(() => {
            setAppearTagsBox(false)
        }, 3600)
    }
    const tagsDiv = <div className={cn(s.tags_show, {
        [s.tags_show_active]: !!longTagsHoverState,
    })}>{parseTags(tags).map((tag, i) => <span key={i} className={s.tag_bit}>{tag}</span>)}</div>;


    // console.log("Post title: ", _id, "is liked: ", like);

    return (
        <Grid2 className={s.card_container} id='cardGridCont_ID' sx={{ display: 'flex' }} item='true' xs={12} sm={6} md={4} lg={3}>
            <Card className={s.card} id='cardStyleID' sx={{ maxWidth: 345 }}>
                <CardHeader
                    avatar={
                        <Avatar src={author?.avatar} sx={{ bgcolor: red[500] }} >

                        </Avatar>
                    }
                    action={
                        <IconButton>
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={author.name}
                    subheader={author.about}
                />

                <CardActionArea onClick={handleClickPost} className={s.cardarea}>
                    <CardMedia
                        component="img"
                        height="200"
                        image={image}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" className={s.card_title}>
                            {title}
                        </Typography>
                        <Typography className={s.card_text} variant="body2" color="text.secondary" noWrap>
                            {text}
                        </Typography>
                    </CardContent>
                </CardActionArea>

                <Box className={s.cont_for_date_and_fav} sx={{ marginTop: 'auto' }}>
                    <Typography className={s.card_date_create}>
                        <span>{dayjs(created_at).format('DD MMMM YYYY [г.] HH:mm')}</span>
                    </Typography>

                    <CardActions className={s.bottom_card_cont}>
                        <Typography component="div" className={cn(s.tags, 'card_tags')} onMouseEnter={handleHoverLongTags} onMouseLeave={handleHideLongTags}>{parseTags(tags).map((tag,i) => <div key={i} className={s.tag_bit}>{tag}</div>)}</Typography>
                        {longTagsHoverState && tagsDiv}

                        <div className={s.bottom_btns}>

                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                            <IconButton id={s.btn_fav} className={cn('post__favourite', { 'post__favourite_is_active': like })} onClick={handleClickLike}>
                                <FavoriteIcon />
                            </IconButton>

                        </div>
                    </CardActions>

                </Box>

            </Card>
        </Grid2>
    );
}

// &nbsp;

// {/* <Card container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
// <CardContent xs={6}>
//     <h1>1</h1>
// </CardContent>
// <Typography xs={6}>
//     <h1>2</h1>
// </Typography>
// <Grid xs={6}>
//     <h1>3</h1>
// </Grid>
// <Grid xs={6}>
//     <h1>4</h1>
// </Grid>
// </Card> */}


// {/* <Typography className={s.card_text} variant="body2" color="text.secondary" noWrap>
// {text}
// </Typography> */}

// onClick={handleClickLike}