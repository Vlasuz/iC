import axios from "axios";
import {getApiLink} from "../functions/getApiLink";
import getCookies from "../functions/getCookie";
import setCookie from "../functions/setCookie";
import {setAccessToken, setUser} from "../storage/toolkit";
import {useNavigate} from "react-router-dom";
import {getBearer} from "../functions/getBearer";

export const GetAccessToken = (dispatch: any, callbackFunction?: any) => {

    if(window.location.href.includes("login")) return;

    const cookies = getCookies("refresh_token_ic");

    getBearer("post")
    axios.post(getApiLink("/api/auth/refresh/"), {
        "refresh_token": cookies
    }).then(({data}) => {

        setCookie("access_token_ic", data.access_token)
        dispatch(setUser(data.user))
        dispatch(setAccessToken(data.access_token))
        window.location.href = "/"

        callbackFunction()

    }).catch(er => {
        console.log("er refresh",er)

        if(window.location.href.includes("login")) return;

        window.location.href = "/login"
    })

}