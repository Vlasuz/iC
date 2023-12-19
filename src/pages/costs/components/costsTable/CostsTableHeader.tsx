import React, {useEffect, useState} from 'react'
import {useClickOutside} from "../../../../hooks/ClickOutside";
import {IUser} from "../../../../models";
import {useSelector} from "react-redux";
import {useScrollTopValue} from "../../../../hooks/ScrollTopValue";
import {Translate} from "../../../../components/translate/Translate";
import {TableHeaderProjects} from "../../../../components/table/TableHeaderProjects";

interface ICostsTableHeaderProps {
    setFilterByProjectName: any
    setFilterByProjectDescription: any
    setSortByDate: any
    setSortByCost: any
}

export const CostsTableHeader: React.FC<ICostsTableHeaderProps> = ({setFilterByProjectName, setFilterByProjectDescription, setSortByDate, setSortByCost}) => {

    const [isActiveDate, setIsActiveDate] = useState(false)
    const activeDate = useClickOutside(setIsActiveDate)

    const [isActiveProjectName, setIsActiveProjectName] = useState(false)
    const [isActiveProjectDescription, setIsActiveProjectDescription] = useState(false)

    const [isActiveCost, setIsActiveCost] = useState(false)
    const activeCost = useClickOutside(setIsActiveCost)

    const userData: IUser = useSelector((state: any) => state.toolkit.user)

    const [chosenProjectName, setChosenProjectName]: any = useState<string>("")
    const [chosenProjectDescription, setChosenProjectDescription]: any = useState("")
    const [searchProjectName, setSearchProjectName] = useState("")
    const [searchProjectDescription, setSearchProjectDescription] = useState("")
    const [chosenSortDate, setChosenSortDate] = useState("ASC")
    const [chosenSortCost, setChosenSortCost] = useState("ASC")

    const {scrollY} = useScrollTopValue()

    return (
        <div className="section-table__head">
            <div className="section-table__head-row">
                <div className="section-table__head-th visible-on-mob">
                                <span className="section-table__main--param">
                                    <span>№</span>
                                    <span>
                                        <div className="section-table__main--sort drop-down-absolute is-mode-1">
                                            <button
                                                className="section-table__main--sort-target drop-down-absolute__target"
                                                data-drop-down-target="date-sort-mob" type="button">
                                                <svg width="13" height="13" viewBox="0 0 13 13">
                                                    <use xlinkHref="#calendar-selected"></use>
                                                </svg>
                                                <Translate>costs_page.table.date</Translate>
                                                <svg width="10" height="15" viewBox="0 0 11 15">
                                                    <use xlinkHref="#sort-up-down"></use>
                                                </svg>
                                            </button>
                                            <div
                                                className="section-table__main--sort-block drop-down-absolute__block"
                                                id="date-sort" style={{minWidth: "150px", transform: `translateY(${-scrollY}px)`}}>
                                    <ul className="drop-down__list drop-down__list-date">
                                        <li className={` ${chosenSortDate === "ASC" && "is-active"}`}>
                                            <a onClick={_ => {
                                                setSortByDate("ASC")
                                                setChosenSortDate("ASC")
                                                setSortByCost("")
                                                setChosenSortCost("")
                                            }}>
                                                Oldest first
                                            </a>
                                        </li>
                                        <li className={` ${chosenSortDate === "DESC" && "is-active"}`}>
                                            <a onClick={_ => {
                                                setSortByDate("DESC")
                                                setChosenSortDate("DESC")
                                                setSortByCost("")
                                                setChosenSortCost("")
                                            }}>
                                                Newest first
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
                <div className="section-table__head-th visible-on-desktop">
                    <div ref={activeDate.rootEl} className="section-table__main--sort drop-down-absolute is-center">
                        <button
                            className={isActiveDate ? "section-table__main--sort-target drop-down-absolute__target is-active" : "section-table__main--sort-target drop-down-absolute__target"}
                            data-drop-down-target="date-sort-2" type="button"
                            onClick={_ => setIsActiveDate(prev => !prev)}>
                            <svg width="13" height="13" viewBox="0 0 13 13">
                                <use xlinkHref="#calendar-selected"></use>
                            </svg>
                            <Translate>costs_page.table.date</Translate>
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
                                        setSortByCost("")
                                        setChosenSortCost("")
                                        setIsActiveDate(false)
                                    }}>
                                        Oldest first
                                    </a>
                                </li>
                                <li className={` ${chosenSortDate === "DESC" && "is-active"}`}>
                                    <a onClick={_ => {
                                        setSortByDate("DESC")
                                        setChosenSortDate("DESC")
                                        setSortByCost("")
                                        setChosenSortCost("")
                                        setIsActiveDate(false)
                                    }}>
                                        Newest first
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="section-table__head-th">
                    <TableHeaderProjects title={"timesheet_page.table.project_num"} setFilterByProjectName={setFilterByProjectName}
                                         isActiveBlock={isActiveProjectName} setIsActiveBlock={setIsActiveProjectName} icon={"#project"}/>
                </div>
                <div className="section-table__head-th">
                    <TableHeaderProjects title={"timesheet_page.table.project_description"} setFilterByProjectName={setFilterByProjectName}
                                         isActiveBlock={isActiveProjectDescription} setIsActiveBlock={setIsActiveProjectDescription} icon={"#comments"}/>
                </div>
                <div className="section-table__head-th">
                    <span className="section-table__main--param">
                        <svg width="13" height="13" viewBox="0 0 13 13">
                            <use xlinkHref="#pin"></use>
                        </svg>
                        <Translate>costs_page.table.expense_description</Translate>
                    </span>
                </div>
                <div ref={activeCost.rootEl} className="section-table__head-th">
                    <div className={`section-table__main--func drop-down-absolute`}>
                        <button onClick={_ => setIsActiveCost(prev => !prev)} className={`section-table__main--func-target drop-down-absolute__target ${isActiveCost && "is-active"}`}
                                data-drop-down-target="cost-sort" type="button">
                            <svg width="13" height="13" viewBox="0 0 20 20">
                                <use xlinkHref="#money"></use>
                            </svg>
                            <Translate>costs_page.table.cost</Translate> (UAH)
                            <svg width="10" height="15" viewBox="0 0 11 15">
                                <use xlinkHref="#sort-up-down"></use>
                            </svg>
                        </button>
                        <div
                            className={`section-table__main--func-block drop-down-absolute__block is-right-default ${isActiveCost && "is-active"}`}
                            id="cost-sort" style={{minWidth: "150px", transform: `translateY(${-scrollY}px)`, right: "20px"}}>
                            <ul className="drop-down__list drop-down__list-date">
                                <li className={chosenSortCost === "ASC" ? "is-active" : ""}>
                                    <a onClick={_ => {
                                        setSortByCost("ASC")
                                        setChosenSortCost("ASC")
                                        setChosenSortDate("")
                                        setSortByDate("")
                                        setIsActiveCost(false)
                                    }}>
                                        Ascending
                                    </a>
                                </li>
                                <li className={chosenSortCost === "DESC" ? "is-active" : ""}>
                                    <a onClick={_ => {
                                        setSortByCost("DESC")
                                        setChosenSortCost("DESC")
                                        setChosenSortDate("")
                                        setSortByDate("")
                                        setIsActiveCost(false)
                                    }}>
                                        Descending
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
