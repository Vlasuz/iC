import React, {useEffect, useState} from 'react'
import {useClickOutside} from "../../../../hooks/ClickOutside";
import {IUser} from "../../../../models";
import {useSelector} from "react-redux";

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
    const activeProjectName = useClickOutside(setIsActiveProjectName)

    const [isActiveProjectDescription, setIsActiveProjectDescription] = useState(false)
    const activeProjectDescription = useClickOutside(setIsActiveProjectDescription)

    const [isActiveCost, setIsActiveCost] = useState(false)
    const activeCost = useClickOutside(setIsActiveCost)

    const userData: IUser = useSelector((state: any) => state.toolkit.user)

    const [chosenProjectName, setChosenProjectName]: any = useState<string>("")
    const [chosenProjectDescription, setChosenProjectDescription]: any = useState("")
    const [chosenSortDate, setChosenSortDate] = useState("ASC")
    const [chosenSortCost, setChosenSortCost] = useState("ASC")

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
                                                Date
                                                <svg width="10" height="15" viewBox="0 0 11 15">
                                                    <use xlinkHref="#sort-up-down"></use>
                                                </svg>
                                            </button>
                                            <div
                                                className="section-table__main--sort-block drop-down-absolute__block"
                                                id="date-sort" style={{minWidth: "150px"}}>
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
                            Date
                            <svg width="10" height="15" viewBox="0 0 11 15">
                                <use xlinkHref="#sort-up-down"></use>
                            </svg>
                        </button>
                        <div
                            className={isActiveDate ? "section-table__main--sort-block drop-down-absolute__block is-active" : "section-table__main--sort-block drop-down-absolute__block"}
                            id="date-sort-2" style={{minWidth: "150px"}}>
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
                </div>
                <div className="section-table__head-th">
                    <div ref={activeProjectName.rootEl}
                         className={isActiveProjectName ? "section-table__main--project-name drop-down-absolute is-active" : "section-table__main--project-name drop-down-absolute"}>
                        <button
                            className="section-table__main--project-name-target drop-down-absolute__target"
                            data-drop-down-target="project-name" type="button"
                            onClick={_ => setIsActiveProjectName(prev => !prev)}>
                            <svg width="13" height="13" viewBox="0 0 13 13">
                                <use xlinkHref="#project"></use>
                            </svg>
                            Project num.
                            <svg width="10" height="7" viewBox="0 0 10 7"
                                 className="drop-down-absolute__target--arrow">
                                <use xlinkHref="#drop-down-arrow"></use>
                            </svg>
                        </button>
                        <div className={isActiveProjectName ? "section-table__main--project-name-block drop-down-absolute__block is-active" : "section-table__main--project-name-block drop-down-absolute__block"}
                             id="project-name">
                            <div className="project-popup">
                                <div className="project-popup__body" data-simplebar
                                     data-simplebar-auto-hide="false">
                                    <div className="project-popup__block">
                                        <h2>Сommonly used</h2>
                                        <ul className="project-popup__list">

                                            {
                                                userData.projects?.map(item =>
                                                    <li key={item.id} className={`project-popup__item ${chosenProjectName === item.name ? " is-active" : ""}`}>
                                                        <a onClick={_ => {
                                                            setChosenProjectName((prev: string) => prev === item.name ? "" : item.name)
                                                            setFilterByProjectName((prev: string) => prev === item.name ? "" : item.name)
                                                        }}>
                                                            {item.name}_{item.description}
                                                        </a>
                                                    </li>
                                                )
                                            }

                                        </ul>
                                    </div>
                                    {/*<div className="project-popup__block">*/}
                                    {/*    <h2>All projects</h2>*/}
                                    {/*    <ul className="project-popup__list">*/}
                                    {/*        <li className="project-popup__item">*/}
                                    {/*            <a href="#">*/}
                                    {/*                61xA210739_Kremenchuk Bridge supervision*/}
                                    {/*            </a>*/}
                                    {/*        </li>*/}
                                    {/*    </ul>*/}
                                    {/*</div>*/}
                                </div>
                                <form className="project-popup__search">
                                    <label>
                                        <input type="search" name="search" className="input"
                                               placeholder="Search a project" required/>
                                    </label>
                                    <button className="btn is-grey" type="submit">
                                        Search
                                        <svg width="15" height="15" viewBox="0 0 15 15">
                                            <use xlinkHref="#search"></use>
                                        </svg>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section-table__head-th">
                    <div ref={activeProjectDescription.rootEl}
                         className={isActiveProjectDescription ? "section-table__main--project-name drop-down-absolute is-active" : "section-table__main--project-name drop-down-absolute"}>
                        <button
                            onClick={_ => setIsActiveProjectDescription(prev => !prev)}
                            className="section-table__main--project-name-target drop-down-absolute__target"
                            data-drop-down-target="project-description" type="button">
                            <svg width="13" height="13" viewBox="0 0 13 13">
                                <use xlinkHref="#comments"></use>
                            </svg>
                            Project description
                            <svg width="10" height="7" viewBox="0 0 10 7"
                                 className="drop-down-absolute__target--arrow">
                                <use xlinkHref="#drop-down-arrow"></use>
                            </svg>
                        </button>
                        <div
                            className={isActiveProjectDescription ? "section-table__main--project-name-block drop-down-absolute__block is-active" : "section-table__main--project-name-block drop-down-absolute__block"}
                            id="project-description">
                            <div className="project-popup">
                                <div className="project-popup__body" data-simplebar
                                     data-simplebar-auto-hide="false">
                                    <div className="project-popup__block">
                                        <h2>Сommonly used</h2>
                                        <ul className="project-popup__list">

                                            {
                                                userData.projects?.map(item =>
                                                    <li key={item.id} className={`project-popup__item ${chosenProjectDescription === item.description ? " is-active" : ""}`}>
                                                        <a onClick={_ => {
                                                            setChosenProjectDescription((prev: string) => prev === item.description ? "" : item.description)
                                                            setFilterByProjectDescription((prev: string) => prev === item.description ? "" : item.description)
                                                        }}>
                                                            {item.name}_{item.description}
                                                        </a>
                                                    </li>
                                                )
                                            }

                                        </ul>
                                    </div>
                                    {/*<div className="project-popup__block">*/}
                                    {/*    <h2>All projects</h2>*/}
                                    {/*    <ul className="project-popup__list">*/}
                                    {/*        <li className="project-popup__item">*/}
                                    {/*            <a href="#">*/}
                                    {/*                61xA210739_Kremenchuk Bridge supervision*/}
                                    {/*            </a>*/}
                                    {/*        </li>*/}
                                    {/*    </ul>*/}
                                    {/*</div>*/}
                                </div>
                                <form className="project-popup__search">
                                    <label>
                                        <input type="search" name="search" className="input"
                                               placeholder="Search a project" required/>
                                    </label>
                                    <button className="btn is-grey" type="submit">
                                        Search
                                        <svg width="15" height="15" viewBox="0 0 15 15">
                                            <use xlinkHref="#search"></use>
                                        </svg>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section-table__head-th">
                    <span className="section-table__main--param">
                        <svg width="13" height="13" viewBox="0 0 13 13">
                            <use xlinkHref="#pin"></use>
                        </svg>
                        Description of the expence
                    </span>
                </div>
                <div ref={activeCost.rootEl} className="section-table__head-th">
                    <div className={`section-table__main--func drop-down-absolute`}>
                        <button onClick={_ => setIsActiveCost(prev => !prev)} className={`section-table__main--func-target drop-down-absolute__target ${isActiveCost && "is-active"}`}
                                data-drop-down-target="cost-sort" type="button">
                            <svg width="13" height="13" viewBox="0 0 20 20">
                                <use xlinkHref="#money"></use>
                            </svg>
                            Cost (UAH)
                            <svg width="10" height="15" viewBox="0 0 11 15">
                                <use xlinkHref="#sort-up-down"></use>
                            </svg>
                        </button>
                        <div
                            className={`section-table__main--func-block drop-down-absolute__block is-right-default ${isActiveCost && "is-active"}`}
                            id="cost-sort" style={{minWidth: "150px"}}>
                            <ul className="drop-down__list drop-down__list-date">
                                <li className={chosenSortCost === "ASC" ? "is-active" : ""}>
                                    <a onClick={_ => {
                                        setSortByCost("ASC")
                                        setChosenSortCost("ASC")
                                        setChosenSortDate("")
                                        setSortByDate("")
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
