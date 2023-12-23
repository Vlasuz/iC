import React, {useContext, useEffect, useRef, useState} from 'react'
import {useDispatch} from 'react-redux';
import {IEmployee} from "../../../models";
import {setSelectedEmployee} from '../../../storage/toolkit';
import {PopupContext} from "../../../App";
import {Translate} from "../../../components/translate/Translate";
import {Trans} from "react-i18next";

interface IEmployeesItemProps {
    data: IEmployee
    index: number
    isArchive: boolean
}

interface IStatus {
    value: string
    label: string
}

export const EmployeesItem: React.FC<IEmployeesItemProps> = ({data, index, isArchive}) => {

    const countOfProjects = data.projects?.length === 1 ? data.projects?.length + " project" : data.projects?.length + " projects"

    const [isOpenContextMenu, setIsOpenContextMenu] = useState(false)
    const [menuPosition, setMenuPosition] = useState({})

    const modalBlock: any = useRef(null)
    const rowBlock: any = useRef(null)

    const handleOpenContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        if(isArchive) return;

        if (isOpenContextMenu) {
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
        if (!isOpenContextMenu) {
            setTimeout(() => {
                setMenuPosition({
                    top: "auto",
                    left: "auto"
                })
            }, 300)
        }
    }, [isOpenContextMenu])

    useEffect(() => {
        const onClick = (e: any) => modalBlock.current.contains(e.target) || setIsOpenContextMenu(false);
        const onContext = (e: any) => rowBlock.current.contains(e.target) || setIsOpenContextMenu(false);

        document.addEventListener('click', onClick);
        document.addEventListener('contextmenu', onContext);
        return () => {
            document.removeEventListener('click', onClick);
            document.removeEventListener('contextmenu', onContext);
        }
    }, []);

    const setPopup: any = useContext(PopupContext)

    const handleEditEmployee = () => {
        setPopup({popup: "edit-employee-popup", data})
        setIsOpenContextMenu(false)
    }

    const handleRemoveEmployee = () => {
        setPopup({popup: "remove-employee-popup", data})
        setIsOpenContextMenu(false)
    }

    return (
        <div ref={rowBlock} onContextMenu={handleOpenContextMenu}
             className={`section-table__row drop-down-2 ${isArchive && "is-archive"} ${isOpenContextMenu && "is-active-drop-down"}`}>
            <div className="section-table__param visible-on-mob">
                <span>
                    {index}
                </span>
                <span style={{wordBreak: "normal"}}>
                    {data.first_name} {data.last_name}
                </span>
            </div>
            <div className="section-table__param visible-on-desktop is-center">
                {index}
            </div>
            <div className="section-table__param visible-on-desktop" style={{wordBreak: "normal"}}>
                {data.first_name} {data.last_name}
            </div>
            <div className="section-table__param" style={{textTransform: "capitalize", wordBreak: "normal"}}>
                {data.role}
            </div>
            <div className="section-table__param" style={{textTransform: "capitalize"}}>
                <Translate>{`employees_admin.table.${data.status}`}</Translate>
            </div>
            <div className="section-table__param"
                 style={{width: "100%", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden"}}>
                <a href={"mailto:" + data.email}
                   style={{textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden"}}>
                    <span>
                        {data.email}
                    </span>
                </a>
            </div>
            <div className="section-table__param">
                {
                    data.all_projects ? <Translate>employees_admin.table.all_projects</Translate> : countOfProjects
                }
            </div>
            <a href={"tel:" + data.phone} className="section-table__param">
                {data.phone}
            </a>
            <div className="section-table__param">
                {data.holidays} <Translate>employees_admin.table.days_per_year</Translate>
            </div>
            <div className={"drop-down-2__block" + (isOpenContextMenu ? " active" : "")} ref={modalBlock}
                 style={menuPosition}>
                <ul className="drop-down-2__list">
                    <li>
                        <a onClick={handleEditEmployee} className="open-popup">
                            <svg width="15" height="16" viewBox="0 0 15 16">
                                <use xlinkHref="#edit"></use>
                            </svg>
                            <Translate>employees_admin.table.edit</Translate>
                        </a>
                    </li>
                    <li>
                        <a onClick={handleRemoveEmployee} className="open-popup">
                            <svg width="15" height="16" viewBox="0 0 15 16">
                                <use xlinkHref="#trash"></use>
                            </svg>
                            <Translate>employees_admin.table.delete</Translate>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}
