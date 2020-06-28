import React, {useCallback, useState} from 'react';
import styles from './Registration.module.scss';
import Input from "../../common/input/Input";
import Button from "../../common/button/Button";
import {registerThunk} from "../2_bll/registerReducer";
import {useDispatch, useSelector} from "react-redux";
import {storeType} from "../../../BLL/redux-store";
import {Redirect} from "react-router-dom";
import Login from "../../2_Login/Login";


function Registration (props: any) {

    let [email, setEmail] = useState<string>('');
    let [password, setPassword] = useState<string>('');
    let [confirmPassword, setConfirmPassword] = useState<string>('');


    const dispatch = useDispatch();
    const registerCallback = useCallback(()=>
        dispatch(registerThunk(email, password, confirmPassword)),
        [email, password, confirmPassword, dispatch]
    );

    const {success, error} = useSelector((store: storeType) => store.register);

    debugger
    if(success && error === '')
        return <Redirect to='/login'/>;

    return (
        <div className={styles.wrapper}>
            <Input placeholder={'Email'} value={email} onChange={(e: any)=>{setEmail(e.target.value)}}/>
            <Input placeholder={'password'} value={password} onChange={(e: any)=>{setPassword(e.target.value)}}/>
            <Input placeholder={'confirm password'} value={confirmPassword}
                   onChange={(e: any)=>{setConfirmPassword(e.target.value)}}/>
            <Button description={'Register'} onClick={registerCallback}/>
        </div>
    );
}


export default Registration;