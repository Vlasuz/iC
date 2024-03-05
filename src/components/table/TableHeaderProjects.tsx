import React, {useEffect, useState} from 'react'
import SimpleBar from "simplebar-react";
import {Translate} from "../translate/Translate";
import {useScrollTopValue} from "../../hooks/ScrollTopValue";
import {IProject, IUser} from "../../models";
import {useDispatch, useSelector} from "react-redux";
import {useClickOutside} from "../../hooks/ClickOutside";
import {getBearer} from "../../functions/getBearer";
import axios from "axios";
import {getApiLink} from "../../functions/getApiLink";
import {GetAccessToken} from "../../api/GetAccessToken";

interface ITableHeaderProjectsProps {
    setFilterByProjectName: any
    setIsActiveBlock: any
    isActiveBlock: boolean
    title: string
    icon: string
}

interface IAllUserProjects {
    used_projects: {
        project: IProject,
        count: number
    }[]
    projects_list: IProject[]
}


export const TableHeaderProjects: React.FC<ITableHeaderProjectsProps> = ({
                                                                             setFilterByProjectName,
                                                                             setIsActiveBlock,
                                                                             isActiveBlock,
                                                                             title,
                                                                             icon
                                                                         }) => {

    const [searchProjectName, setSearchProjectName]: any = useState<string>("")
    const [chosenProjectName, setChosenProjectName]: any = useState<string>("")
    const [allUserProjects, setAllUserProjects] = useState<IAllUserProjects>()

    const dispatch = useDispatch()

    const {rootEl} = useClickOutside(setIsActiveBlock)

    const userData: IUser = useSelector((state: any) => state.toolkit.user)

    const {scrollY} = useScrollTopValue()

    const getUserProjects = () => {
        getBearer("get")
        axios.get<IAllUserProjects>(getApiLink('/api/user/projects_info/')).then(({data}) => {
            console.log(data)
            setAllUserProjects(data)
        }).catch(er => {
            er?.response?.status === 401 && GetAccessToken(dispatch, getUserProjects)
        })
    }
    useEffect(getUserProjects, [])

    useEffect(() => {
        setSearchProjectName("")
    }, [isActiveBlock])

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
                            {/*<h2>*/}
                            {/*    All projects*/}
                            {/*</h2>*/}
                            <ul className="project-popup__list">
                                <li className={`project-popup__item project-popup__item_all ${chosenProjectName === "" ? " is-active" : ""}`}>
                                    <a onClick={_ => {
                                        setChosenProjectName("")
                                        setFilterByProjectName("")
                                        setIsActiveBlock(false)
                                    }}>
                                        <Translate>employees_admin.table.all_projects</Translate>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="project-popup__block">
                            <h2><Translate>timesheet_page.popups.commonly_used</Translate></h2>
                            <ul className="project-popup__list">

                                {
                                    allUserProjects?.used_projects
                                        ?.slice(0, 5)
                                        ?.filter(item => item.project.name.toLowerCase().includes(searchProjectName.toLowerCase()) || item.project.description.toLowerCase().includes(searchProjectName.toLowerCase()))
                                        ?.map(item =>
                                            <li key={item.project.id}
                                                className={`project-popup__item ${chosenProjectName === item.project.name ? " is-active" : ""}`}>
                                                <a onClick={_ => {
                                                    setChosenProjectName((prev: string) => prev === item.project.name ? "" : item.project.name)
                                                    setFilterByProjectName((prev: string) => prev === item.project.name ? "" : item.project.name)
                                                    setIsActiveBlock(false)
                                                }}>
                                                    {item.project.name}_{item.project.description}
                                                </a>
                                            </li>
                                        )
                                }

                            </ul>
                        </div>
                        <div className="project-popup__block">
                            <h2><Translate>timesheet_page.popups.all_projects</Translate></h2>
                            <ul className="project-popup__list">

                                {
                                    allUserProjects?.projects_list
                                        ?.filter(item => item.name.toLowerCase().includes(searchProjectName.toLowerCase()) || item.description.toLowerCase().includes(searchProjectName.toLowerCase()))
                                        ?.map(item =>
                                            <li key={item.id}
                                                className={`project-popup__item ${chosenProjectName === item.name ? " is-active" : ""}`}>
                                                <a onClick={_ => {
                                                    setChosenProjectName((prev: string) => prev === item.name ? "" : item.name)
                                                    setFilterByProjectName((prev: string) => prev === item.name ? "" : item.name)
                                                    setIsActiveBlock(false)
                                                }}>
                                                    {item.name}_{item.description}
                                                </a>
                                            </li>
                                        )
                                }
                            </ul>
                        </div>
                    </SimpleBar>
                    <div className="project-popup__search">
                        <label>
                            <input onChange={e => setSearchProjectName(e.target.value)} value={searchProjectName}
                                   type="search" name="search" className="input"
                                   required/>
                            <span className="placeholder">
                                            {!searchProjectName &&
                                                <Translate>timesheet_page.top_part.search_a_project</Translate>}
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
