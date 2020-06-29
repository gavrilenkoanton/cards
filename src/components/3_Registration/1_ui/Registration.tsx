import React, {ChangeEvent, useCallback, useState} from 'react';
import styles from './Registration.module.scss';
import Input from "../../common/input/Input";
import Button from "../../common/button/Button";
import {registerThunk} from "../2_bll/registerReducer";
import {useDispatch, useSelector} from "react-redux";
import {storeType} from "../../../BLL/redux-store";
import {Redirect} from "react-router-dom";


function Registration (props: any) {

    let [email, setEmail] = useState<string>('');
    let [password, setPassword] = useState<string>('');
    let [confirmPassword, setConfirmPassword] = useState<string>('');

    const setEmailCallback = useCallback(
        (e: ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value),
        [email]
    );

    const setPasswordCallback = useCallback(
        (e: ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value),
        [password]
    );

    const setConfirmPasswordCallback = useCallback(
        (e: ChangeEvent<HTMLInputElement>)=>setConfirmPassword(e.target.value),
        [confirmPassword]
    );

    const dispatch = useDispatch();
    const registerCallback = useCallback(()=>
        dispatch(registerThunk(email, password, confirmPassword)),
        [email, password, confirmPassword, dispatch]
    );

    const {success, error} = useSelector((store: storeType) => store.register);

    if(success && error === '')
        return <Redirect to='/login'/>;

    return (
        <div className={styles.wrapper}>
            <Input placeholder={'Email'} value={email} onChange={setEmailCallback}/>
            <Input placeholder={'password'} value={password} onChange={setPasswordCallback}/>
            <Input placeholder={'confirm password'} value={confirmPassword}
                   onChange={setConfirmPasswordCallback}/>
            <Button description={'Register'} onClick={registerCallback}/>
        </div>
    );
}


export default Registration;