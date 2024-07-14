import React from "react";
import {Switch, useHistory} from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import api from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute";
import Auth from "auth/Auth";

function App() {
    // В корневом компоненте App создана стейт-переменная currentUser. Она используется в качестве значения для провайдера контекста.
    const [currentUser, setCurrentUser] = React.useState({});

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    //В компоненты добавлены новые стейт-переменные: email — в компонент App
    const [email, setEmail] = React.useState("");

    const history = useHistory();

    // Запрос к API за информацией о пользователе и массиве карточек выполняется единожды, при монтировании.
    React.useEffect(() => {
        if(email !== '') {
            api
                .getUserInfo()
                .then((userData) => {
                    setCurrentUser(userData);
                })
                .catch((err) => console.log(err));
        }
    }, [email]);

    const handleEmailChange = (email) => {
        setEmail(email);
        setIsLoggedIn(true);
    };

    function handleUpdateUser(newUserData) {
        setCurrentUser(newUserData);
    }

    function onSignOut() {
        // при вызове обработчика onSignOut происходит удаление jwt
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        // После успешного вызова обработчика onSignOut происходит редирект на /signin
        history.push("/signin");
    }

    return (
        // В компонент App внедрён контекст через CurrentUserContext.Provider
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page__content">
                <Header email={email} onSignOut={onSignOut}/>
                <Auth onChange={handleEmailChange}/>
                <Switch>
                    {/*Роут / защищён HOC-компонентом ProtectedRoute*/}
                    <ProtectedRoute
                        exact
                        path="/"
                        component={Main}
                        onChangeUserData={handleUpdateUser}
                        loggedIn={isLoggedIn}
                    />
                </Switch>
                <Footer/>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
