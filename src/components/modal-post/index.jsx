import cn from 'classnames';
import s from './styles.module.css';
import { Avatar, CardHeader, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export function ModalPost({ postData, id, children }) {
    const post = postData;
    const postTextBits = post?.text.split('→');

    return (
        <>
            <div className={s.modal_post}>
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

                    <div className={s.comments}>↓↓↓ Здесь могли бы быть ваши комментарии↓↓↓</div>
                </div>

                <div className={cn(s.modal_post_containers, s.text)}>
                    <h2 className={s.title}>{post?.title}</h2>
                    {postTextBits.map((textbit, i) => <div key={i}>{textbit}
                    </div>)}
                </div>
            </div>
        </>
    );
}
