import React, {useContext, useEffect} from 'react'
import {IsPopupActiveContext} from "../PopupList";

interface IPopupCloseCancelProps {

}

export const PopupCloseCancel: React.FC<IPopupCloseCancelProps> = () => {

    const setIsPopupActive: any = useContext(IsPopupActiveContext)

    return (
        <button type="button" onClick={_ => setIsPopupActive(false)} className="btn is-transparent">
            Cancel
        </button>
    )
}
