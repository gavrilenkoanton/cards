import React, {useState} from 'react';
import styles from './Registration.module.scss';
import Input from "../../common/input/Input";
import Button from "../../common/button/Button";
import store from "../../../BLL/redux-store";
import {connect, useSelector} from "react-redux";
import {setEmailAC} from "../2_bll/registerReducer";


function Registration (props: any) {

    let [email, setEmail] = useState<string>('');
    let [password, setPassword] = useState<string>('');
    let [confirmPassword, setConfirmPassword] = useState<string>('');


    return (
        <div className={styles.wrapper}>
            <Input placeholder={'Email'} value={email} onChange={(e: any)=>{setEmail(e.target.value)}}/>
            <Input placeholder={'password'} value={password} onChange={(e: any)=>{setPassword(e.target.value)}}/>
            <Input placeholder={'confirm password'} value={confirmPassword}
                   onChange={(e: any)=>{setConfirmPassword(e.target.value)}}/>
            <Button description={'Register'} />
        </div>
    );
}


export default Registration;