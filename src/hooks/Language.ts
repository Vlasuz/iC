import React, {useEffect, useState} from 'react'
import {initReactI18next, useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import setCookie from "../functions/setCookie";
import Lang_EN from "../languages/en.json";
import Lang_UA from "../languages/ua.json";
import i18n from "i18next";
import getCookie from "../functions/getCookie";
import { setLanguage } from '../storage/toolkit';

const jsonLanguages = {
    "en": { translation: Lang_EN },
    "ua": { translation: Lang_UA },
}
// Инициализация:
i18n.use(initReactI18next).init({
    resources: jsonLanguages,
    lng: getCookie("lang") ?? Object.keys(jsonLanguages)[0],
    fallbackLng: getCookie("lang") ?? Object.keys(jsonLanguages)[0]
});

export const useLanguage = () => {

    const languages = [
        {
            title: "EN",
            titleBig: "English",
            slug: "en"
        },
        {
            title: "UA",
            titleBig: "Українська",
            slug: "ua"
        },
    ]

    const {i18n} = useTranslation();
    const dispatch = useDispatch()
    const langSelected = useSelector((state: any) => state.toolkit.language)

    useEffect(() => {

        dispatch(setLanguage(i18n.language))
        setCookie('lang', i18n.language)

    }, [i18n.language])

    const handleSwitch = (slug: string) => {
        i18n.changeLanguage(slug)
    }

    return {languages, handleSwitch, langSelected}

}
