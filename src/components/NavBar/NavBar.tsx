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
                    <NavLink to="/tables" className={styles.link}>T</NavLink>

                </div>
                <div className={styles.navBar__lowerBlock}>
                    <NavLink to="/" className={styles.link}>
                        <i className="material-icons">perm_identity</i>
                    </NavLink>
                    {/*<NavLink to="/login" className={styles.link}>T</NavLink>*/}
                </div>
            </div>
            <div className={`${styles.navBarExtension} ${props.showNavBar && styles.navBarExtensionHide}`}>
                <div className={styles.navBarExtension__upperBlock}>
                    <div>Menu</div>
                    <NavLink to="/" className={styles.linkDescription}>Profile</NavLink>
                    <NavLink to="/login" className={styles.linkDescription}>Login</NavLink>
                    <NavLink to="/registration" className={styles.linkDescription}>Registration</NavLink>
                    <NavLink to="/forgot" className={styles.linkDescription}>Forgot password</NavLink>
                    <NavLink to="/tables" className={styles.linkDescription}>Tables?</NavLink>
                </div>
                <div className={styles.navBarExtension__lowerBlock}>
                    <NavLink to="/" className={styles.linkDescription}>Profile</NavLink>
                </div>
            </div>
        </>
    );
}

export default NavBar;