import axios from "axios";
import getCookies from "./getCookie";

export const getBearer = (type: string) => {
    const access_token = getCookies('access_token_ic');

    const types: any = {
        'get': axios.defaults.headers.get['Authorization'] = `Bearer ${access_token}`,
        'post': axios.defaults.headers.post['Authorization'] = `Bearer ${access_token}`,
        'delete': axios.defaults.headers.delete['Authorization'] = `Bearer ${access_token}`,
        'put': axios.defaults.headers.put['Authorization'] = `Bearer ${access_token}`,
        'patch': axios.defaults.headers.patch['Authorization'] = `Bearer ${access_token}`
    };

    return types[type];
}