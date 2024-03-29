import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux';
import {useClickOutside} from "../../../../hooks/ClickOutside";
import {IUser} from "../../../../models";
import {useScrollTopValue} from "../../../../hooks/ScrollTopValue";
import SimpleBar from "simplebar-react";
import {Translate} from "../../../../components/translate/Translate";
import {TableHeaderProjects} from "../../../../components/table/TableHeaderProjects";

interface ITimesheetTableHeaderProps {
    setFilterByProjectName: any
    setFilterByProjectDescription: any
    setSortByDate: any
    setSortByTotal: any
}

export const TimesheetTableHeader: React.FC<ITimesheetTableHeaderProps> = ({
                                                                               setFilterByProjectName,
                                                                               setSortByDate,
                                                                               setSortByTotal
                                                                           }) => {

    const [isActiveDate, setIsActiveDate] = useState(false)
    const activeDate = useClickOutside(setIsActiveDate)

    const [isActiveProjectName, setIsActiveProjectName] = useState(false)
    const [isActiveProjectDescription, setIsActiveProjectDescription] = useState(false)

    const [isActiveTotal, setIsActiveTotal] = useState(false)
    const activeTotal = useClickOutside(setIsActiveTotal)

    const [chosenSortDate, setChosenSortDate] = useState("ASC")
    const [chosenSortTotal, setChosenSortTotal] = useState("")

    const {scrollY} = useScrollTopValue()
    
    return (
        <div className="section-table__head">
            <div className="section-table__head-row">
                <div className="section-table__head-th visible-on-mob">
                    <span className="section-table__main--param">
                        <span>№</span>
                        <span ref={activeDate.rootEl}>
                            <div className="section-table__main--sort drop-down-absolute is-center">
                        <button
                            className={isActiveDate ? "section-table__main--sort-target drop-down-absolute__target is-active" : "section-table__main--sort-target drop-down-absolute__target"}
                            data-drop-down-target="date-sort-2" type="button"
                            onClick={_ => setIsActiveDate(prev => !prev)}>
                            <svg width="13" height="13" viewBox="0 0 13 13">
                                <use xlinkHref="#calendar-selected"></use>
                            </svg>
                            <Translate>timesheet_page.table.date</Translate>
                            <svg width="10" height="15" viewBox="0 0 11 15">
                                <use xlinkHref="#sort-up-down"></use>
                            </svg>
                        </button>
                        <div
                            className={isActiveDate ? "section-table__main--sort-block drop-down-absolute__block is-active" : "section-table__main--sort-block drop-down-absolute__block"}
                            id="date-sort-2" style={{minWidth: "150px", transform: `translateY(${-scrollY}px)`}}>
                            <ul className="drop-down__list drop-down__list-date">
                                <li className={` ${chosenSortDate === "ASC" && "is-active"}`}>
                                    <a onClick={_ => {
                                        setSortByDate("ASC")
                                        setChosenSortDate("ASC")
                                        setSortByTotal("")
                                        setChosenSortTotal("")
                                        setIsActiveDate(false)
                                    }}>
                                        <Translate>newest_first</Translate>
                                    </a>
                                </li>
                                <li className={` ${chosenSortDate === "DESC" && "is-active"}`}>
                                    <a onClick={_ => {
                                        setSortByDate("DESC")
                                        setChosenSortDate("DESC")
                                        setSortByTotal("")
                                        setChosenSortTotal("")
                                        setIsActiveDate(false)
                                    }}>
                                        <Translate>oldest_first</Translate>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                        </span>
                    </span>
                </div>
                <div className="section-table__head-th visible-on-desktop">
                    <span className="section-table__main--param">
                        №
                    </span>
                </div>
                {window.innerWidth > 992 && <div className="section-table__head-th visible-on-desktop">
                    <div ref={activeDate.rootEl} className="section-table__main--sort drop-down-absolute is-center">
                        <button
                            className={isActiveDate ? "section-table__main--sort-target drop-down-absolute__target is-active" : "section-table__main--sort-target drop-down-absolute__target"}
                            data-drop-down-target="date-sort-2" type="button"
                            onClick={_ => setIsActiveDate(prev => !prev)}>
                            <svg width="13" height="13" viewBox="0 0 13 13">
                                <use xlinkHref="#calendar-selected"></use>
                            </svg>
                            <Translate>timesheet_page.table.date</Translate>
                            <svg width="10" height="15" viewBox="0 0 11 15">
                                <use xlinkHref="#sort-up-down"></use>
                            </svg>
                        </button>
                        <div
                            className={isActiveDate ? "section-table__main--sort-block drop-down-absolute__block is-active" : "section-table__main--sort-block drop-down-absolute__block"}
                            id="date-sort-2" style={{minWidth: "150px", transform: `translateY(${-scrollY}px)`}}>
                            <ul className="drop-down__list drop-down__list-date">
                                <li className={` ${chosenSortDate === "ASC" && "is-active"}`}>
                                    <a onClick={_ => {
                                        setSortByDate("ASC")
                                        setChosenSortDate("ASC")
                                        setSortByTotal("")
                                        setChosenSortTotal("")
                                        setIsActiveDate(false)
                                    }}>
                                        <Translate>newest_first</Translate>
                                    </a>
                                </li>
                                <li className={` ${chosenSortDate === "DESC" && "is-active"}`}>
                                    <a onClick={_ => {
                                        setSortByDate("DESC")
                                        setChosenSortDate("DESC")
                                        setSortByTotal("")
                                        setChosenSortTotal("")
                                        setIsActiveDate(false)
                                    }}>
                                        <Translate>oldest_first</Translate>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>}
                <div className="section-table__head-th">
                    <TableHeaderProjects title={"timesheet_page.table.project_num"} setFilterByProjectName={setFilterByProjectName}
                                         isActiveBlock={isActiveProjectName} setIsActiveBlock={setIsActiveProjectName} icon={"#project"}/>
                </div>
                <div className="section-table__head-th">
                    <TableHeaderProjects title={"timesheet_page.table.project_description"} setFilterByProjectName={setFilterByProjectName}
                                         isActiveBlock={isActiveProjectDescription} setIsActiveBlock={setIsActiveProjectDescription} icon={"#comments"}/>
                </div>
                <div className="section-table__head-th">
                    <span className="section-table__main--param is-center">
                        <svg width="13" height="13" viewBox="0 0 13 13">
                            <use xlinkHref="#pin"></use>
                        </svg>
                        <Translate>timesheet_page.table.task</Translate>
                    </span>
                </div>
                <div className="section-table__head-th">
                    <span className="section-table__main--param is-center">
                        <svg width="13" height="13" viewBox="0 0 13 13">
                            <use xlinkHref="#time"></use>
                        </svg>
                        <Translate>timesheet_page.table.time</Translate>
                    </span>
                </div>
                <div className="section-table__head-th">
                    <span className="section-table__main--param is-center">
                        <svg width="13" height="13" viewBox="0 0 13 13">
                            <use xlinkHref="#hours"></use>
                        </svg>
                        <Translate>timesheet_page.table.hours</Translate>
                    </span>
                </div>
                <div className="section-table__head-th">
                    <div ref={activeTotal.rootEl} className="section-table__main--func drop-down-absolute">
                        <button
                            onClick={_ => setIsActiveTotal(prev => !prev)}
                            className={isActiveTotal ? "section-table__main--func-target drop-down-absolute__target is-active" : "section-table__main--func-target drop-down-absolute__target"}
                            data-drop-down-target="total-sort" type="button">
                            <svg width="13" height="13" viewBox="0 0 13 13">
                                <use xlinkHref="#total"></use>
                            </svg>
                            <Translate>timesheet_page.table.total</Translate>
                            <svg width="10" height="15" viewBox="0 0 11 15">
                                <use xlinkHref="#sort-up-down"></use>
                            </svg>
                        </button>
                        <div
                            className={isActiveTotal ? "section-table__main--func-block drop-down-absolute__block is-right-default is-active" : "section-table__main--func-block drop-down-absolute__block is-right-default"}
                            id="total-sort" style={{transform: `translateY(${-scrollY}px)`}}>
                            <ul className="drop-down__list drop-down__list-date">
                                <li className={chosenSortTotal === "DESC" ? "is-active" : ""}>
                                    <a onClick={_ => {
                                        if(chosenSortTotal === "DESC") {
                                            setSortByTotal("")
                                            setChosenSortTotal("")
                                        } else {
                                            setSortByTotal("DESC")
                                            setChosenSortTotal("DESC")
                                            setSortByDate("")
                                            setChosenSortDate("")
                                        }

                                        setIsActiveTotal(false)
                                    }}>
                                        <Translate>uncompleted</Translate>
                                    </a>
                                </li>
                                <li className={chosenSortTotal === "ASC" ? "is-active" : ""}>
                                    <a onClick={_ => {
                                        if(chosenSortTotal === "ASC") {
                                            setSortByTotal("")
                                            setChosenSortTotal("")
                                        } else {
                                            setSortByTotal("ASC")
                                            setChosenSortTotal("ASC")
                                            setSortByDate("")
                                            setChosenSortDate("")
                                        }

                                        setIsActiveTotal(false)
                                    }}>
                                        <Translate>completed</Translate>
                                    </a>
                                </li>
                                <li className={chosenSortTotal === "" ? "is-active" : ""}>
                                    <a onClick={_ => {
                                        setSortByTotal("")
                                        setChosenSortTotal("")
                                        setSortByDate("")
                                        setChosenSortDate("")

                                        setIsActiveTotal(false)
                                    }}>
                                        <Translate>all_tasks</Translate>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
