import React from "react";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function App({userData, newPlace}) {
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [cards, setCards] = React.useState([]);

    // В корневом компоненте App создана стейт-переменная currentUser. Она используется в качестве значения для провайдера контекста.
    const [currentUser, setCurrentUser] = React.useState({});

    React.useEffect(() => {
        if (newPlace !== undefined) {
            api
                .addCard(newPlace)
                .then((newCardFull) => {
                    setCards(c => [newCardFull, ...c]);
                })
                .catch((err) => console.log(err));
        }
    }, [newPlace]);

    React.useEffect(() => {
        if (userData === undefined) {
            api
                .getAppInfo()
                .then(([cardData, userData]) => {
                    setCurrentUser(userData);
                    setCards(cardData);
                })
                .catch((err) => console.log(err));
        } else {
            setCurrentUser(userData);
            api
                .getCardList()
                .then(cardData => {
                    setCards(cardData);
                })
                .catch((err) => console.log(err));
        }

    }, [userData]);

    function closeAllPopups() {
        setSelectedCard(null);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);
        api
            .changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((cards) =>
                    cards.map((c) => (c._id === card._id ? newCard : c))
                );
            })
            .catch((err) => console.log(err));
    }

    function handleCardDelete(card) {
        api
            .removeCard(card._id)
            .then(() => {
                setCards((cards) => cards.filter((c) => c._id !== card._id));
            })
            .catch((err) => console.log(err));
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div>
                <section className="places page__section">
                    <ul className="places__list">
                        {cards.map((card) => (
                            <Card
                                key={card._id}
                                card={card}
                                onCardClick={handleCardClick}
                                onCardLike={handleCardLike}
                                onCardDelete={handleCardDelete}
                            />
                        ))}
                    </ul>
                </section>
                <PopupWithForm title="Вы уверены?" name="remove-card" buttonText="Да"/>
                <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
