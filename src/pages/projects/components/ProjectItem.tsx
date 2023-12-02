import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import {IProject} from "../../../models";
import {setSelectedEmployee} from "../../../storage/toolkit";

interface IProjectItemProps {
    data: IProject
    index: number
}

export const ProjectItem: React.FC<IProjectItemProps> = ({data, index}) => {

    const dispatch = useDispatch()

    const handleSelect = () => {
        dispatch(setSelectedEmployee(data))
    }

    return (
        <div onClick={handleSelect} className="section-table__row drop-down-2">
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
            <div className="drop-down-2__block">
                <ul className="drop-down-2__list">
                    <li>
                        <a href="#edit-project-popup" className="open-popup">
                            <svg width="15" height="16" viewBox="0 0 15 16">
                                <use xlinkHref="#edit"></use>
                            </svg>
                            Edit
                        </a>
                    </li>
                    <li>
                        <a href="#remove-table-item-popup" className="open-popup">
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
