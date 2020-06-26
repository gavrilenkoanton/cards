import React from 'react';
import styles from './Button.module.scss'


function Button(props: any) {

    return (
        <>
            <button className={`${styles.button} ${props.color === 'red' ? styles.red : styles.blue} `}
            onClick={props.onClick} onChange={props.onChange} value={props.value}>
                {props.description}
            </button>
        </>
    );
}

export default Button;