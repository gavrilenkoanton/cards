import React from 'react';
import styles from './Card.module.scss';
import Button from "../../common/button/Button";
import {useDispatch, useSelector} from "react-redux";
import {deleteCardTH, renameCardTH} from "../../6_Deck/bll/deck-reducer";


const Card = (props: any) => {

    const dispatch = useDispatch();
    const {showSettings} = useSelector((store: any) => store.deck);
    const deleteCard = () => {
        dispatch(deleteCardTH(props.id))
    }
    const renameCard = () => {
        const newQuestion = "newQuestion"
        const newAnswer = "newAnswer"

        dispatch(renameCardTH(props.id, newQuestion, newAnswer))
    }

    return (
        <div className={styles.wrapper}>
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
                  onClick={renameCard}
                />}
                {showSettings && <Button
                  description={<span className="material-icons">delete_forever</span>}
                  color={"red"}
                  onClick={deleteCard}
                />
                }
            </div>


        </div>
    );
}

export default Card;