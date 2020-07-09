import React from 'react';
import styles from './PackOfCards.module.scss'
import Button from "../button/Button";


function PackOfCards(props: any) {


    return (
        <>
            <div className={styles.wrapper}>
                {props.name}
                <button>X</button>
            </div>
            <div>

            </div>

        </>
    );
}

export default PackOfCards;