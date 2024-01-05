import axios from "axios";
import {getApiLink} from "../functions/getApiLink";
import getCookies from "../functions/getCookie";
import setCookie from "../functions/setCookie";
import {setAccessToken, setUser} from "../storage/toolkit";
import {useNavigate} from "react-router-dom";
import {getBearer} from "../functions/getBearer";

export const GetAccessToken = (dispatch: any) => {

    getBearer("post")
    axios.post(getApiLink("/api/auth/refresh/"), {
        "refresh_token": getCookies("refresh_token_ic")
    }).then(({data}) => {

        console.log('111')
        setCookie("access_token_ic", data.access_token)
        dispatch(setUser(data.user))
        dispatch(setAccessToken(data.access_token))

    }).catch(er => {
        console.log('er refresh',er)
        // navigate('/login')
        // if(window.location.href !== "/login") {
        //     window.location.href = "/login"
        // }
    })

}