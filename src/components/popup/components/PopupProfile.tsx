import React, {useContext, useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import {IUser} from "../../../models";
import {PopupContext} from "../../../App";
import {IsPopupActiveContext} from "../PopupList";
import {useCopyElement} from "../../../hooks/CopyElement";
import {getApiLink} from "../../../functions/getApiLink";

interface IPopupProfileProps {

}

export const PopupProfile: React.FC<IPopupProfileProps> = () => {

    const userData: IUser = useSelector((state: any) => state.toolkit.user)
    const setPopup: any = useContext(PopupContext)
    const setIsPopupActiveContext: any = useContext(IsPopupActiveContext)

    const handleOpenEditor = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setIsPopupActiveContext(false)

        setTimeout(() => {
            setPopup({popup: "edit-profile-popup"})
        }, 250)
    }

    // const {setCopyElement, isCopied} = useCopyElement()

    // const handleCopy = (e: any, copyElement: string) => {
    //     setCopyElement(copyElement)
    // }

    return (
        <div className="profile__body popup-body">
            <button type="button" className="profile__close-btn popup-close-btn" title="Close">
                <svg width="15" height="15" viewBox="0 0 15 15">
                    <use xlinkHref="#close"></use>
                </svg>
            </button>
            <form className="profile__container popup-container">
                <div className="profile__user">
                    <div className="profile__user--avatar" style={{background: "#EF3129"}}>
                        {userData.avatar ? <img src={getApiLink(`/${userData.avatar}`)} alt="" width="80" height="80" loading="lazy"/> : userData?.first_name && (userData?.first_name[0] + userData?.last_name[0])}
                    </div>
                    <h2 className="profile__user--name title">
                        {userData?.first_name} {userData?.last_name}
                    </h2>
                </div>
                <div className="profile__info">
                    <div className="profile__info--item">
                        <span>Position</span>
                        <label>
                            <button onClick={_ => navigator.clipboard.writeText(`${userData.role}`)} className="copy-btn" type="button" data-clipboard-text="Managing director"
                                    data-copied-text="Text copied to the clipboard">
                                <svg width="15" height="16" viewBox="0 0 15 16">
                                    <use xlinkHref="#copy"></use>
                                </svg>
                            </button>
                            <input type="text" name="position" value={userData.role} readOnly
                                   className="input copy-input"/>
                        </label>
                    </div>
                    <div className="profile__info--item">
                        <span>E-mail</span>
                        <label>
                            <button onClick={_ => navigator.clipboard.writeText(`${userData.email}`)} className="copy-btn" type="button"
                                    data-clipboard-text="o.rybak@ic-group.org"
                                    data-copied-text="Text copied to the clipboard">
                                <svg width="15" height="16" viewBox="0 0 15 16">
                                    <use xlinkHref="#copy"></use>
                                </svg>
                            </button>
                            <input type="email" name="email" value={userData.email} readOnly
                                   className="input copy-input"/>
                        </label>
                    </div>
                    <div className="profile__info--item">
                        <span>Phone number</span>
                        <label>
                            <button onClick={_ => navigator.clipboard.writeText(`${userData.phone}`)} className="copy-btn" type="button" data-clipboard-text="(012)345-67-89"
                                    data-copied-text="Text copied to the clipboard">
                                <svg width="15" height="16" viewBox="0 0 15 16">
                                    <use xlinkHref="#copy"></use>
                                </svg>
                            </button>
                            <input type="tel" name="tel" value={userData.phone} readOnly
                                   className="input copy-input"/>
                        </label>
                    </div>
                </div>
                <div className="profile__footer">
                    <button onClick={handleOpenEditor} className="profile__edit btn">
                        Edit my profile
                    </button>
                </div>
            </form>
        </div>
    )
}
