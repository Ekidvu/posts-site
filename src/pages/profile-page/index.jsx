import { useContext } from 'react';
import s from './styles.module.css'
import { UserContext } from '../../contexts/current-user-context';
import { Avatar } from '@mui/material';
import cn from 'classnames';

export const ProfilePage = ({ id }) => {

    const { currentUser } = useContext(UserContext);

    return (
        <>
            <main className={cn(s.new_post_body)}>
                <div className={cn(s.info_author_popup)}>
                    <div className={s.popup_info} >
                            <div className={s.popup_author_inf}>
                            <span>
                                    <button className={s.popup_author_name} type="button">{currentUser?.name}</button>
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
                    

                </div>

                <form className={s.new_post_container}>
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
                                className={s.image_src_input}

                                type="url"
                                placeholder="https://_{... какой-то картинък ...}_.com"
                                name="image"
                                id="imageSrc" />
                            <button className={cn(s.a_for_pics, s.inp_btn, s.span_for_btn)} type="button" >Смотреть</button>
                        </span>

                    </section>

                    <section className={s.service}>
                        <div className={s.author} id={s.author}>
                            <div className={s.author_inf}>
                                <span>
                                    <button className={s.author_name} type="button">{currentUser?.name}</button>
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
                                        type="text"
                                        placeholder="Введите заголовок"
                                        name="title" />
                                </span>


                            </div>
                            <div className={s.tags}>
                                <h3 className={s.title_font}>теги</h3>
                                <p>Напишите теги через пробел (без значка #)</p>
                                <span className={s.tags_input_span}>
                                    <input
                                        type="text"
                                        placeholder="Введите теги"
                                        name="tags" />
                                </span>
                            </div>
                        </div>
                    </section>

                    <section className={s.text}>
                        <button className={cn(s.text_label, s.a_for_pics, s.submit_btn)} type="submit">Создать пост</button>
                        <span className={s.text_span}>
                            <textarea
                                type='text'
                                name='text'
                                placeholder='Ваша замечательная речь или забавный случай. То, что вам хотелось рассказать. Излейте душу, так сказать.'
                                rows={7}
                                tabIndex="10">
                            </textarea>
                        </span>
                    </section>
                </form>
            </main>
        </>
    );
}