import React, {ChangeEvent, useCallback, useState} from 'react';
import styles from './Registration.module.scss';
import Input from "../../common/input/Input";
import Button from "../../common/button/Button";
import {registerThunk} from "../2_bll/registerReducer";
import {useDispatch, useSelector} from "react-redux";
import {storeType} from "../../../BLL/redux-store";
import {Redirect} from "react-router-dom";


function Registration () {

    let [email, setEmail] = useState<string>('');
    let [password, setPassword] = useState<string>('');
    let [confirmPassword, setConfirmPassword] = useState<string>('');
    let validateMessage = '';
    let [invalidField, setInvalidField] = useState<boolean>(false);

    const setEmailCallback = useCallback(
        (e: ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value),
        [setEmail]
    );

    const setPasswordCallback = useCallback(
        (e: ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value),
        [setPassword]
    );

    const setConfirmPasswordCallback = useCallback(
        (e: ChangeEvent<HTMLInputElement>)=>setConfirmPassword(e.target.value),
        [setConfirmPassword]
    );


    const dispatch = useDispatch();
    const registerCallback = useCallback(()=>{
        if (validateMessage === '') {
            dispatch(registerThunk(email, password, confirmPassword))
        }},
        [email, password, confirmPassword, dispatch]
    );

    const {success, error, loading} = useSelector((store: storeType) => store.register);

    if(success && error === '')
        return <Redirect to='/login'/>;


    return (
        <div className={styles.wrapper}>
            <Input type='email' placeholder={'Email'} value={email} onChange={setEmailCallback}/>
            <Input type='password' placeholder={'password'} value={password} onChange={setPasswordCallback}/>
            <Input type='password' placeholder={'confirm password'} value={confirmPassword}
                   onChange={setConfirmPasswordCallback}/>
            <Button description={'Register'} onClick={registerCallback}/>
            {invalidField && <div className={styles.message}>{validateMessage}</div>}
            {error && <div className={styles.message}>{error}</div>}
            {loading && <div>Loading</div>}
        </div>
    );
}


export default Registration;