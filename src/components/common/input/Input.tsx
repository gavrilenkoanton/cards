import React from 'react';
import styles from './Input.module.scss'


function Input(props: any) {

    return (
        <>
            <input type="text" placeholder='Type something' className={styles.input} onClick={props.onClick}
                   onChange={props.onChange} value={props.value}/>
        </>
    );
}

export default Input;