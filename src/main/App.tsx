import React from 'react';
import styles from './App.module.css';
import NavBar from "../components/NavBar/NavBar";
import {HashRouter} from "react-router-dom";
import Routes from "./routes/Routes";
import {Provider} from "react-redux";
import store from "../BLL/redux-store";

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
                <Provider store={store}>
                <div className={styles.App}>
                    <NavBar
                        menuClickHandle={this.menuClickHandle}
                        showNavBar={this.state.showNavBar}
                    />
                    <Routes/>
                </div>
                </Provider>
            </HashRouter>
        );
    }
}

export default App;
