import React, {useContext, useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {IUser} from "../../../models";
import {PopupContext} from "../../../App";
import {IsPopupActiveContext} from "../PopupList";
import {useCopyElement} from "../../../hooks/CopyElement";
import {getApiLink} from "../../../functions/getApiLink";
import {PopupClose} from "./PopupClose";
import {Translate} from "../../translate/Translate";
import {toast} from "react-toastify";

interface IPopupProfileProps {
    data: any
}

export const PopupProfile: React.FC<IPopupProfileProps> = ({data}) => {

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

    const handleCopy = (copyText: string) => {
        navigator.clipboard.writeText(`${copyText}`)
        toast.success("Successfully copied!")
    }

    console.log(data)

    return (
        <div className="profile__body popup-body profile">
            <PopupClose/>
            <form className="profile__container popup-container">
                <div className="profile__user">
                    <div className="profile__user--avatar" style={{background: "#EF3129"}}>

                        {
                            data && Object.keys(data).length ? (data?.avatar ?
                                    <img src={getApiLink(`/${data?.avatar}`)} alt="" width="80" height="80"
                                         loading="lazy"/> : (data?.first_name) && (data?.first_name[0] + data?.last_name[0])) :
                                userData?.avatar ?
                                    <img src={getApiLink(`/${userData.avatar}`)} alt="" width="80" height="80"
                                         loading="lazy"/> : (userData?.first_name) && (userData?.first_name[0] + userData?.last_name[0])
                        }
                    </div>
                    <h2 className="profile__user--name title">
                        {data?.first_name ?? userData?.first_name} {data?.last_name ?? userData?.last_name}
                    </h2>
                </div>
                <div className="profile__info">
                    <div className="profile__info--item">
                        <span>
                            <Translate>profile.position</Translate>
                        </span>
                        <label>
                            <button onClick={_ => handleCopy(data?.role ?? userData.role)} className="copy-btn"
                                    type="button" data-clipboard-text="Managing director"
                                    data-copied-text="Text copied to the clipboard">
                                <svg width="15" height="16" viewBox="0 0 15 16">
                                    <use xlinkHref="#copy"></use>
                                </svg>
                            </button>
                            <input style={{textTransform: "capitalize"}} type="text" name="position"
                                   value={data?.role ?? userData.role} readOnly
                                   className="input copy-input"/>
                        </label>
                    </div>
                    <div className="profile__info--item">
                        <span>E-mail</span>
                        <label>
                            <button onClick={_ => handleCopy(data?.email ?? userData.email)} className="copy-btn"
                                    type="button"
                                    data-clipboard-text="o.rybak@ic-group.org"
                                    data-copied-text="Text copied to the clipboard">
                                <svg width="15" height="16" viewBox="0 0 15 16">
                                    <use xlinkHref="#copy"></use>
                                </svg>
                            </button>
                            <input type="email" name="email" value={data?.email ?? userData.email} readOnly
                                   className="input copy-input"/>
                        </label>
                    </div>
                    <div className="profile__info--item">
                        <span>
                            <Translate>profile.phone_number</Translate>
                        </span>
                        <label>
                            <button onClick={_ => handleCopy(data?.phone ?? userData.phone)} className="copy-btn" type="button"
                                    data-clipboard-text="(012)345-67-89"
                                    data-copied-text="Text copied to the clipboard">
                                <svg width="15" height="16" viewBox="0 0 15 16">
                                    <use xlinkHref="#copy"></use>
                                </svg>
                            </button>
                            <input type="tel" name="tel" value={data?.phone ?? userData.phone} readOnly
                                   className="input copy-input"/>
                        </label>
                    </div>
                </div>
                {(!data || !Object.keys(data).length) && <div className="profile__footer">
                    <button onClick={handleOpenEditor} className="profile__edit btn">
                        <Translate>profile.edit_my_profile</Translate>
                    </button>
                </div>}
            </form>
        </div>
    )
}
