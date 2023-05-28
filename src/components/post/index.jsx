import { Avatar, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material';
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
import { isLiked } from '../utils/global-funcs';
import { UserContext } from '../../contexts/current-user-context';
dayjs.locale('ru')


export function Post({ title, text, author, _id, image, created_at, tags, likes, ...rest }) {
    const { changeOpenModal, setClickedPost, handlePostLike } = useContext(PostsContext);
    const { currentUser } = useContext(UserContext)
    // const [isLikedState, setIsLikedState] = useState(false);

    const like = isLiked(likes, currentUser?._id);
    const handleClickLike = () => handlePostLike({likes, _id});

    function handleClickOpenPost(e) {
        e.preventDefault();
        changeOpenModal(true);
        setClickedPost(_id)
    }

    return (
        <Grid2 className={s.card_container} sx={{ display: 'flex' }} item='true' xs={12} sm={6} md={4} lg={3}>
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

                <CardActionArea onClick={handleClickOpenPost} className={s.cardarea}>
                    <CardMedia
                        component="img"
                        height="200"
                        image={image}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {title}
                        </Typography>
                        <Typography className={s.card_text} variant="body2" color="text.secondary" noWrap>
                            {text}
                        </Typography>
                    </CardContent>
                </CardActionArea>

                <Typography className={s.card_date_create}>
                    <span>{dayjs(created_at).format('DD MMMM YYYY [г.] HH:mm')}</span>
                </Typography>

                <CardActions className={s.bottom_card_cont} sx={{ marginTop: 'auto' }}>
                    <Typography component="div" className={s.tags} noWrap>{tags}</Typography>
                    <div className={s.bottom_btns}>

                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                        <IconButton id={s.btn_fav} className={cn('post__favourite', { 'post__favourite_is_active': like })} onClick={handleClickLike}>
                            <FavoriteIcon />
                        </IconButton>
                        {/* <Button size="small" color="primary">
                            like
                        </Button> */}
                    </div>
                </CardActions>
            </Card>
        </Grid2>
    );
}


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