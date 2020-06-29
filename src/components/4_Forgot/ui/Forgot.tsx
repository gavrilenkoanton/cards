import React, {useCallback, useEffect, useState} from 'react';
import styles from './Forgot.module.scss';
import Input from "../../common/input/Input";
import Button from "../../common/button/Button";
import {NavLink, Redirect} from "react-router-dom";
import {forgotPassTH} from "../bll/forgot-reducer";
import {useDispatch, useSelector} from "react-redux";


function Forgot(props: any) {

    const [email, setEmail] = useState<string>('');
    const handleClickSendButton = async () => {

        await dispatch(forgotPassTH(email));
    }

    const dispatch = useDispatch();
    const redirect = () => {
        return <Redirect to={"/login"}/>
    }

    const {emailSended} = useSelector((store: any) => store.forgot);
    useEffect(() => {
        if (emailSended === true) {
            console.log('OKEEE')
            alert("соообщеаю")
            redirect()
        } else if (emailSended === false) {
            console.log("zopa")
        }
        return undefined
    }, [emailSended]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.input}>
                <Input placeholder={'Your email'} value={email} onChange={(e: any) => {
                    setEmail(e.target.value)
                }}/>
                <Button description={"Send"} onClick={handleClickSendButton}/>
            </div>
            <div>
                <NavLink to="/login" className={styles.singIn}>Sing In</NavLink>
            </div>
        </div>
    );
}

export default Forgot;