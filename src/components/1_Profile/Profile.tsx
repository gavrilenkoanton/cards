import React from 'react';
import styles from './Profile.module.scss';
import Button from "../common/button/Button";
import Input from "../common/input/Input";


function Profile(props: any) {

    return (
        <div className={styles.wrapper}>
            Profile
            <div className={styles.introduction}>
                <Input/>
                <div>
                    <Button description={'Blue'} color={'blue'}/>
                    <Button description={'Red'} color={'red'}/>
                </div>
            </div>
        </div>
    );
}

export default Profile;