import React, {ChangeEvent, useCallback, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {LoginThunk} from '../../BLL/login-reducer';
import styles from '../common/button/Button.module.scss'
import {storeType} from "../../BLL/redux-store";
import {Redirect} from "react-router-dom";
import Input from "../common/input/Input";
import Button from "../common/button/Button";



const Login = (props: any) => {

    let [email, setEmail] = useState<string>('');
    let [password, setPassword] = useState<string>('');
    let [rememberMe, setrememberMe] = useState<boolean>(false);

    const setEmailCallback = useCallback(
        (e: ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value),
        [setEmail]
    );

    const setPasswordCallback = useCallback(
        (e: ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value),
        [setPassword]
    );

    const setrememberMeCallback = useCallback(
        (e: ChangeEvent<HTMLInputElement>)=>setrememberMe(true),
        [setrememberMe]
    );

    const dispatch = useDispatch();
    const loginCallback = useCallback(()=>
            dispatch(LoginThunk(email, password, rememberMe)),
        [email, password, rememberMe, dispatch]
    );

    const {success, error} = useSelector((store: storeType) => store.register);

    if(success && error === '')
        return <Redirect to='/profile'/>;

    return (
        <div className={styles.wrapper}>
            <div>
                <Input placeholder={'Email'} value={email} onChange={setEmailCallback}/>
            </div>
            <div>
                <Input placeholder={'password'} type={"password"} value={password} onChange={setPasswordCallback}/>
            </div>
            <div>
                <Input type={"checkbox"} onChange={setrememberMeCallback}/>
            </div>
            <div>
                <Button description={'Login'} onClick={loginCallback}/>
            </div>
        </div>
    );
}


export default Login;