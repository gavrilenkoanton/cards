import React, {useEffect, useState} from 'react';
import styles from './Deck.module.scss';
import {addNewCardTH, getCardsTH, showSettingsToggleAC} from "../bll/deck-reducer";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from 'react-router-dom';
import Button from "../../common/button/Button";
import Card from "../../7_Card/ui/Card";
import PackOfCards from "../../common/packOfCards/PackOfCards";


const Deck = (props: any) => {

    const params = useParams<{ id: string }>()
    const id = params.id
    const dispatch = useDispatch();
    const {cards, showSettings} = useSelector((store: any) => store.deck);

    useEffect(() => {
        dispatch(getCardsTH(id))

    }, [dispatch])

    const showSettingHandleClick = () => {
        dispatch(showSettingsToggleAC(!showSettings))
    }

    const setCards = cards.map((i: any) => {
        return <Card question={i.question} rating={i.rating} key={i._id} id={i._id}/>
    });

    const addNewCardHandleClick = ()=>{
        const question = "Question C"
        const answer = "Answer C"

        dispatch(addNewCardTH(question, answer, id))
    }

    const getState = ()=>{
        console.log(cards)
    }

    return (
        <div className={styles.wrapper}>
            id: {id}
            <div className={styles.optionsBar}>
                <div className={styles.learnButton}>
                    <Button description={"Learn"}
                        onClick={getState}
                    />
                </div>
                <div className={styles.settings}>
                    <Button
                        description={<span className="material-icons">add</span>}
                        onClick={addNewCardHandleClick}
                    />
                    <Button description={<span className="material-icons"
                                               onClick={showSettingHandleClick}>settings</span>}/>
                </div>
            </div>
            <div className={styles.cards}>
                {setCards}
            </div>

        </div>
    );
}

export default Deck;