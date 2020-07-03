import React, {useEffect} from 'react';
import styles from './Profile.module.scss';
import Button from "../common/button/Button";
import Input from "../common/input/Input";
import {useDispatch, useSelector} from "react-redux";
import {storeType} from "../../BLL/redux-store";
import {authThunk, setTokenAC, setSuccessAC} from "../../BLL/login-reducer";
import {Redirect} from "react-router-dom";


function Profile() {

    const {isThereToken, success} = useSelector((store: storeType) => store.login);

    let dispatch = useDispatch();
    useEffect(() => {
        if(document.cookie && !isThereToken)
            dispatch(authThunk());
    }, [dispatch, isThereToken]);

    const deleteToken = () => {
        document.cookie = `${document.cookie}; max-age=-1`;
        dispatch(setTokenAC(false));
        dispatch(setSuccessAC(false))
    };

    if(!isThereToken && !document.cookie && !success)
        return <Redirect to='/login'/>;

    return (
        <div className={styles.wrapper}>
            Profile
            <div className={styles.introduction}>
                <Input/>
                <div>
                    <Button description={'Blue'} color={'blue'}/>
                    <Button description={'Log Out'} color={'red'} onClick={deleteToken}/>
                </div>
            </div>
        </div>
    );
}

export default Profile;