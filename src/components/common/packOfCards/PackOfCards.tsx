import React, {useState} from 'react';
import styles from './PackOfCards.module.scss'
import {useDispatch} from "react-redux";
import {changeDeckNameTH, deleteDeckTH} from "../../5_Tables/bll/tables-reducer";
import Input from "../input/Input";
import loader from "../loader/preloader.gif";
import {log} from "util";
import {NavLink} from "react-router-dom";


function PackOfCards(props: any) {
    const dispatch = useDispatch();
    const [showInput, showInputToggle] = useState<boolean>(false);
    const [newName, changeName] = useState<string>('');

    const deleteCardDeck = (id: string) => {
        console.log(id)
        dispatch(deleteDeckTH(id))
    }
    const onBlur = () => {
        showInputToggle(false)
        const id: string = props.id
        dispatch(changeDeckNameTH(newName, id))
    }

    return (

        <div className={styles.main}>
            {props.loading && <div><img src={loader} className={styles.loader} alt="loading"/></div>}
            <div className={styles.wrapper}>
                <NavLink to={`deck/${props.id}`}>djfbdfhkd</NavLink>
                {/*<div onClick={()=>{props.handleClickOpenDeck(props.id)}}>Open</div>*/}
                {props.name}
                <div>
                    {props.cardsCount}
                </div>

                <div className={styles.changeButtonWrapper}>
                    <button className={styles.renameButton} onClick={() => {
                        showInputToggle(!showInput)
                    }}>Rename
                    </button>
                </div>
                <div className={styles.deleteButtonWrapper}>
                    <button className={styles.deleteButton} onClick={() => {
                        deleteCardDeck(props.id)
                    }}>X
                    </button>
                </div>
            </div>
            <div>
                {showInput && <Input
                  placeholder={"Enter new name"}
                  value={newName}
                  onChange={(e: any) => {
                      changeName(e.target.value)
                  }}
                  onBlur={onBlur}
                />}
            </div>
        </div>

    );
}

export default PackOfCards;