import React, {ChangeEvent, useState} from 'react';
import styles from './PackOfCards.module.scss'
import {useDispatch} from "react-redux";
import {changeDeckNameTH, deleteDeckTH} from "../../5_Tables/bll/tables-reducer";
import Input from "../input/Input";
import loader from "../loader/preloader.gif";
import {NavLink} from "react-router-dom";

const PackOfCards = (props: any) => {
    const dispatch = useDispatch();
    const [showInput, showInputToggle] = useState<boolean>(false);
    const [newName, changeName] = useState<string>('');

    const deleteCardDeck = (id: string) => {
        console.log(id)
        dispatch(deleteDeckTH(id))
    }
    const onBlur = () => {
        showInputToggle(false)
        dispatch(changeDeckNameTH(newName, props.id))
    }

    return (

        <div className={styles.main}>
            {props.loading && <div><img src={loader} className={styles.loader} alt="loading"/></div>}
            <div className={styles.wrapper}>
                <NavLink to={`deck/${props.name}/${props.userId}/${props.id}`} className={styles.choose}/>
                <div className={styles.name}>
                    <NavLink to={`deck/${props.name}/${props.id}`} className={styles.chooseName}>{props.name}</NavLink>
                </div>

                <div className={styles.cardCount}>
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
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      changeName(e.target.value)
                  }}
                  onBlur={onBlur}
                />}
            </div>
        </div>

    );
}

export default PackOfCards;