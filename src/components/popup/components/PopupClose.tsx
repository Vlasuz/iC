import React, {useContext, useEffect} from 'react'
import {IsPopupActiveContext} from "../PopupList";
import {PopupContext} from "../../../App";

interface IPopupCloseProps {

}

export const PopupClose: React.FC<IPopupCloseProps> = () => {

    const setIsPopupActive: any = useContext(IsPopupActiveContext)
    const setPopup: any = useContext(PopupContext)

    const handleClose = () => {
        setIsPopupActive(false)

        setTimeout(() => {
            setPopup("")
        }, 500)
    }

    return (
        <button type="button" onClick={handleClose} className="remove-table-item__close-btn popup-close-btn popup-close"
                title="Close">
            <svg width="15" height="15" viewBox="0 0 15 15">
                <use xlinkHref="#close"></use>
            </svg>
        </button>
    )
}
