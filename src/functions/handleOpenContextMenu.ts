import React from "react";

interface ICoods {
    top: string
    left: string
}

interface IHandleOpenContextMenu {
    e: React.MouseEvent<HTMLDivElement>
    isOpenContextMenu: boolean
    setMenuPosition: React.Dispatch<React.SetStateAction<ICoods>>
    setIsOpenContextMenu: React.Dispatch<React.SetStateAction<boolean>>
    height: number
    width: number
}

export const handleOpenContextMenu = ({e, isOpenContextMenu, setMenuPosition, setIsOpenContextMenu, height, width}: IHandleOpenContextMenu) => {
    e.preventDefault()

    if (isOpenContextMenu) {
        setTimeout(() => {
            setMenuPosition({
                top: "auto",
                left: "auto"
            })
        }, 300)
    } else {
        const isMenuNearRightSide = window.innerWidth - e.clientX < 200
        const isMenuNearBottomSide = window.innerHeight - e.clientY < 250

        console.log(e)

        setMenuPosition({
            top: `${isMenuNearBottomSide ? e.clientY - height + "px" : e.clientY + 10 + "px"}`,
            left: `${isMenuNearRightSide ? e.clientX - width + "px" : e.pageX + 10 + "px"}`
        })
    }

    setIsOpenContextMenu(prev => !prev)
}