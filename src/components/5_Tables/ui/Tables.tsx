import React, {useEffect, useState} from 'react';
import styles from './Tables.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {addNewDeckTH, getTablesTH} from "../bll/tables-reducer";
import PackOfCards from "../../common/packOfCards/PackOfCards";
import Input from "../../common/input/Input";
import Button from "../../common/button/Button";
import {authThunk} from "../../../BLL/login-reducer";


function Tables() {
    const dispatch = useDispatch();
    const {tables} = useSelector((store: any) => store.tables);
    const [newDeckName, setNewDeckName] = useState<string>('');

    const handleClickSendButton = () => {
        dispatch(getTablesTH());
    };
    const handleClickAddNewDeck = ()=>{
        dispatch(addNewDeckTH(newDeckName));
    }

    useEffect(() => {
        dispatch(getTablesTH());
    }, [dispatch]);

    const getTables = tables.map((i: any)=>{
        return <PackOfCards name={i.name}/>
    } )




    return (
        <div className={styles.wrapper}>
            tables
            {/*<button onClick={handleClickSendButton}>получить</button>*/}
            <Input
                placeholder={"New deck"}
                onChange={(e: any) => {setNewDeckName(e.target.value)}}
                value={newDeckName}
            />
            <Button description={"Add"} onClick={handleClickAddNewDeck}/>
            <div className={styles.tables}>

                {getTables}
            </div>
        </div>
    );
}

export default Tables;