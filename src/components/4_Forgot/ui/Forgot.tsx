import React, {useEffect, useState} from 'react';
import styles from './Forgot.module.scss';
import Input from "../../common/input/Input";
import Button from "../../common/button/Button";
import {NavLink, Redirect} from "react-router-dom";
import {forgotPassTH, showMessageToggle} from "../bll/forgot-reducer";
import {useDispatch, useSelector} from "react-redux";
import loader from "./../../common/loader/preloader.gif"


function Forgot() {

    const dispatch = useDispatch();

    const [email, setEmail] = useState<string>('');
    const [disabledButton, disabledButtonToggle] = useState<boolean>(false);
    const {emailSent} = useSelector((store: any) => store.forgot);
    const {isLoading} = useSelector((store: any) => store.forgot);
    const {showMessage} = useSelector((store: any) => store.forgot);
    const {message} = useSelector((store: any) => store.forgot);

    const handleClickSendButton = async () => {
        disabledButtonToggle(true)
        await dispatch(forgotPassTH(email));
    };

    const redirect = () => {
        return <Redirect to={"/login"}/>
    };

    useEffect(() => {
        if (emailSent === true) {
            disabledButtonToggle(false)
            dispatch(showMessageToggle(true, "Password recovery link sent to email"))
            setTimeout(() => {
                dispatch(showMessageToggle(false, ''))
            }, 3000)
            redirect()
        } else if (emailSent === false) {
            disabledButtonToggle(false)
            dispatch(showMessageToggle(true, "Error"))
            setTimeout(() => {
                dispatch(showMessageToggle(false, ''))
            }, 3000)
            console.log("не отправило")
        }
    }, [emailSent, dispatch]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.input}>
                <Input placeholder={'Your email'} value={email} onChange={(e: any) => {
                    setEmail(e.target.value)
                }}/>
                <Button description={"Send"} onClick={handleClickSendButton} disabled={disabledButton}/>
            </div>
            <div>
                <NavLink to="/login" className={styles.singIn}>Sing In</NavLink>
            </div>
            {showMessage && <div className={styles.message}>{message}</div>}
            {isLoading && <div><img src={loader} className={styles.loader} alt="loading"/></div>}
        </div>
    );
}

export default Forgot;