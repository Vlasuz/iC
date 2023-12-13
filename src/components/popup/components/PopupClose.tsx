import React, {useContext, useEffect} from 'react'
import {IsPopupActiveContext} from "../PopupList";

interface IPopupCloseProps {

}

export const PopupClose: React.FC<IPopupCloseProps> = () => {

    const setIsPopupActive: any = useContext(IsPopupActiveContext)

    return (
        <button type="button" onClick={_ => setIsPopupActive(false)} className="remove-table-item__close-btn popup-close-btn popup-close"
                title="Close">
            <svg width="15" height="15" viewBox="0 0 15 15">
                <use xlinkHref="#close"></use>
            </svg>
        </button>
    )
}
