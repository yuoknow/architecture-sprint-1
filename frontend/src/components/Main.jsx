import React from 'react';
import Profile from 'profile/Profile';
import Places from "places/Places";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main({onChangeUserData}) {
    const [newPlace, setNewPlace] = React.useState();
    const currentUser = React.useContext(CurrentUserContext);
    return (
        <main className="content">
            <Profile
                onChangeUserData={onChangeUserData}
                onAddNewPlace={setNewPlace}
                userData={currentUser}
            />
            <Places
                newPlace={newPlace}
                userData={currentUser}
            />
        </main>
    );
}

export default Main;
