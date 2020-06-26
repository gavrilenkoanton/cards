import React, {useState} from 'react';
import styles from './Forgot.module.scss';
import Input from "../../common/input/Input";
import Button from "../../common/button/Button";
import {NavLink} from "react-router-dom";


function Forgot (props: any) {

    let [email, setEmail] = useState<string>('');

    return (
        <div className={styles.wrapper}>
            <div className={styles.input}>
                <Input placeholder={'Your email'} value={email} onChange={(e: any)=>{setEmail(e.target.value)}}/>
                <Button description={"Send"}/>
            </div>
            <div >
                <NavLink to="/login" className={styles.singIn}>Sing In</NavLink>
            </div>
        </div>
    );
}

export default Forgot;