import React, {ChangeEvent, useCallback, useState} from 'react';
import styles from './Paginator.module.css'
import {setPaginatorCurrentPage, setPaginatorPageSize} from "../bll/tables-reducer";
import {useDispatch} from "react-redux";

type paginatorType = {
    totalPacks: number,
    pageSize: number,
    currentPage: number
}

const Paginator:React.FC<paginatorType> = ({totalPacks, pageSize, currentPage}) => {

    let dispatch = useDispatch();
    let pagesCount = Math.ceil(totalPacks / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let portionCount = Math.ceil(pagesCount / 5);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * 5 + 1;
    let rightPortionPageNumber = portionNumber * 5;

    const setPortionNumberCallback = useCallback((val)=>setPortionNumber(val),
        [setPortionNumber]);

    return (
        <div className=''>
           <div>
               {portionNumber > 1 &&
               <button onClick={()=>{setPortionNumberCallback(portionNumber - 1)} }>prev</button>}
               {portionNumber > 1 && <span  onClick={() => {
                   setPortionNumberCallback(1);
                   dispatch(setPaginatorCurrentPage(1))}}>1...</span>}
               {pages
                   .filter(p=> p>= leftPortionPageNumber && p<=rightPortionPageNumber)
                   .map(p => {
                    return <span key={p} className={currentPage === p ? styles.selectedPage : ''}
                                 onClick={() => {dispatch(setPaginatorCurrentPage(p))}}> {p} </span>
                })}
               {portionCount > portionNumber && <span  onClick={() => {
                   setPortionNumberCallback(portionCount);
                   dispatch(setPaginatorCurrentPage(pagesCount))}}>...{pagesCount}</span>}
               {portionCount > portionNumber &&
               <button onClick={()=>{setPortionNumberCallback(portionNumber + 1)} }>next</button>}
           </div>
            <div>
                <select defaultValue={4} onChange={(e:ChangeEvent<HTMLSelectElement>)=> {
                    dispatch(setPaginatorPageSize(+e.target.value))}}>
                    <option value={2}>2</option>
                    <option value={4}>4</option>
                    <option value={8}>8</option>
                </select>
            </div>
        </div>
    );
};

export default Paginator;