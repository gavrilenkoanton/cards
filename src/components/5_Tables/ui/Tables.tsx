import React, {useEffect, useState} from 'react';
import styles from './Tables.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {addNewDeckTH, getTablesTH} from "../bll/tables-reducer";
import PackOfCards from "../../common/packOfCards/PackOfCards";
import Input from "../../common/input/Input";
import Button from "../../common/button/Button";
import loader from "../../common/loader/preloader.gif";
import {Redirect} from "react-router-dom";


function Tables() {
    const dispatch = useDispatch();
    const {tables, loadingTables} = useSelector((store: any) => store.tables);
    const [newDeckName, setNewDeckName] = useState<string>('');


    const handleClickAddNewDeck = () => {
        dispatch(addNewDeckTH(newDeckName));
        setNewDeckName('')
    }

    useEffect(() => {
        dispatch(getTablesTH());
    }, [dispatch]);

    const getTables = tables.map((i: any) => {
        return <PackOfCards name={i.name} id={i._id} key={i._id}/>
    })

    const getState = () => {
        console.log(tables)
    }

    if(!document.cookie)
        return <Redirect to='/login'/>;

    return (
        <div className={styles.wrapper}>
            Decks
            {/*<button onClick={getState}>получить стор</button>*/}
            {
                loadingTables ? <div><img src={loader} className={styles.loader} alt="loading"/></div> :
                    <>
                        <Input
                            placeholder={"New deck"}
                            onChange={(e: any) => {
                                setNewDeckName(e.target.value)
                            }}
                            value={newDeckName}
                        />
                        <Button description={"Add"} onClick={handleClickAddNewDeck}/>
                        <div className={styles.tables}>
                            {getTables}
                        </div>
                    </>
            }

        </div>
    );
}

export default Tables;