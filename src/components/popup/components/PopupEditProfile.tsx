import React, {useContext, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {PopupContext} from "../../../App";
import {IUser} from '../../../models';
import {IsPopupActiveContext, IsPopupActiveSecondContext} from "../PopupList";
import {CustomSelect} from "../../customSelect/CustomSelect";
import {PhoneCodes} from "../../../constants/PhoneCodes";
import axios from "axios";
import {getApiLink} from "../../../functions/getApiLink";
import {getBearer} from "../../../functions/getBearer";
import {setUser} from "../../../storage/toolkit";
import {useMask} from "@react-input/mask";
import {PopupClose} from './PopupClose';
import {Translate} from "../../translate/Translate";

interface IPopupEditProfileProps {
    popup: any
}

export const PopupEditProfile: React.FC<IPopupEditProfileProps> = ({popup}) => {

    const setIsPopupActiveContext: any = useContext(IsPopupActiveContext)

    const userData: IUser = useSelector((state: any) => state.toolkit.user)

    const dispatch = useDispatch()

    const [selectedPhoneCode, setSelectedPhoneCode] = useState(PhoneCodes()[0])
    const [phoneValue, setPhoneValue] = useState("")
    const [avatarValue, setAvatarValue] = useState<any>()
    const [avatarForApi, setAvatarForApi] = useState<any>()

    useEffect(() => {
        setPhoneValue(userData.phone.slice(userData.phone.indexOf(" ") + 1))
        setAvatarValue(userData.avatar)
    }, [userData])

    const handleChangeProfile = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        apiToSetPhoto(avatarForApi)

        getBearer("patch")
        axios.patch(getApiLink("/api/user/update/"), {
            "phone": `${selectedPhoneCode.label} ${phoneValue}`
        }).then(({data}) => {
            setIsPopupActiveContext(false)
            dispatch(setUser(data))
        })
    }

    const handleChangeAvatarForApi = (file: any) => {
        const formData = new FormData();
        formData.append("file", file);
        setAvatarForApi(formData)
        console.log(formData)
    }

    const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e?.target?.files && e?.target?.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                const imageUrl = reader.result as string;
                // imageUrl содержит ссылку на изображение в формате base64 или blob

                // Далее вы можете использовать imageUrl для отображения или отправки на сервер
                console.log(imageUrl);
                setAvatarValue(imageUrl);

                handleChangeAvatarForApi(file);
            };

            reader.readAsDataURL(file); // Читаем файл как URL
        }
    };


    const handleDeletePhoto = (e: React.MouseEvent<HTMLSpanElement>) => {
        setAvatarValue(null)
        setAvatarForApi(null)
    }

    const apiToSetPhoto = (formData: any) => {
        getBearer("patch")
        axios.patch(getApiLink("/api/user/update/avatar/"), formData).then(({data}) => {
            dispatch(setUser(data))
        })
    }

    const setPopup: any = useContext(PopupContext)
    const setIsPopupSecondActive: any = useContext(IsPopupActiveSecondContext)

    const inputRef = useMask({mask: '(__) ___ __ __', replacement: {_: /\d/}});

    const handleOpenChangePass = () => {
        setIsPopupSecondActive(true)
        setPopup({popup: popup.popup, secondPopup: "reset-password-popup"})
    }

    useEffect(() => {
        console.log(avatarValue)
    }, [avatarValue])

    return (
        <div className="profile__body popup-body">
            <PopupClose/>
            <form onSubmit={handleChangeProfile} className="profile__container popup-container" data-simplebar
                  data-simplebar-auto-hide="false">
                <div className="profile__user">
                    <div className="profile__user--avatar">
                        {avatarValue && userData.avatar && <span onClick={handleDeletePhoto} className="delete_photo">
                            <svg width="15" height="15" viewBox="0 0 15 15"><use xlinkHref="#close"></use></svg>
                        </span>}
                        <label>
                            <picture>
                                {avatarValue ?
                                    <img src={!avatarValue.includes("media") ? avatarValue : getApiLink(`/${avatarValue}`)} alt="" width="80" height="80"
                                         loading="lazy"/> : userData?.first_name && (userData?.first_name[0] + userData?.last_name[0])}
                            </picture>

                            {/*{avatarValue && <img src={avatarValue} alt="" width="80" height="80"*/}
                            {/*      loading="lazy"/>}*/}
                            <div className="profile__user--edit">
                                <svg width="18" height="18" viewBox="0 0 18 18">
                                    <use xlinkHref="#add-picture"></use>
                                </svg>
                            </div>
                            <input type="file" onChange={handleChangeAvatar}/>
                        </label>
                    </div>
                    <h2 className="profile__user--name title">
                        {userData.first_name} {userData.last_name}
                    </h2>
                </div>
                <div className="profile__info">
                    <div className="profile__info--item">
                        <span>
                            <Translate>profile.position</Translate>
                        </span>
                        <label>
                            <input type="text" name="position" value={userData.role}
                                   style={{textTransform: "capitalize"}} readOnly className="input"/>
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
                            <span>
                                <Translate>profile.phone_number</Translate>
                            </span>

                            <CustomSelect setSelectedItem={setSelectedPhoneCode} selectValue={selectedPhoneCode}
                                          list={PhoneCodes()} defaultValue={{
                                "label": userData.phone.slice(0, userData.phone.indexOf(" ")),
                                "value": userData.phone.slice(0, userData.phone.indexOf(" "))
                            }}/>

                        </div>
                        <div className="profile__info--item">
                            <span style={{opacity: 0, cursor: "default"}}>
                                <Translate>profile.phone_number</Translate>
                            </span>
                            <label>
                                <input type="text" ref={inputRef} name="tel"
                                       onChange={e => setPhoneValue(e.target.value)} value={phoneValue}
                                       className="input"/>
                            </label>
                        </div>
                    </div>
                    <div className="profile__info--item">
                        <span>
                            <Translate>page_login.password</Translate>
                        </span>
                        <label>
                            <a onClick={handleOpenChangePass} className="profile__info--button"
                               style={{cursor: "pointer"}}>
                                <Translate>profile.click_to_reset_password</Translate>
                            </a>
                        </label>
                    </div>
                </div>
                <div className="profile__footer">
                    <button type="button" onClick={_ => setIsPopupActiveContext(false)}
                            className="profile__close btn is-transparent">
                        <Translate>profile.close_editing</Translate>
                    </button>
                    <button type="submit" className="profile__submit btn open-popup">
                        <Translate>profile.save_my_profile</Translate>
                    </button>
                </div>
            </form>
        </div>
    )
}
