import React from 'react';
import styles from './Input.module.scss'


function Input(props: any) {

    return (
        <>
            <input
                type={props.type ? props.type : "text"}
                placeholder={props.placeholder} className={styles.input}
                onClick={props.onClick}
                onChange={props.onChange}
                value={props.value}
                onBlur={props.onBlur}
            />
        </>
    );
}

export default Input;