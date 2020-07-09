import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import styles from './Tables.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {
    addNewDeckTH,
    getTablesTH,
    paginatorTH,
    searchNameTH,
    setSearchedName,
    ascendingSortHandlerSortByNameTH,
    descendingSortByNameTH
} from "../bll/tables-reducer";
import PackOfCards from "../../common/packOfCards/PackOfCards";
import Input from "../../common/input/Input";
import Button from "../../common/button/Button";
import loader from "../../common/loader/preloader.gif";
import {Redirect} from "react-router-dom";
import Paginator from "./Paginator";


function Tables() {
    const dispatch = useDispatch();
    // const {tables, loadingTables} = useSelector((store: any) => store.tables);
    const {tables, searchedName, pageSize, currentPage,loadingTables} = useSelector((store: any) => store.tables);
    const [newDeckName, setNewDeckName] = useState<string>('');

    const setSearchedNameCallback = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => dispatch(setSearchedName(e.target.value)),
        [dispatch]
    );

    // const handleClickAddNewDeck = () => {
    const handleClickSearchDeck = () => {
        dispatch(searchNameTH(searchedName));
    };

    const handleClickAddNewDeck = () => {
        dispatch(addNewDeckTH(newDeckName));
        setNewDeckName('')
    }

    useEffect(() => {
        dispatch(getTablesTH());
    }, [dispatch]);


    const getTables = tables.map((i: any) => {
        return <PackOfCards name={i.name} id={i._id}/>
    })


    const getState = () => {
        console.log(tables)
    }

    if(!document.cookie)
        return <Redirect to='/login'/>;
    const yoyo = () => {
        dispatch(paginatorTH(currentPage, pageSize))
    };

    const ascendingSortHandler = () => {
        dispatch(ascendingSortHandlerSortByNameTH(pageSize, currentPage))
    };

    const descendingSortByNameHandler = () => {
        dispatch(descendingSortByNameTH(pageSize, currentPage))
    };

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

            tables
            {/*<button onClick={getState}>получить стор</button>*/}
            {/*<Input*/}
            {/*    placeholder={"New deck"}*/}
            {/*    onChange={(e: any) => {*/}
            {/*        setNewDeckName(e.target.value)*/}
            {/*    }}*/}
            {/*    value={newDeckName}*/}
            {/*/>*/}
            {/*<Button description={"Add"} onClick={handleClickAddNewDeck}/>*/}
            {/*<Input plcaceholder='Search by name' onChange={setSearchedNameCallback} value={searchedName}/>*/}
            {/*<Button description='Search' onClick={handleClickSearchDeck}/>*/}
            {/*<div className={styles.tables}>*/}
            {/*    {getTables}*/}
            {/*</div>*/}
            <Paginator totalPacks={78} pageSize={pageSize} currentPage={currentPage}/>
            <button onClick={yoyo}>pag</button>
            <button  onClick={descendingSortByNameHandler}>Sort by name -1</button>
            <button onClick={ascendingSortHandler}>Sort by name 1</button>
        </div>
    );
}

export default Tables;