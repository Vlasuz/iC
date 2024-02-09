export default function setCookie(name: any, data: any, maxTime?: number) {

    const domain = window.location.hostname
    const maxAge = maxTime ?? 999999999

    document.cookie = `${name}=${data}; path=/; domain=${domain}; max-age=${maxAge}; secure;`
}