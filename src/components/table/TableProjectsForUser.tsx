import React, {useEffect, useState} from 'react'
import {IProject, IUser} from "../../models";
import {useSelector} from "react-redux";
import {useClickOutside} from "../../hooks/ClickOutside";
import SimpleBar from "simplebar-react";
import {Translate} from "../translate/Translate";

interface ITableProjectsForUserProps {
    setProjectData: any
    projectData: any
    projectList?: IProject[]
}

export const TableProjectsForUser: React.FC<ITableProjectsForUserProps> = ({
                                                                               setProjectData,
                                                                               projectData,
                                                                               projectList
                                                                           }) => {

    const userData: IUser = useSelector((state: any) => state.toolkit.user)

    const [searchValue, setSearchValue] = useState<string>("")
    const [project, setProject] = useState<IProject | undefined>()

    const [isActiveSelectProjects, setIsActiveSelectProjects] = useState(false)
    const {rootEl} = useClickOutside(setIsActiveSelectProjects)

    const handleChooseProject = (e: React.MouseEvent<HTMLAnchorElement>, item: IProject) => {
        e.preventDefault()

        if(item?.id === projectData?.id) {
            setProject(undefined)
            setProjectData(undefined)
        } else {
            setProject(item)
            setProjectData(item)
        }

        setIsActiveSelectProjects(false)
    }

    useEffect(() => {
        setSearchValue("")
    }, [isActiveSelectProjects])

    return (
        <div ref={rootEl}
             className={`section-table__add-task--project drop-down ${isActiveSelectProjects && "is-active"}`}>
            <button onClick={_ => setIsActiveSelectProjects(prev => !prev)}
                    className="section-table__add-task--project-target drop-down__target"
                    type="button">

                {projectData?.name ?? projectData?.name ?? <Translate>timesheet_page.top_part.choose_project</Translate>}

                <svg width="10" height="7" viewBox="0 0 10 7"
                     className="drop-down__target--arrow">
                    <use xlinkHref="#drop-down-arrow"></use>
                </svg>
            </button>
            <div className="section-table__main--project-name-block drop-down__block">
                <div className="project-popup">
                    <SimpleBar className="project-popup__body" autoHide={false}>
                        {!projectList?.length && !!userData?.used_projects?.length &&
                            <div className="project-popup__block">
                                <h2><Translate>timesheet_page.popups.commonly_used</Translate></h2>
                                <ul className="project-popup__list">

                                    {
                                        userData?.used_projects
                                            ?.slice(0, 5)
                                            ?.filter(item => !item.project.archive)
                                            ?.filter(item => searchValue ? item.project.name.toLowerCase().includes(searchValue.toLowerCase()) || item.project.description.toLowerCase().includes(searchValue.toLowerCase()) : item)
                                            ?.map(item =>
                                                <li key={item.project.id}
                                                    className={`project-popup__item ${projectData?.id === item?.project?.id && "is-active"}`}>
                                                    <a href="#" onClick={e => handleChooseProject(e, item.project)}>
                                                        {item.project.name}_{item.project.description}
                                                    </a>
                                                </li>
                                            )
                                    }

                                </ul>
                            </div>}
                        <div className="project-popup__block">
                            <h2><Translate>timesheet_page.popups.all_projects</Translate></h2>
                            <ul className="project-popup__list">

                                {
                                    !projectList?.length ? userData?.projects_list
                                            ?.filter(item => searchValue ? item.name.toLowerCase().includes(searchValue.toLowerCase()) || item.description.toLowerCase().includes(searchValue.toLowerCase()) : item)
                                            ?.map(item =>
                                                <li key={item.id}
                                                    className={`project-popup__item ${projectData?.id === item?.id && "is-active"}`}>
                                                    <a href="#" onClick={e => handleChooseProject(e, item)}>
                                                        {item.name}_{item.description}
                                                    </a>
                                                </li>
                                            ) :
                                        projectList
                                            ?.filter(item => searchValue ? item.name.toLowerCase().includes(searchValue.toLowerCase()) || item.description.toLowerCase().includes(searchValue.toLowerCase()) : item)
                                            ?.map(item =>
                                                <li key={item.id}
                                                    className={`project-popup__item ${projectData?.id === item?.id && "is-active"}`}>
                                                    <a href="#" onClick={e => handleChooseProject(e, item)}>
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
                            <input type="search" name="search" className="input"
                                   onChange={e => setSearchValue(e.target.value)} value={searchValue}
                                   placeholder="Search a project" required/>
                        </label>
                        <button className="btn is-grey" type="submit">
                            Search
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
