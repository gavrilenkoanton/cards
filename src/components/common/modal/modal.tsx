import React from 'react';
import styles from './modal.module.scss';


const Modal: React.FC = ({children}) => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.window}>
                {children}
            </div>
        </div>
    );
};


export default Modal;