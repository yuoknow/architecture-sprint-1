import React from 'react';

function InfoTooltip({ isOpen, onClose, status }) {
  const text = status === 'success' ? "Вы успешно зарегистрировались" :
     "Что-то пошло не так! Попробуйте ещё раз."
  return (
    <div className={`popup ${isOpen && 'popup_is-opened'}`}>
      <div className="popup__content">
        <form className="popup__form" noValidate>
          <button type="button" className="popup__close" onClick={onClose}></button>
            <div>
              <div className={`popup__icon ${status === 'fail' ? 'popup__icon_error' : 'popup__icon_success'} `} alt=""/>
              <p className="popup__status-message">{text}</p>
            </div>
        </form>
      </div>
    </div>
  );
}

export default InfoTooltip;

 