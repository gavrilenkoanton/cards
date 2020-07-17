import React, {ChangeEvent, useEffect, useState} from 'react';
import styles from './Deck.module.scss';
import {addNewCardTH, getCardsTH, showSettingsToggleAC} from "../bll/deck-reducer";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from 'react-router-dom';
import Button from "../../common/button/Button";
import Card from "../../7_Card/ui/Card";
import Modal from "../../common/modal/modal";
import Input from "../../common/input/Input";

import loader from "../../common/loader/preloader.gif";

const Deck = (props: any) => {

    const params = useParams<{ id: string, name: string, userId: string }>()
    const [showModal, setShowModal] = useState<boolean>(false);
    const [questionValue, setQuestionValue] = useState<string>('');
    const [answerValue, setAnswerValue] = useState<string>('');
    const id = params.id
    const name = params.name
    const CurrentUserId = params.userId
    const dispatch = useDispatch();
    const {cards, showSettings, loadingChanges} = useSelector((store: any) => store.deck);
    const {userId} = useSelector((store: any) => store.login);

    useEffect(() => {
        dispatch(getCardsTH(id))

    }, [dispatch, id])

    const showSettingHandleClick = () => {
        dispatch(showSettingsToggleAC(!showSettings))
    }

    const setCards = cards.map((i: any) => {
        return <Card question={i.question} rating={i.rating} key={i._id} id={i._id}/>
    });

    const addNewCardHandleClick = () => {
        dispatch(addNewCardTH(questionValue, answerValue, id));
        setQuestionValue('');
        setAnswerValue('');
        setShowModal(false);
    }

    const getState = () => {
        console.log(cards)
        console.log(userId)
        console.log(CurrentUserId)
    }

    return (
        <div className={styles.wrapper}>
            Deck: {name}
            {loadingChanges && <div><img src={loader} className={styles.loaderChanges} alt="loading"/></div>}
            {showModal && <Modal>
              <Input placeholder='question'
                     onChange={(e: ChangeEvent<HTMLInputElement>) => setQuestionValue(e.target.value)}
                     value={questionValue}/><p/>
              <Input placeholder='answer'
                     onChange={(e: ChangeEvent<HTMLInputElement>) => setAnswerValue(e.target.value)}
                     value={answerValue}/><p/>
              <Button description='confirm' onClick={addNewCardHandleClick}/>
              <Button description='cancel' onClick={() => setShowModal(!showModal)}/>
            </Modal>}
            <div className={styles.optionsBar}>
                <div className={styles.learnButton}>
                    <Button description={"Learn"}
                            onClick={getState}
                    />
                </div>
                {userId === CurrentUserId && <div className={styles.settings}>
                  <Button
                    description={<span className="material-icons">add</span>}
                    onClick={() => setShowModal(!showModal)}
                  />
                  <Button description={<span className="material-icons"
                                             onClick={showSettingHandleClick}>settings</span>}/>
                </div>}
            </div>
            <div className={styles.cards}>
                {setCards}
            </div>

        </div>
    );
}
export default Deck;