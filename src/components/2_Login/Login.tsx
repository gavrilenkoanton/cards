import React, {ChangeEvent, useCallback, useState} from 'react';
import {useDispatch} from "react-redux";
import {LoginThunk} from '../../BLL/login-reducer';
import styles from '../common/button/Button.module.scss'
import Input from "../common/input/Input";
import Button from "../common/button/Button";



const Login = () => {

    let [email, setEmail] = useState<string>('');
    let [password, setPassword] = useState<string>('');
    let [rememberMe, setRememberMe] = useState<boolean>(false);

    const setEmailCallback = useCallback(
        (e: ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value),
        [setEmail]
    );

    const setPasswordCallback = useCallback(
        (e: ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value),
        [setPassword]
    );

    const setRememberMeCallback = useCallback(
        ()=>setRememberMe(true),
        [setRememberMe]
    );

    const dispatch = useDispatch();
    const loginCallback = useCallback(()=>
            dispatch(LoginThunk(email, password, rememberMe)),
        [email, password, rememberMe, dispatch]
    );

    return (
        <div className={styles.wrapper}>
            <div>
                <Input placeholder={'Email'} value={email} onChange={setEmailCallback}/>
            </div>
            <div>
                <Input placeholder={'password'} type={"password"} value={password} onChange={setPasswordCallback}/>
            </div>
            <div>
                <Input type={"checkbox"} onChange={setRememberMeCallback}/>
            </div>
            <div>
                <Button description={'Login'} onClick={loginCallback}/>
            </div>
        </div>
    );
}


export default Login;