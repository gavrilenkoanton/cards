import React, {useState} from 'react';
import {Field, reduxForm} from "redux-form";
import styles from './Login.module.scss';

const LoginForm = (props: any) => {
    return (
        <form className={styles.formWrapper} onSubmit={props.handleSubmit}>
            <Field placeholder="Name" component={"input"} name={"user_name"}/>
            <Field placeholder="e-mail"  component={"input"} name={"user_email"}/>
            <button>send</button>
        </form>
    )
}

const LoginReduxForm = reduxForm({form:'contact'})(LoginForm)


function Login (props: any) {
    
    const [isHidden, setHidden] = useState<boolean>(true)

    return (
        <div className={styles.wrapper}>
            <LoginReduxForm/>
        </div>
    );
}

export default Login;