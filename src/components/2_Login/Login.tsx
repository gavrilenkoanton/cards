import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {authThunk, LoginThunk} from '../../BLL/login-reducer';
import styles from './Login.module.scss'
import Input from "../common/input/Input";
import Button from "../common/button/Button";
import {storeType} from "../../BLL/redux-store";
import {NavLink, Redirect} from "react-router-dom";
import loader from "../common/loader/preloader.gif";


const Login = () => {

    let [email, setEmail] = useState<string>('');
    let [password, setPassword] = useState<string>('');
    let [rememberMe, setRememberMe] = useState<boolean>(false);
    const {isLoading} = useSelector((store: any) => store.login);
    const {showError} = useSelector((store: any) => store.login);

    const setEmailCallback = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
        [setEmail]
    );

    const setPasswordCallback = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
        [setPassword]
    );

    const setRememberMeCallback = useCallback(
        () => setRememberMe(true),
        [setRememberMe]
    );

    let dispatch = useDispatch();
    const loginCallback = useCallback(() => {
            dispatch(LoginThunk(email, password, rememberMe))
        },
        [email, password, rememberMe, dispatch]
    );

    const {success, error, isThereToken} = useSelector((store: storeType) => store.login);

    useEffect(() => {
        if (!isThereToken && document.cookie) {
            dispatch(authThunk());
        }
    }, [dispatch, isThereToken]);


    if ((success && error === '') || (isThereToken && document.cookie)) {
        return <Redirect to='/tables'/>;
    }



    return (
        <div className={styles.wrapper}>
            <Input placeholder={'Email'} value={email} onChange={setEmailCallback} type={"email"}/>
            <Input placeholder={'password'} type={"password"} value={password} onChange={setPasswordCallback}/>
            <Input type={"checkbox"} onChange={setRememberMeCallback}/>
            <Button description={'Login'} onClick={loginCallback} disabled={isLoading}/>
            {isLoading && <div><img src={loader} className={styles.loader} alt="loading"/></div>}
            {showError && <div className={styles.message}>{error}</div>}
            <NavLink to="/registration" >Registration</NavLink>
            <NavLink to="/forgot" >Forgot</NavLink>
        </div>
    );
};


export default Login;