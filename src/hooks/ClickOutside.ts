import { useEffect, useRef } from "react";

export const useClickOutside = (setIsClose: any) => {
    const rootEl: any = useRef(null);

    useEffect(() => {
        const onClick = (e: any) => {
            return rootEl.current?.contains(e.target) || setIsClose(false)
        };
        const onTab = (e: any) => {
            if(e.keyCode === 9)
                return rootEl.current?.contains(e.target) || setIsClose(false)
        }
        document.addEventListener('click', onClick);
        document.addEventListener('keyup', onTab);
        return () => {
            document.removeEventListener('click', onClick)
            document.removeEventListener('keyup', onTab)
        };
    }, []);

    return {rootEl}
}