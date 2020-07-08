import React, {useEffect, useState} from 'react';
import styles from './Tables.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {addNewDeckTH, getTablesTH} from "../bll/tables-reducer";
import PackOfCards from "../../common/packOfCards/PackOfCards";
import Input from "../../common/input/Input";
import Button from "../../common/button/Button";


function Tables() {
    const dispatch = useDispatch();
    const {tables} = useSelector((store: any) => store.tables);
    const [newDeckName, setNewDeckName] = useState<string>('');


    const handleClickAddNewDeck = ()=>{
        dispatch(addNewDeckTH(newDeckName));
    }

    useEffect(() => {
        dispatch(getTablesTH());
    }, [dispatch]);

    const getTables = tables.map((i: any)=>{
        return <PackOfCards name={i.name} id={i._id}/>
    } )

    const getState = ()=>{
        console.log(tables)
    }

    return (
        <div className={styles.wrapper}>
            tables
            <button onClick={getState}>получить стор</button>
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