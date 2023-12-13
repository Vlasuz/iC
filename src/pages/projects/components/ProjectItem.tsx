import React, {useContext, useEffect, useRef, useState} from 'react'
import { useDispatch } from 'react-redux';
import {IProject} from "../../../models";
import {setSelectedEmployee} from "../../../storage/toolkit";
import {PopupContext} from "../../../App";

interface IProjectItemProps {
    data: IProject
    index: number
}

export const ProjectItem: React.FC<IProjectItemProps> = ({data, index}) => {

    const [isOpenContextMenu, setIsOpenContextMenu] = useState(false)
    const [menuPosition, setMenuPosition] = useState({})

    const modalBlock: any = useRef(null)
    const rowBlock: any = useRef(null)

    const handleOpenContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()

        if(isOpenContextMenu) {
            setTimeout(() => {
                setMenuPosition({
                    top: "auto",
                    left: "auto"
                })
            }, 300)
        } else {
            setMenuPosition({
                top: e.pageY + 10 + "px",
                left: e.pageX + 10 + "px"
            })
        }

        setIsOpenContextMenu(prev => !prev)
    }

    useEffect(() => {
        if(!isOpenContextMenu) {
            setTimeout(() => {
                setMenuPosition({
                    top: "auto",
                    left: "auto"
                })
            }, 300)
        }
    }, [isOpenContextMenu])

    useEffect(() => {
        const onClick = (e: any) => modalBlock.current?.contains(e.target) || setIsOpenContextMenu(false);
        const onContext = (e: any) => rowBlock.current?.contains(e.target) || setIsOpenContextMenu(false);

        document.addEventListener('click', onClick);
        document.addEventListener('contextmenu', onContext);
        return () => {
            document.removeEventListener('click', onClick);
            document.removeEventListener('contextmenu', onContext);
        }
    }, []);

    const setPopup: any = useContext(PopupContext)

    const handleEditProject = () => {
        setPopup({popup: "edit-project-popup", data})
        setIsOpenContextMenu(false)
    }

    const handleRemoveProject = () => {
        setPopup({popup: "remove-project-popup", data})
        setIsOpenContextMenu(false)
    }

    return (
        <div ref={rowBlock} onContextMenu={handleOpenContextMenu} className={"section-table__row drop-down-2" + (isOpenContextMenu ? " is-active-drop-down" : "")}>
            <div className="section-table__param visible-on-mob">
                <span>{index + 1}</span>
                <span>{data.name}</span>
            </div>
            <div className="section-table__param visible-on-desktop is-center">
                {index + 1}
            </div>
            <div className="section-table__param visible-on-desktop is-center">
                {data.name}
            </div>
            <div className="section-table__param">
                {data.description}
            </div>
            <div className={"drop-down-2__block" + (isOpenContextMenu ? " active" : "")} ref={modalBlock} style={menuPosition}>
                <ul className="drop-down-2__list">
                    <li>
                        <a onClick={handleEditProject} className="open-popup">
                            <svg width="15" height="16" viewBox="0 0 15 16">
                                <use xlinkHref="#edit"></use>
                            </svg>
                            Edit
                        </a>
                    </li>
                    <li>
                        <a onClick={handleRemoveProject} className="open-popup">
                            <svg width="15" height="16" viewBox="0 0 15 16">
                                <use xlinkHref="#trash"></use>
                            </svg>
                            Delete
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}
