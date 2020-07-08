import React from 'react';
import styles from './PackOfCards.module.scss'
import {useDispatch} from "react-redux";
import {deleteDeckTH} from "../../5_Tables/bll/tables-reducer";


function PackOfCards(props: any) {

    const dispatch = useDispatch();
    const deleteCardDeck = (id: string)=>{
        console.log(id)
        dispatch(deleteDeckTH(id))
    }

    return (
        <>
            <div className={styles.wrapper}>
                {props.name}
                {/*{props.id}*/}

                <div className={styles.deleteButtonWrapper}>
                    <button className={styles.deleteButton} onClick={()=>{deleteCardDeck(props.id)}}>X</button>
                </div>

            </div>
            <div>

            </div>

        </>
    );
}

export default PackOfCards;