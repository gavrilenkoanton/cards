import React from 'react';
import styles from './App.module.css';
import NavBar from "./components/NavBar/NavBar";
import Profile from "./components/1_Profile/Profile";
import {HashRouter, Route} from "react-router-dom";
import Login from "./components/2_Login/Login";
import Registration from "./components/3_Registration/Registration";
import Forgot from "./components/4_Forgot/Forgot";

class App extends React.Component {

    state = {
        showNavBar: true
    }
    menuClickHandle = () => {
        this.setState({showNavBar: !this.state.showNavBar})
    }

    render() {
        return (
            <HashRouter>
                <div className={styles.App}>
                    <NavBar
                        menuClickHandle={this.menuClickHandle}
                        showNavBar={this.state.showNavBar}
                    />
                    <Route path='/' exact render={() => <Profile/>}/>
                    <Route path='/login' render={() => <Login/>}/>
                    <Route path='/registration' render={() => <Registration/>}/>
                    <Route path='/forgot' render={() => <Forgot/>}/>
                </div>
            </HashRouter>
        );
    }
}

export default App;
