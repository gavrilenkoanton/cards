import React from 'react';
import {Switch, Route} from "react-router-dom";
import Login from "../../components/2_Login/Login";
import Registration from "../../components/3_Registration/1_ui/Registration";
import Forgot from "../../components/4_Forgot/ui/Forgot";
import Profile from "../../components/1_Profile/Profile";
import Tables from "../../components/5_Tables/ui/Tables";
import Deck from "../../components/6_Deck/ui/Deck";


type PageType = {
    id: number;
    title: string;
    path?: string;
    exact?: boolean;
    component: any;
};

const pages: Array<PageType> = [
    {id: 0, title: 'login', path: '/login', component: () => <Login/>},
    {id: 1, title: 'register', path: '/registration',  component: () => <Registration/>},
    {id: 2, title: 'forgot', path: '/forgot', component: () => <Forgot/>},
    {id: 3, title: 'profile', path: '/',  exact: true, component: () => <Profile/>},
    {id: 4, title: 'tables', path: '/tables',  exact: true, component: () => <Tables/>},
    {id: 5, title: 'deck', path: '/deck/:id',  exact: false, component: () =><Deck/> },
];


const Routes = () => {
    return (
        <Switch>
            {pages.map(p => (
                <Route
                    key={p.id}
                    path={p.path}
                    exact={p.exact}
                    render={p.component}
                />
            ))}
        </Switch>
    )
};

export default Routes;
