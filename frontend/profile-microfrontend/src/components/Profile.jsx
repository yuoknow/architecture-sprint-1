import React from "react";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import api from "../utils/api";
import AddPlacePopup from "./AddPlacePopup";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Profile({onChangeUserData, onAddNewPlace, userData}) {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState({});

    React.useEffect(() => {
        if (userData === undefined) {
            api
                .getUserInfo()
                .then(([cardData, userData]) => {
                    setCurrentUser(userData);
                })
                .catch((err) => console.log(err));
        } else {
            setCurrentUser(userData);
        }
    }, [userData]);

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleUpdateUser(userUpdate) {
        api
            .setUserInfo(userUpdate)
            .then((newUserData) => {
                if (onChangeUserData !== undefined) {
                    onChangeUserData(newUserData);
                }
                setCurrentUser(newUserData);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function handleUpdateAvatar(avatarUpdate) {
        api
            .setUserAvatar(avatarUpdate)
            .then((newUserData) => {
                if (onChangeUserData !== undefined) {
                    onChangeUserData(newUserData);
                }
                setCurrentUser(newUserData);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function handleAddPlaceSubmit(newCard) {
        if (onAddNewPlace !== undefined) {
            onAddNewPlace(newCard);
        }
        closeAllPopups();
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
    }

    const imageStyle = {backgroundImage: `url(${currentUser.avatar})`};

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div>
                <section className="profile page__section">
                    <div className="profile__image" onClick={handleEditAvatarClick} style={imageStyle}></div>
                    <div className="profile__info">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <button className="profile__edit-button" type="button"
                                onClick={handleEditProfileClick}></button>
                        <p className="profile__description">{currentUser.about}</p>
                    </div>
                    <button className="profile__add-button" type="button" onClick={handleAddPlaceClick}></button>
                </section>
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onUpdateUser={handleUpdateUser}
                    onClose={closeAllPopups}
                />
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onUpdateAvatar={handleUpdateAvatar}
                    onClose={closeAllPopups}
                />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onAddPlace={handleAddPlaceSubmit}
                    onClose={closeAllPopups}
                />
            </div>
        </CurrentUserContext.Provider>
    )
}

export default Profile;