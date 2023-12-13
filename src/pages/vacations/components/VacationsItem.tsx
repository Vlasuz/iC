import React, {useEffect, useState} from 'react'
import {IEmployee} from "../../../models";

interface IVacationsItemProps {
    itemData: IEmployee
    index: number
}

export const VacationsItem: React.FC<IVacationsItemProps> = ({itemData, index}) => {

    return (
        <div className="section-table__row drop-down-2">


            <div className="section-table__param visible-on-mob">
                <span>
                    {index}
                </span>
                <span>
                    {itemData.first_name} {itemData.last_name}
                </span>
            </div>
            <div className="section-table__param visible-on-desktop is-none-vertical-hover">
                {index}
            </div>
            <div className="section-table__param visible-on-desktop is-none-vertical-hover">
                {itemData.first_name} {itemData.last_name}
            </div>
            <div className="section-table__param">
                1.0
            </div>
            <div className="section-table__param">
                0.0
            </div>
            <div className="section-table__param">
                22.0
            </div>
            <div className="section-table__param">
                23.0
            </div>
            <div className="section-table__param">
                0.0
            </div>
            <div className="section-table__param">
                0.0
            </div>
            <div className="section-table__param">
                0.0
            </div>
            <div className="section-table__param">
                0.0
            </div>
            <div className="section-table__param">
                0.0
            </div>
            <div className="section-table__param">
                0.0
            </div>
            <div className="section-table__param">
                0.0
            </div>
            <div className="section-table__param">
                0.0
            </div>
            <div className="section-table__param">
                0.0
            </div>
            <div className="section-table__param">
                0.0
            </div>
            <div className="section-table__param">
                0.0
            </div>
            <div className="section-table__param">
                0.0
            </div>
            <div className="section-table__param">
                23.0
            </div>
            <div className="drop-down-2__block">
                <ul className="drop-down-2__list">
                    <li>
                        <a href="#">
                            <svg width="15" height="16" viewBox="0 0 15 16">
                                <use xlinkHref="#edit"></use>
                            </svg>
                            Edit extra days
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}
