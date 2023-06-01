import cn from "classnames";
import s from "./styles.module.css"

export function Spinner({bg}) {

    return (
        <div className={cn({ 
            [s.spinner_body]: bg === "body",
            [s.spinner_modal]: bg === "modal"
            })}>
            <div className={cn({ 
            [s.spinner_container_body]: bg === "body",
            [s.spinner_container_modal]: bg === "modal"
            })}>
                <div className={s.pl}>
                    <div className={s.pl__dot}></div>
                    <div className={s.pl__dot}></div>
                    <div className={s.pl__dot}></div>
                    <div className={s.pl__dot}></div>
                    <div className={s.pl__dot}></div>
                    <div className={s.pl__dot}></div>
                    <div className={s.pl__dot}></div>
                    <div className={s.pl__dot}></div>
                    <div className={s.pl__dot}></div>
                    <div className={s.pl__dot}></div>
                    <div className={s.pl__dot}></div>
                    <div className={s.pl__dot}></div>
                    <div className={s.pl__text}>Loading…</div>
                </div>
            </div>
        </div>
    );
}

