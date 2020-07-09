import React, {ChangeEvent, useState} from 'react';
import styles from './Paginator.module.css'
import {setPaginatorCurrentPage, setPaginatorPageSize} from "../bll/tables-reducer";
import {useDispatch} from "react-redux";


const Paginator = ({totalPacks, pageSize, currentPage}:any) => {

    let dispatch = useDispatch();
    let pagesCount = Math.ceil(totalPacks / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let portionCount = Math.ceil(pagesCount / pageSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * pageSize + 1;
    let rightPortionPageNumber = portionNumber * pageSize;


    return (
        <div className=''>
           <div>
               {portionNumber > 1 &&
               <button onClick={()=>{setPortionNumber(portionNumber - 1)} }>prev</button>}
               {pages
                   .filter(p=> p>= leftPortionPageNumber && p<=rightPortionPageNumber)
                   .map(p => {
                    return <span key={p} className={currentPage === p ? styles.selectedPage : ''}
                                 onClick={() => {dispatch(setPaginatorCurrentPage(p))}}> {p} </span>
                })}
               {portionCount > portionNumber &&
               <button onClick={()=>{setPortionNumber(portionNumber + 1)} }>next</button>}
           </div>
            <div>
                <select onChange={(e:ChangeEvent<HTMLSelectElement>)=> dispatch(setPaginatorPageSize(+e.target.value))}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={4} selected>4</option>
                    <option value={8}>8</option>
                </select>
            </div>
        </div>
    );
};

export default Paginator;