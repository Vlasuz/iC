import React, {useEffect, useState} from 'react'
import SimpleBar from "simplebar-react";
import {Translate} from "../translate/Translate";
import {useScrollTopValue} from "../../hooks/ScrollTopValue";
import {IUser} from "../../models";
import {useSelector} from "react-redux";
import {useClickOutside} from "../../hooks/ClickOutside";

interface ITableHeaderProjectsProps {
    setFilterByProjectName: any
    setIsActiveBlock: any
    isActiveBlock: boolean
    title: string
    icon: string
}

export const TableHeaderProjects: React.FC<ITableHeaderProjectsProps> = ({setFilterByProjectName, setIsActiveBlock, isActiveBlock, title, icon}) => {

    const [searchProjectName, setSearchProjectName] = useState("")
    const [chosenProjectName, setChosenProjectName]: any = useState<string>("")

    const {rootEl} = useClickOutside(setIsActiveBlock)

    const userData: IUser = useSelector((state: any) => state.toolkit.user)

    const {scrollY} = useScrollTopValue()

    return (
        <div ref={rootEl}
             className={isActiveBlock ? "section-table__main--project-name drop-down-absolute is-active" : "section-table__main--project-name drop-down-absolute"}>
            <button
                onClick={_ => setIsActiveBlock((prev: boolean) => !prev)}
                className="section-table__main--project-name-target drop-down-absolute__target"
                data-drop-down-target="project-description" type="button">
                <svg width="13" height="13" viewBox="0 0 13 13">
                    <use xlinkHref={icon}></use>
                </svg>
                <Translate>{title}</Translate>
                <svg width="10" height="7" viewBox="0 0 10 7"
                     className="drop-down-absolute__target--arrow">
                    <use xlinkHref="#drop-down-arrow"></use>
                </svg>
            </button>

            <div
                style={{transform: `translateY(${-scrollY}px)`}}
                className={isActiveBlock ? "section-table__main--project-name-block drop-down-absolute__block is-active" : "section-table__main--project-name-block drop-down-absolute__block"}>
                <div className="project-popup">
                    <SimpleBar className="project-popup__body">
                        <div className="project-popup__block">
                            <h2>Recently used</h2>
                            <ul className="project-popup__list">

                                {
                                    userData.recent_projects
                                        ?.filter(item => item.project.name.toLowerCase().includes(searchProjectName.toLowerCase()) || item.project.description.toLowerCase().includes(searchProjectName.toLowerCase()))
                                        ?.map(item =>
                                            <li key={item.project.id} className={`project-popup__item ${chosenProjectName === item.project.name ? " is-active" : ""}`}>
                                                <a onClick={_ => {
                                                    setChosenProjectName((prev: string) => prev === item.project.name ? "" : item.project.name)
                                                    setFilterByProjectName((prev: string) => prev === item.project.name ? "" : item.project.name)
                                                    setIsActiveBlock(false)
                                                }}>
                                                    {item.project.name}_{item.project.name}
                                                </a>
                                            </li>
                                        )
                                }

                            </ul>
                        </div>
                        <div className="project-popup__block">
                            <h2>All projects</h2>
                            <ul className="project-popup__list">

                                {
                                    userData.projects_list
                                        ?.filter(item => item.name.toLowerCase().includes(searchProjectName.toLowerCase()) || item.description.toLowerCase().includes(searchProjectName.toLowerCase()))
                                        ?.map(item =>
                                            <li key={item.id} className={`project-popup__item ${chosenProjectName === item.name ? " is-active" : ""}`}>
                                                <a onClick={_ => {
                                                    setChosenProjectName((prev: string) => prev === item.name ? "" : item.name)
                                                    setFilterByProjectName((prev: string) => prev === item.name ? "" : item.name)
                                                    setIsActiveBlock(false)
                                                }}>
                                                    {item.name}_{item.name}
                                                </a>
                                            </li>
                                        )
                                }
                            </ul>
                        </div>
                    </SimpleBar>
                    <div className="project-popup__search">
                        <label>
                            <input onChange={e => setSearchProjectName(e.target.value)} value={searchProjectName} type="search" name="search" className="input"
                                   required/>
                            <span className="placeholder">
                                            {!searchProjectName && <Translate>timesheet_page.top_part.search_a_project</Translate>}
                                        </span>
                        </label>
                        <button className="btn is-grey">
                            <Translate>timesheet_page.top_part.search</Translate>
                            <svg width="15" height="15" viewBox="0 0 15 15">
                                <use xlinkHref="#search"></use>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}
