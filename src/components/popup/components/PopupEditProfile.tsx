import React, {useContext, useEffect, useState} from 'react'
import {useDispatch, useSelector } from 'react-redux';
import {PopupContext} from "../../../App";
import { IUser } from '../../../models';
import {IsPopupActiveContext} from "../PopupList";
import {CustomSelect} from "../../customSelect/CustomSelect";
import {PhoneCodes} from "../../../constants/PhoneCodes";
import axios from "axios";
import {getApiLink} from "../../../functions/getApiLink";
import {getBearer} from "../../../functions/getBearer";
import {setUser} from "../../../storage/toolkit";

interface IPopupEditProfileProps {

}

export const PopupEditProfile: React.FC<IPopupEditProfileProps> = () => {

    const setIsPopupActiveContext: any = useContext(IsPopupActiveContext)

    const userData: IUser = useSelector((state: any) => state.toolkit.user)

    const dispatch = useDispatch()

    const [selectedPhoneCode, setSelectedPhoneCode] = useState(PhoneCodes()[0])
    const [phoneValue, setPhoneValue] = useState("")

    useEffect(() => {
        setPhoneValue(userData.phone)
    }, [userData])

    const handleChangeProfile = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        getBearer("patch")
        axios.patch(getApiLink("/api/user/update/"), {
            "phone": phoneValue
        }).then(({data}) => {
            dispatch(setUser(data))
        })
    }

    const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formData = new FormData();
        e.target.files?.length && formData.append("file", e.target.files[0]);
        getBearer("patch")
        axios.patch(getApiLink("/api/user/update/avatar/"), formData).then(({data}) => {
            dispatch(setUser(data))
        })
    }

    const setPopup: any = useContext(PopupContext)

    return (
        <div className="profile__body popup-body">
            <button type="button" className="profile__close-btn popup-close-btn" title="Close">
                <svg width="15" height="15" viewBox="0 0 15 15">
                    <use xlinkHref="#close"></use>
                </svg>
            </button>
            <form onSubmit={handleChangeProfile} className="profile__container popup-container" data-simplebar data-simplebar-auto-hide="false">
                <div className="profile__user">
                    <label className="profile__user--avatar">
                        <picture>
                            {userData.avatar ? <img src={getApiLink(`/${userData.avatar}`)} alt="" width="80" height="80" loading="lazy"/> : userData?.first_name && (userData?.first_name[0] + userData?.last_name[0])}
                        </picture>
                        <div className="profile__user--edit">
                            <svg width="18" height="18" viewBox="0 0 18 18">
                                <use xlinkHref="#add-picture"></use>
                            </svg>
                        </div>
                        <input type="file" onChange={handleChangeAvatar}/>
                    </label>
                    <h2 className="profile__user--name title">
                        {userData.first_name} {userData.last_name}
                    </h2>
                </div>
                <div className="profile__info">
                    <div className="profile__info--item">
                        <span>Position</span>
                        <label>
                            <input type="text" name="position" value={userData.status} readOnly className="input"/>
                        </label>
                    </div>
                    <div className="profile__info--item">
                        <span>E-mail</span>
                        <label>
                            <input type="email" name="email" value={userData.email} readOnly className="input"/>
                        </label>
                    </div>
                    <div className="profile__info--row tel-parent">
                        <div className="profile__info--item">
                            <span>Phone number</span>

                            <CustomSelect setSelectedItem={setSelectedPhoneCode} selectValue={selectedPhoneCode} list={PhoneCodes()} defaultValue={"+380"}/>

                        </div>
                        <div className="profile__info--item">
                            <span>Phone number</span>
                            <label>
                                <input type="tel" name="tel" onChange={e => setPhoneValue(e.target.value)} value={phoneValue} className="input"/>
                            </label>
                        </div>
                    </div>
                    <div className="profile__info--item">
                        <span>Password</span>
                        <label>
                            <a onClick={_ => setPopup({popup: "edit-profile-popup", secondPopup: "reset-password-popup"})} className="profile__info--button open-popup">
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
