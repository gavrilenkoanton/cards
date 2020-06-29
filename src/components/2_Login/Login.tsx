import React, {useEffect, useState} from 'react';
import {Field, reduxForm} from "redux-form";
import styles from './Login.module.scss';

const LoginForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field placeholder="Name" component={"input"} name={"user_name"}/>
            <Field placeholder="password"  component={"input"} name={"password"}/>
            <Field component={"input"} type={"checkbox"} name={"rememberMe"}/>
            <button>send</button>
        </form>
    )
}

const LoginReduxForm = reduxForm({form:'loginForm'})(LoginForm)


function Login (props: any) {
    // const [data, setData] = useState<any>({})
    //
    // useEffect(() => {
    //     if(data) {
    //         callbackTest(data);
    //     }
    // }, [])

    let callbackTest = (data:any) => {
        console.log(data)
    }

    const onSubmit = (formData: any) => {
        //props.LoginThunk(formData.email, formData.password)
        callbackTest(formData)

    }



    return (
        <div className={styles.wrapper}>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
}

export default Login;