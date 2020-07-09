import React, {useState} from 'react';
import styles from './PackOfCards.module.scss'
import {useDispatch} from "react-redux";
import {changeDeckNameTH, deleteDeckTH} from "../../5_Tables/bll/tables-reducer";
import Input from "../input/Input";
import loader from "../loader/preloader.gif";


function PackOfCards(props: any) {

    const [showInput, showInputToggle] = useState<boolean>(false);
    const [newName, changeName] = useState<string>('');
    const [loading, loadingToggle] = useState<boolean>(false);


    const dispatch = useDispatch();
    const deleteCardDeck = (id: string) => {
        console.log(id)
        dispatch(deleteDeckTH(id))
    }
    const onBlur = () => {
        showInputToggle(false)
        loadingToggle(true)
        const id: string = props.id
        dispatch(changeDeckNameTH(newName, id))
        setTimeout(() => {
            loadingToggle(false)}, 3000)
    }

    return (

        <div className={styles.main}>
            {loading && <div><img src={loader} className={styles.loader} alt="loading"/></div>}
            <div className={styles.wrapper}>
                {props.name}
                {/*{props.id}*/}
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