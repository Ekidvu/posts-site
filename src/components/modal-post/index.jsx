import cn from 'classnames';
import s from './styles.module.css';
import "../component-styles.css"
import { Avatar, CardHeader, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { postData } from '../../posts';
import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import { PostsContext } from '../../contexts/post-context';
import { Spinner } from '../spinner';
import api from '../utils/api';
import { BackToTop } from '../btn-to-top';
import CommentSendButton from '../btns-comments/btn-send';
import { autoHeight } from '../utils/global-funcs';
import { UserContext } from '../../contexts/current-user-context';

// console.log(dayjs().format('YYYY-MM-DDTHH:mm:ssZ[Z]'));

export function ModalPost({ post, ...rest }) {
    const [comment, setComment] = useState({ text: '' });
    const { isLoadingModal, setChangedPost } = useContext(PostsContext);
    const { currentUser } = useContext(UserContext);

    const postTextBits = post.text.length ? post.text.split('|') : [postData.text];

    // const handleOutOfFocus = (e) => {
    //     e.target.value && setComment(e.target.value)
    // }

    const handleEnterKeyOnComment = (e) => {
        if (e.key === "Enter") {
            const commentData = { [e.target.name]: e.target.value.replace(/\n/g, '') };
            setComment(commentData);
            setChangedPost({ id: post._id, data: commentData })
            console.log(commentData);
            e.target.value = '';
        }
        autoHeight(e.target);
    }

    const handleClickSend = (e) => {
        e.preventDefault();
        const commentData = { 'text': e.target.elements.text.value };
        setComment(commentData);
        setChangedPost({ id: post._id, data: commentData })
        console.log(commentData);
        e.target.reset();
        autoHeight(e.target.elements.text);
    }
    // Я бы хотел научиться драться на мечах, как улитка!

    // function handleSubmitComment(e) {
    //     const dataUpdate = comment;
    //     console.log(dataUpdate);
    //     setChangedPost({ id: post._id, data: dataUpdate })
    // }

    // useEffect(() => {
    //     if (!!comment.text.length) {
    //         const dataUpdate = comment;
    //         console.log(dataUpdate);
    //         setChangedPost({ id: post._id, data: dataUpdate })
    //     }
    // }, [comment])

    return (
        <>
            {isLoadingModal
                ? <Spinner bg="modal" />
                : <div className={s.modal_post}>
                    <div className={cn(s.modal_post_containers, s.modal_post_image)}>
                        <img src={post?.image} alt="бабуча" />
                    </div>

                    <div className={cn(s.modal_post_containers, s.modal_post_vertical)}>

                        <div className={s.post_author_section} id={s.modal_post_author}>
                            <div className={s.post_author_inf}>
                                <span className={s.author_name}>{post?.author.name}</span>
                                <span className={s.author_about}>{post?.author.about}</span>
                            </div>
                            <Avatar src={post?.author?.avatar} component="span" className={s.post_author_ava}>
                                R
                            </Avatar>
                        </div>
                        {!post.comments.length
                            ? <div className={s.comments}>↓↓↓ Здесь могли бы быть ваши комментарии ↓↓↓</div>
                            : <div className={s.comments_container}>
                                <div id="back-to-top-comment" />
                                <div className={s.comments}>
                                    {post.comments.map((comment, i) => <div className={s.comment} key={i}>
                                        <div className={s.post_author_inf}>
                                            <span className={s.author_comment_auth}>
                                                {comment?.author?.about
                                                    ? <>
                                                        <span><div className={s.author_comment_name}>{comment?.author?.name + ', '}&nbsp;</div></span><span className={s.author_comment_about}>{comment?.author?.about}</span>
                                                    </>
                                                    : <div className={s.author_comment_name}>{comment?.author?.name}</div>
                                                }
                                            </span>
                                            {/* <span className={s.author_comment_about}>{comment?.author?.about}</span> */}
                                        </div>
                                        <div className={s.comment_text}>{comment?.text}</div>
                                        <span className={s.comment_time}>updated at: {dayjs(comment?.updated_at).format('DD/MM/YYYY HH:mm')}</span>
                                    </div>)}
                                    <BackToTop anchorID={"#back-to-top-comment"} />
                                </div>
                            </div>
                        }
                        <div className={s.comment_form_box}>
                            <form className={s.comment_form} onSubmit={handleClickSend}>

                                <textarea
                                    type='text'
                                    name='text'
                                    placeholder='комментарий...'
                                    // value={comment?.text}
                                    onKeyUp={handleEnterKeyOnComment}
                                    rows={1}></textarea>
                                <button className={s.comment_send_button}>
                                    <CommentSendButton />
                                </button>

                            </form>
                        </div>

                        {/* <div className={s.comments}>↓↓↓ Здесь могли бы быть ваши комментарии↓↓↓</div> */}
                    </div>

                    <div className={cn(s.modal_post_containers, s.textModalDiv)}>
                        <h2 className={s.title}>{post?.title}</h2>
                        <div className={cn("text", s.textModalDiv__text)}>
                            {postTextBits.map((textbit, i) => <span key={i}>{textbit}</span>)}
                        </div>

                        {/* <div>{!!post.text && post.text}</div> */}
                    </div>
                </div>
            }
        </>
    );
}


// useEffect(() => {
//     const dataUpdate = {
//         "comments": [
//             {
//                 text: comment.text,
//                 author: currentUser,
//                 post: post._id,
//                 // id: post.comments ,
//                 // created_at: created_at ? dayjs().format('YYYY-MM-DDTHH:mm:ssZ[Z]') : created_at,
//                 // updated_at: dayjs().format('YYYY-MM-DDTHH:mm:ssZ[Z]'),
//             }
//         ]
//     };
//     setChangedPost({ id: post._id, data: dataUpdate })
// }, [comment])

// onClick={submitOnClick} // onBlur={handleOutOfFocus}

// const handleEnterKeyOnComment = (e) => {
//     if (e.target.value[e.target.value.length-1]==="\n") {
//         setComment({ [e.target.name]: e.target.value })
//     }
//     console.log(comment);
// }

// {/* <input
//     type='textarea'
//     name='comment'
//     placeholder='комментарий'
//     value={comment?.comment}
//     onChange={handleEnterKeyOnComment}
// /> */}

// {/* <div className={s.post_author_inf}>
// <span className={s.author_comment_name}><div className="">{comment?.author?.name}</div>{comment?.author?.about && ', ' + comment?.author?.about}</span>
// {/* <span className={s.author_comment_about}>{comment?.author?.about}</span> */}
// </div> */}

// {/* <div className={s.post_author_inf}>
//     <span className={s.author_comment_name}>{comment?.author?.name}{comment?.author?.about && ', ' + comment?.author?.about}</span>
//     {/* <span className={s.author_comment_about}>{comment?.author?.about}</span> */}
// </div> */}

// export function ModalPost({ postData, id, children }) {
//     const post = postData;
//     console.log(post.text);

//     // const postTextBits = !!post.text.length ? post.text.split('→') : [...postData.text];
//     // console.log(postTextBits);

//     return (
//         <>
//             <div className={s.modal_post}>
//                 <div className={cn(s.modal_post_containers, s.modal_post_image)}>
//                     <img src={post?.image} alt="бабуча" />
//                 </div>

//                 <div className={cn(s.modal_post_containers, s.modal_post_vertical)}>

//                     <div className={s.post_author_section} id={s.modal_post_author}>
//                         <div className={s.post_author_inf}>
//                             <span className={s.author_name}>{post?.author.name}</span>
//                             <span className={s.author_about}>{post?.author.about}</span>
//                         </div>
//                         <Avatar src={post?.author?.avatar} component="span" className={s.post_author_ava}>
//                             R
//                         </Avatar>
//                     </div>

//                     <div className={s.comments}>↓↓↓ Здесь могли бы быть ваши комментарии↓↓↓</div>
//                 </div>

//                 <div className={cn(s.modal_post_containers, s.text)}>
//                     <h2 className={s.title}>{post?.title}</h2>
//                     {/* {postTextBits.map((textbit, i) => <div key={i}>{textbit}
//                     </div>)} */}
//                     <div>{!!post.text && post.text}</div>
//                 </div>
//             </div>
//         </>
//     );
// }