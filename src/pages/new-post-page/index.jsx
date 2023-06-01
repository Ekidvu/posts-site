import cn from "classnames";
import s from "./styles.module.css"
import { Container } from "@mui/material";
import { useState } from "react";

export const NewPostPage = ({ id }) => {
    const [image, setImage] = useState(null);



    return (
        <>
            <main className={cn("cards_body", s.new_post_body)}>
                <form className={s.new_post_container}>
                    <section className={s.edit_image}>
                        <div className={s.image_div}>
                            <img src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/d7c83e95940601.5ea2f010b91c8.jpg" alt="" />
                        </div>
                        <label htmlFor="imageSrc" className={s.img_label}>
                            <a className={s.a_for_pics} href="https://yandex.ru/images/search?from=tabbar&text=смешные%20картинки%20с%20почтальоном" target="blank" rel="noopener noreferrer">Ссылка для изображения</a>
                        </label>
                        <span className={s.for_inp_n_btn}>
                            <input className={s.image_src_input} id="imageSrc" type="url" placeholder="https://_{... какой-то картинък ...}_.com" />
                            <span className={s.span_for_btn} tabIndex="0"><button className={cn(s.a_for_pics, s.inp_btn)} >Загрузить</button></span>
                        </span>

                    </section>

                    <section className={s.service}>
                        <div className={s.author}></div>

                        <div className={s.title_n_tags}>
                            <div className={s.title}>
                                <h3 className={s.title_font}>Заголовок поста</h3>
                                <h5>Задайте посту загаловок.</h5>
                                <p>Тут может быть намек на содержимое, подытожывающая мысль, название, или просто шутка.</p>
                                <span className="">
                                    <input type="text" placeholder="Введите заголовок" />
                                </span>
                                
                            </div>
                            <div className={s.tags}>
                                <h3 className={s.title_font}>теги</h3>
                                <p>Напишите теги через пробел (без значка #)</p>
                                <span className="">
                                    <input type="text" placeholder="Введите теги" />
                                </span>
                            </div>
                        </div>
                    </section>

                    <section className={s.text}>
                        <p className={s.text_label}tabIndex="1"><button className={s.a_for_pics} type="submit">Напишите что-нибудь в посте</button></p>
                        <span className={s.text_span}>
                            <textarea type='text'
                                name='text'
                                placeholder='Ваша замечательная речь или забавный случай. То, что вам хотелось рассказать. Излейте душу, так сказать.' rows={7}></textarea>
                        </span>
                    </section>
                </form>
            </main>
        </>
    );
}

