import React, {useEffect, useState} from 'react';
import {Field, reduxForm} from "redux-form";
import {connect, useDispatch, useSelector} from "react-redux";
import {LoginThunk, LogOutThunk} from '../../BLL/login-reducer'

const LoginForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field placeholder="email" component={"input"} name={"email"}/>
            <Field placeholder="password"  component={"input"} name={"password"}/>
            <Field component={"input"} type={"checkbox"} name={"rememberMe"}/>
            <button>send</button>
        </form>
    )
}

const LoginReduxForm = reduxForm({form:'loginForm'})(LoginForm)


function Login (props: any) {

    const LoginReduxForm = reduxForm({form:'loginForm'})(LoginForm)

    const dispatch = useDispatch()
    const isAuth = useSelector( (state:any)=> state.login.email )
    const select = useSelector( (state:any)=> state.login.email )

    const onSubmit = (formData: any) => {
        debugger
        dispatch(LoginThunk(formData.email, formData.password, formData.rememberMe))
    }

    const logOut = () => {
        dispatch(LogOutThunk())

    }

    return (
        <div className='{styles.wrapper}'>
            <LoginReduxForm onSubmit={onSubmit}/>
            <button onClick={logOut}>Logout</button>
        </div>
    );
}


export default Login;