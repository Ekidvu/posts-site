import cn from "classnames";
import s from "./styles.module.css"
import { Avatar, Container } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/current-user-context";
import { useForm } from 'react-hook-form'
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import api from "../../components/utils/api";
import { PostsContext } from "../../contexts/post-context";
import UpdateStateButton from "../../components/btn-snackbar";

export const NewPostPage = ({ id }) => {
    const [popup, setPopup] = useState(false);
    const [textVisible, setTextVisible] = useState(false);
    const { currentUser } = useContext(UserContext);
    const { setPosts } = useContext(PostsContext);
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ mode: 'onBlur' })
    const [props, setProps] = useState({textAlert: '', severity: ''})
    const alertGood = document.querySelector("#updateAlertButton");

    const cbSubmitForm = (post) => {
        post.tags = post.tags.split(' ').map(e=> e = "#" + e);
        api.createPost(post)
            .then((createdPost) => {
                console.log(createdPost);
                setPosts(posts => [createdPost, ...posts])
            })
            .then(() => {
                setProps({textAlert: "Пост успешно добавлен", severity: "success"})
                alertGood.click()
            })
            .catch(err => {
                setProps({textAlert: "Что-то не так с постом", severity: "error"})
                alertGood.click()
                console.log(err)
            }) 
        reset();
    }

    const handleEnterKey = (e) => {
        if (e.key === "Enter") e.target.value = e.target.value.slice(0, e.target.value.length - 1) + " | ";
    }

    const handlePasteButton = (e) => {
        navigator.clipboard.readText()
            .then(dataText => {
                e.target.control.value = dataText;
            })
    }
    const showImageInForm = (e) => {
        const imgLink = e.target.previousSibling.value;
        const imgDiv = e.target.parentElement.parentElement.querySelector('#image');
        imgDiv.src = imgLink;
    }

    const changeStatePopup = () => {
        setPopup(!popup);
    }

    const titleRegister = register('title', {
        required: {
            value: true,
            message: 'Друже, заголовок поставь.',
        },
    });
    const tagsRegister = register('tags', {
        pattern: {
            value: /[^#]$/,
            message: 'Ну просил же без значка #'
        },
    });
    const textRegister = register('text', {
        required: {
            value: true,
            message: 'Для осуществления поста нужно тело поста. Неможножечко текст потерялся.',
        },
        pattern: {
            value: /[^(\n)]$/,
            message: 'База не позволяет вводить перенос строки. Если хотите, чтобы строчка была перенесена, поставьте  вертикальный разделитель («|») в месте, где хотите перенос строки.'
        }
    });

    useEffect(() => {
        setTimeout(() => { setTextVisible(popup) }, 950)
    }, [popup])

    return (
        <>
            <main className={cn(s.new_post_body)}>
                <div className={cn(s.info_author_popup, {
                    [s.info_author_popup_active]: popup,
                    [s.info_author_popup_passive]: !popup,
                })}>
                    {popup && textVisible && <div className={s.popup_info} >
                            <div className={s.popup_author_inf}>
                                <span>
                                    <button className={s.popup_author_name} onClick={changeStatePopup} type="button">{currentUser?.name}</button>
                                </span>
                                <span className={s.popup_author_about}>{currentUser?.about}</span>
                                <div className={s.popup_author_ad_inf}>
                                    <div className={s.popup_id}>userID:&nbsp;{currentUser?._id}</div>
                                <div className={s.popup_email}>user email:&nbsp;{currentUser?.email}</div>
                                <div className={s.popup_group}>user group:&nbsp;{currentUser?.group}</div>
                                </div>
                                
                            </div>
                            <div className={s.ava_div}>
                                <Avatar src={currentUser?.avatar} component="span" className={s.popup_author_ava}>
                                R
                            </Avatar>
                            </div>
                            
                        </div>
                    }

                </div>

                <form className={s.new_post_container} onSubmit={handleSubmit(cbSubmitForm)}>
                    <section className={s.edit_image}>
                        <div className={s.image_div}>
                            <img src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/d7c83e95940601.5ea2f010b91c8.jpg" alt="" id='image' />
                        </div>
                        <div className={s.img_help_btns} form='imageSrc'>
                            <label htmlFor="imageSrc" className={cn(s.img_label, s.a_for_pics)} onClick={handlePasteButton}>
                                Ссылка для изображения
                            </label>
                            <a className={cn(s.a_for_pics, s.img_label)} href="https://yandex.ru/images/search?from=tabbar&text=смешные%20картинки%20с%20почтальоном" target="blank" rel="noopener noreferrer">примеры</a>
                        </div>

                        <span className={s.for_inp_n_btn}>
                            <input
                                {...register('image')}
                                className={s.image_src_input}
                                type="url"
                                placeholder="https://_{... какой-то картинък ...}_.com"
                                name="image"
                                id="imageSrc" />
                            <button className={cn(s.a_for_pics, s.inp_btn, s.span_for_btn)} type="button" onClick={showImageInForm} >Смотреть</button>
                        </span>

                    </section>

                    <section className={s.service}>
                        <div className={s.author} id={s.author}>
                            <div className={s.author_inf}>
                                <span>
                                    <button className={s.author_name} onClick={changeStatePopup} type="button">{currentUser?.name}</button>
                                </span>
                                <span className={s.author_about}>{currentUser?.about}</span>
                            </div>
                            <Avatar src={currentUser?.avatar} component="span" className={s.author_ava}>
                                R
                            </Avatar>
                        </div>

                        <div className={s.title_n_tags}>
                            <div className={s.title}>
                                <h3 className={s.title_font}>Заголовок поста</h3>
                                <h5>Задайте посту загаловок.</h5>
                                <p>Тут может быть намек на содержимое, подытожывающая мысль, название, или просто шутка.</p>
                                <span className={s.title_input_span}>
                                    <input
                                        {...titleRegister}
                                        type="text"
                                        placeholder="Введите заголовок"
                                        name="title" />
                                    {errors.title && <div className={s.error_box}><p className={s.errorMessage}>{errors.title.message}</p></div>}
                                </span>


                            </div>
                            <div className={s.tags}>
                                <h3 className={s.title_font}>теги</h3>
                                <p>Напишите теги через пробел (без значка #)</p>
                                <span className={s.tags_input_span}>
                                    <input
                                        {...tagsRegister}
                                        type="text"
                                        placeholder="Введите теги"
                                        name="tags" />
                                    {errors.tags && <div className={s.error_box}><p className={s.errorMessage}>{errors.tags.message}</p></div>}
                                </span>
                            </div>
                        </div>
                    </section>

                    <section className={s.text}>
                        <button className={cn(s.text_label, s.a_for_pics, s.submit_btn)} type="submit">Создать пост</button>
                        <span className={s.text_span}>
                            <textarea
                                {...textRegister}
                                type='text'
                                name='text'
                                placeholder='Ваша замечательная речь или забавный случай. То, что вам хотелось рассказать. Излейте душу, так сказать.'
                                rows={7} onKeyUp={handleEnterKey}
                                tabIndex="10">
                            </textarea>
                            {errors.text && <div className={s.error_box}><p className={s.errorMessage}>{errors.text.message}</p></div>}
                        </span>
                        <UpdateStateButton textAlert={props.textAlert} severity={props.severity}/>
                    </section>
                </form>
            </main>
        </>
    );
}

