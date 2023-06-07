import { useContext, useState } from 'react';
import s from './styles.module.css'
import { UserContext } from '../../contexts/current-user-context';
import { Avatar } from '@mui/material';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import api from '../../components/utils/api';
import UpdateStateButton from '../../components/btn-snackbar';

export const ProfilePage = ({ id }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ mode: 'onBlur' })
    const [props, setProps] = useState({textAlert: '', severity: ''})
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const alertGood = document.querySelector("#updateAlertButton");

    function cbSubmitForm(info) {
        const userInfo = {};
        const avatar = info?.avatar;
        userInfo.name = !!info.name ? info.name : currentUser.name;
        userInfo.about = !!info.about ? info.about : currentUser.about;
        
        if (!!info.name || !!info.about) {api.updateUserInfo(userInfo)
            .then(updateUser => setCurrentUser(updateUser))
            .then(() => {
                setProps({textAlert: "Данные успешно обновлены", severity: "success"})
                alertGood.click()
            })
            .catch(err => {
                setProps({textAlert: "Что-то пошло не так", severity: "error"})
                alertGood.click()
                console.log(err)
            }) 
        }  
        if (!!avatar) {api.updateUserAvatar(avatar)
            .then(updateUser => setCurrentUser(updateUser))
            .then(() => {
                setProps({textAlert: "Аватар обновлен", severity: "success"})
                alertGood.click()
            })
            .catch(err => {
                setProps({textAlert: "Что-то не так с аватаром", severity: "error"})
                alertGood.click()
                console.log(err)
            }) 
        }
        reset()
    }

    const handlePasteButton = (e) => {
        navigator.clipboard.readText()
            .then(dataText => {
                e.target.control.value = dataText;
            })
    }

    const showAvaInBox = (e) => {
        const imgLink = e.target.previousSibling.value;
        const imgDiv = e.target.parentElement.parentElement.querySelector('img');
        imgDiv.src = imgLink;
    }

    return (
        <>
            <main className={cn(s.profile_container)}>
                <form className={s.profile_author_info_section} onSubmit={handleSubmit(cbSubmitForm)}>
                    <section className={s.author_avatar}>
                        <div className={s.ava_div}>
                            <Avatar src={currentUser?.avatar} component="span" className={cn(s.profile_author_ava, 'profile_page_circle')} sx={{ height: '30rem', width: '30rem' }}>
                                R
                            </Avatar>
                            <label htmlFor="imageSrc" className={cn(s.img_label, s.a_for_pics)} onClick={handlePasteButton}>
                                Ссылка для изображения
                            </label>
                        </div>
                        <div className={s.img_help_btns} form='imageSrc'>

                        </div>

                        <span className={s.for_inp_n_btn}>
                            <input
                                {...register('avatar')}
                                className={s.image_src_input}
                                type="url"
                                placeholder="https://_{... какой-то картинък ...}_.com"
                                name="avatar"
                                id="imageSrc" />
                            <button className={cn(s.a_for_pics, s.inp_btn, s.span_for_btn)} type="button" onClick={showAvaInBox}>Смотреть</button>
                        </span>

                    </section>

                    <section className={s.author_info}>
                        <div className={s.author_name}>
                            <h3 className={s.title_font}>ФИО</h3>
                            <p>{currentUser.name}</p>
                            <input
                                {...register('name')}
                                type="text"
                                placeholder="Изменить имя"
                                name="name" />
                        </div>

                        <div className={s.author_name}>
                            <h3 className={s.title_font}>Описание</h3>
                            <p>{currentUser.about}</p>
                            <input
                                {...register('about')}
                                type="text"
                                placeholder="Изменить инфо об авторе"
                                name="about" />
                        </div>

                        <div className={s.title_n_tags}>
                            <div className={s.title}>
                                <h3 className={s.title_font}>Дополнительное инфо</h3>
                                <span className={s.title_input_span}>
                                   <li>User ID: <p>{currentUser._id}</p></li>
                                   <li>User email: <p>{currentUser.email}</p></li>
                                   <li>User group: <p>{currentUser.group}</p></li>
                                </span>
                            </div>
                        </div>
                    </section>

                    <section className={s.text} id='forAlert'>
                        <button className={cn(s.text_label, s.a_for_pics, s.submit_btn)} type="submit">Изменить данные</button>
                        <UpdateStateButton textAlert={props.textAlert} severity={props.severity}/>
                    </section>
                    
                </form>
            </main>
        </>
    );
}

// https://dspncdn.com/a1/media/692x/83/f8/16/83f816bd96cf80d859cf9f566256c31c.jpg


// const alertGood = document.querySelector('#forAlert div');
// alertGood.textAlert = "Данные успешно обновлены";
// alertGood.severity = "success";
// alertGood.querySelector("#updateAlertButton").click()