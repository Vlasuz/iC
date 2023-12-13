import { useEffect, useRef } from "react";

export const useClickOutside = (setIsClose: any) => {
    const rootEl: any = useRef(null);

    useEffect(() => {
        const onClick = (e: any) => rootEl.current?.contains(e.target) || setIsClose(false);
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, []);

    return {rootEl}
}