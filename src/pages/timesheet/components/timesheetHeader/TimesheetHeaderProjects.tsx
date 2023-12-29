import React, {useEffect, useState} from 'react'
import {IProject, IUser} from "../../../../models";
import {useClickOutside} from "../../../../hooks/ClickOutside";
import {useSelector} from "react-redux";
import { Translate } from '../../../../components/translate/Translate';

interface ITimesheetHeaderProjectsProps {
    setProjectData: any
    projectData: any
}

export const TimesheetHeaderProjects: React.FC<ITimesheetHeaderProjectsProps> = ({setProjectData, projectData}) => {

    const userData: IUser = useSelector((state: any) => state.toolkit.user)

    const [searchValue, setSearchValue] = useState<string>("")
    const [project, setProject] = useState<IProject | null>(null)

    const [isActiveSelectProjects, setIsActiveSelectProjects] = useState(false)
    const {rootEl} = useClickOutside(setIsActiveSelectProjects)

    const handleChooseProject = (e: React.MouseEvent<HTMLAnchorElement>, item: IProject) => {
        e.preventDefault()
        setProject(item)
        setProjectData(item)
        setIsActiveSelectProjects(false)
    }

    const isEditItem = !project && projectData

    return (
        <div ref={rootEl} className={`section-table__add-task--project drop-down ${isActiveSelectProjects && "is-active"} ${!isEditItem && "is-disabled"}`}>
            <button onClick={_ => !isEditItem && setIsActiveSelectProjects(prev => !prev)} className="section-table__add-task--project-target drop-down__target"
                    type="button">

                {isEditItem?.name ?? project?.name ?? <Translate>timesheet_page.top_part.choose_project</Translate>}

                {!isEditItem && <svg width="10" height="7" viewBox="0 0 10 7"
                      className="drop-down__target--arrow">
                    <use xlinkHref="#drop-down-arrow"></use>
                </svg>}
            </button>
            <div className="section-table__main--project-name-block drop-down__block">
                <div className="project-popup">
                    <div className="project-popup__body" data-simplebar
                         data-simplebar-auto-hide="false">
                        <div className="project-popup__block">
                            <h2>Сommonly used</h2>
                            <ul className="project-popup__list">

                                {
                                    userData?.projects_list?.filter(item => searchValue ? item.name.toLowerCase().includes(searchValue) : item).map(item =>
                                        <li key={item.id} className="project-popup__item">
                                            <a href="#" onClick={e => handleChooseProject(e, item)}>
                                                {item.name}
                                            </a>
                                        </li>
                                    )
                                }

                            </ul>
                        </div>
                        {/*<div className="project-popup__block">*/}
                        {/*    <h2>All projects</h2>*/}
                        {/*    <ul className="project-popup__list">*/}

                        {/*        {*/}
                        {/*            allProjects?.map(item =>*/}
                        {/*                <li className="project-popup__item">*/}
                        {/*                    <a href="#">*/}
                        {/*                        {item.name}*/}
                        {/*                    </a>*/}
                        {/*                </li>*/}
                        {/*            )*/}
                        {/*        }*/}

                        {/*    </ul>*/}
                        {/*</div>*/}
                    </div>
                    <form className="project-popup__search">
                        <label>
                            <input type="search" name="search" className="input" onChange={e => setSearchValue(e.target.value)} value={searchValue} placeholder="Search a project" required/>
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
    )
}
