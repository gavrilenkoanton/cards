import React, {useEffect} from 'react';
import styles from './Profile.module.scss';
import Button from "../common/button/Button";
import {useDispatch, useSelector} from "react-redux";
import {storeType} from "../../BLL/redux-store";
import {authThunk, setTokenAC, setSuccessAC} from "../../BLL/login-reducer";
import {Redirect} from "react-router-dom";
import {ReactComponent as Avatar} from './../img/user_gray.svg'


function Profile() {

    const {isThereToken, success, email, name} = useSelector((store: storeType) => store.login);

    let dispatch = useDispatch();
    useEffect(() => {
        if (document.cookie && !isThereToken)
            dispatch(authThunk());
    }, [dispatch, isThereToken]);

    const deleteToken = () => {
        document.cookie = `${document.cookie}; max-age=-1`;
        dispatch(setTokenAC(false));
        dispatch(setSuccessAC(false))
    };

    if (!isThereToken && !document.cookie && !success)
        return <Redirect to='/login'/>;

    return (
        <div className={styles.wrapper}>
            Profile
            <div className={styles.introduction}>
                <div>
                    <div><Avatar className={styles.avatar}/></div>
                    <div>{name}</div>
                    <div>{email}</div>
                    <Button description={'Log Out'} color={'red'} onClick={deleteToken}/>
                </div>
            </div>
        </div>
    );
}

export default Profile;