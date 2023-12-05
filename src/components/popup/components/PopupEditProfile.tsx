import React, {useContext, useEffect} from 'react'
import {PopupContext} from "../../../App";
import {IsPopupActiveContext} from "../PopupList";

interface IPopupEditProfileProps {

}

export const PopupEditProfile: React.FC<IPopupEditProfileProps> = () => {

    const setIsPopupActiveContext: any = useContext(IsPopupActiveContext)

    return (
        <div className="profile__body popup-body">
            <button type="button" className="profile__close-btn popup-close-btn" title="Close">
                <svg width="15" height="15" viewBox="0 0 15 15">
                    <use xlinkHref="#close"></use>
                </svg>
            </button>
            <form className="profile__container popup-container" data-simplebar data-simplebar-auto-hide="false">
                <div className="profile__user">
                    <div className="profile__user--avatar">
                        <picture>
                            <source srcSet="img/profile-avatar.avif" type="image/avif"/>
                            <source srcSet="img/profile-avatar.webp" type="image/webp"/>
                            <img src="img/profile-avatar.jpg" alt="" width="80" height="80" loading="lazy"/>
                        </picture>
                        <button type="button" className="profile__user--edit">
                            <svg width="18" height="18" viewBox="0 0 18 18">
                                <use xlinkHref="#add-picture"></use>
                            </svg>
                        </button>
                    </div>
                    <h2 className="profile__user--name title">
                        Olena Rybak
                    </h2>
                </div>
                <div className="profile__info">
                    <div className="profile__info--item">
                        <span>Position</span>
                        <label>
                            <input type="text" name="position" value="Managing director" readOnly className="input"/>
                        </label>
                    </div>
                    <div className="profile__info--item">
                        <span>E-mail</span>
                        <label>
                            <input type="email" name="email" value="o.rybak@ic-group.org" readOnly className="input"/>
                        </label>
                    </div>
                    <div className="profile__info--row tel-parent">
                        <div className="profile__info--item">
                            <span>Phone number</span>
                            <select name="phone-code" className="profile__info--select custom-select tel-code">
                                <option value="+380">+380</option>
                                <option value="+385">+385</option>
                                <option value="+390">+390</option>
                            </select>
                        </div>
                        <div className="profile__info--item">
                            <span>Phone number</span>
                            <label>
                                <input type="tel" name="tel" value="12-345-67-89" className="input"/>
                            </label>
                        </div>
                    </div>
                    <div className="profile__info--item">
                        <span>Password</span>
                        <label>
                            <a href="#reset-password-popup" className="profile__info--button open-popup">
                                Click to reset password
                            </a>
                        </label>
                    </div>
                </div>
                <div className="profile__footer">
                    <button type="button" onClick={_ => setIsPopupActiveContext(false)} className="profile__close btn is-transparent">
                        Close editing
                    </button>
                    <button type="submit" className="profile__submit btn open-popup">
                        Save my profile
                    </button>
                </div>
            </form>
        </div>
    )
}
