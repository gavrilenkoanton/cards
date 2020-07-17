import React, {ChangeEvent, useState} from 'react';
import styles from './Card.module.scss';
import Button from "../../common/button/Button";
import {useDispatch, useSelector} from "react-redux";
import {deleteCardTH, renameCardTH} from "../../6_Deck/bll/deck-reducer";
import Modal from "../../common/modal/modal";
import {storeType} from "../../../BLL/redux-store";
import Input from "../../common/input/Input";


const Card = (props: any) => {

    const dispatch = useDispatch();
    const [showModalQuestion, setShowModalQuestion] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [questionValue, setQuestionValue] = useState<string>('');
    const [answerValue, setAnswerValue] = useState<string>('');
    const {showSettings} = useSelector((store: storeType) => store.deck);
    const deleteCard = () => {
        dispatch(deleteCardTH(props.id))
    }
    const renameCard = () => {
        dispatch(renameCardTH(props.id, questionValue, answerValue));
        setShowModal(false);
    }

    return (
        <div className={styles.wrapper}>
            {showModalQuestion && <Modal>
                Are you sure you want to delete this card?
                <Button description='confirm' onClick={deleteCard}/>
                <Button description='cancel' onClick={()=>setShowModalQuestion(!showModalQuestion)}/>
            </Modal>}
            {showModal && <Modal>
                <Input placeholder='question' onChange={(e:ChangeEvent<HTMLInputElement>)=>setQuestionValue(e.target.value)}
                       value={questionValue}/><p/>
                <Input placeholder='answer' onChange={(e:ChangeEvent<HTMLInputElement>)=>setAnswerValue(e.target.value)}
                       value={answerValue}/><p/>
                <Button description='confirm' onClick={renameCard}/>
                <Button description='cancel' onClick={()=>setShowModal(!showModal)}/>
            </Modal>}
            <div className={styles.descriptionOfCard}>
                <div className={styles.card}>
                    <i className="material-icons">
                        help_outline
                    </i>
                </div>
                <div className={styles.rating}>
                    <i className="material-icons">
                        star_half
                    </i>
                    <span className={styles.ratingCount}>{props.rating}</span>

                </div>
                <div className={styles.question}>{props.question}</div>
            </div>
            <div>
                {showSettings && <Button
                  description={<span className="material-icons">notes</span>}
                  onClick={()=>setShowModal(true)}
                />}
                {showSettings && <Button
                  description={<span className="material-icons">delete_forever</span>}
                  color={"red"}
                  onClick={()=>setShowModalQuestion(true)}
                />
                }
            </div>


        </div>
    );
}

export default Card;