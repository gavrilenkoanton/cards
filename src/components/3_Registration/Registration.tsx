import React from 'react';
import styles from './Registration.module.scss';
import Input from "../common/input/Input";


function Registration (props: any) {

    return (
        <div className={styles.wrapper}>
            <Input />
            <Input/>
            <button></button>
        </div>
    );
}

export default Registration;