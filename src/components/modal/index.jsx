import cn from 'classnames';
import s from './styles.module.css';
import { createPortal } from 'react-dom'
import { useEffect, useRef, useState } from 'react';


export function Modal({ children, isOpen, onClose }) {
    // const [modalActive, setModalActive] = useState(false);
    const refModal = useRef(null);
    // console.log(isOpen);

    useEffect(() => {
        if(isOpen) {
            setTimeout(() => {
            },300)
        }
    })

    const renderContent = () => {
        // if (!isOpen) return null;
        return (
            <div ref={refModal} className={cn(s.modal, { [s.modal_active]: isOpen })} onMouseDown={onClose}>
                <div className={cn(s.modal__content, {[s.modal__content.active]: isOpen})} onMouseDown={(e) => e.stopPropagation()}>
                    {children}
                </div>
            </div >
        );
    }

    return createPortal(renderContent(), document.getElementById('modal-root'));
}
