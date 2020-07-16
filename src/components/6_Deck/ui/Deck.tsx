import React, {useEffect} from 'react';
import styles from './Deck.module.scss';
import {getCardsTH} from "../bll/deck-reducer";
import {useDispatch, useSelector} from "react-redux";
import { useParams } from 'react-router-dom';



const Deck = (props: any) => {

const  params = useParams<{id: string}>()
    // console.log(params.id)
    const id = params.id
    const dispatch = useDispatch();
    const {cards} = useSelector((store: any) => store.deck);
    console.log(cards)

    useEffect(()=>{
        debugger
        dispatch(getCardsTH(id))
    }, [id])


    return (
        <div className={styles.wrapper}>
            id: {id}
        </div>
    );
}

export default Deck;