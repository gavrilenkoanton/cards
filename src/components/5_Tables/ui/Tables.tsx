import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import styles from './Tables.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {
    addNewDeckTH,
    getTablesTH,
    searchNameTH,
    setSearchedName,
    ascendingSortHandlerSortByNameTH,
    descendingSortByNameTH
} from "../bll/tables-reducer";
import PackOfCards, {packsOfCardsType} from "../../common/packOfCards/PackOfCards";
import Input from "../../common/input/Input";
import Button from "../../common/button/Button";
import loader from "../../common/loader/preloader.gif";
import {Redirect} from "react-router-dom";
import Paginator from "./Paginator";
import {storeType} from "../../../BLL/redux-store";


function Tables() {
    const dispatch = useDispatch();
    const {tables, searchedName, pageSize, currentPage, loadingTables, totalPacks} = useSelector((store: any) => store.tables);
    const [newDeckName, setNewDeckName] = useState<string>('');

    const setSearchedNameCallback = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => dispatch(setSearchedName(e.target.value)),
        [dispatch]
    );

    const handleClickSearchDeck = (): void => {
        dispatch(searchNameTH(searchedName));
    };

    const handleClickAddNewDeck = (): void => {
        dispatch(addNewDeckTH(newDeckName));
        setNewDeckName('')
    };

    useEffect(() => {
        dispatch(getTablesTH(pageSize, currentPage));
    }, [dispatch, pageSize, currentPage]);


    const getTables = tables.map((i:any) => {
        return <PackOfCards name={i.name} id={i._id} key={i._id} loading={i.loading}/>
    });

    const ascendingSortHandler = (): void => {
        dispatch(ascendingSortHandlerSortByNameTH(pageSize, currentPage))
    };

    const descendingSortByNameHandler = (): void => {
        dispatch(descendingSortByNameTH(pageSize, currentPage))
    };

    if (!document.cookie)
        return <Redirect to='/login'/>;

    return (
        <div className={styles.wrapper}>
            Decks
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
            <Paginator totalPacks={totalPacks} pageSize={pageSize} currentPage={currentPage}/>
            <Input placeholder={'Search by name'} onChange={setSearchedNameCallback} value={searchedName}/>
            <Button description='Search' onClick={handleClickSearchDeck}/>
            <button onClick={descendingSortByNameHandler}>Sort by name -1</button>
            <button onClick={ascendingSortHandler}>Sort by name 1</button>
        </div>
    );
}

export default Tables;