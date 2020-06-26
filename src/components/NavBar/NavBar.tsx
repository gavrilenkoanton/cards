import React from 'react';
import styles from './NavBar.module.scss';
import {NavLink} from "react-router-dom";

function NavBar(props: any) {
    return (
        <>
            <div className={styles.navBar}>
                <div className={styles.navBar__upperBlock}>
                    <i className="material-icons" onClick={() => {
                        props.menuClickHandle()
                    }}>{props.showNavBar ? "keyboard_arrow_right" : "keyboard_arrow_left"}</i>

                    <NavLink to="/" className={styles.link}>P</NavLink>
                    <NavLink to="/login" className={styles.link}>L</NavLink>
                    <NavLink to="/registration" className={styles.link}>R</NavLink>
                    <NavLink to="/forgot" className={styles.link}>F</NavLink>

                </div>
            </div>
            <div className={`${styles.navBarExtension} ${props.showNavBar && styles.navBarExtensionHide}`}>
                <div className={styles.navBarExtension__upperBlock}>
                    <div>Menu</div>
                    <div>Profile</div>
                    <div>Login</div>
                    <div>Registration</div>
                    <div>Forgot password</div>
                </div>
            </div>
        </>
    );
}

export default NavBar;