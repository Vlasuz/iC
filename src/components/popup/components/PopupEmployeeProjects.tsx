import React, {useContext, useEffect, useState} from 'react'
import {useSelector} from 'react-redux';
import {IsPopupActiveContext} from "../PopupList";
import {IProject} from "../../../models";
import {PopupClose} from "./PopupClose";
import SimpleBar from "simplebar-react";

interface IPopupEmployeeProjectsProps {
    isOpenProjects: boolean
    setIsOpenProjects: any
    data: any
    setChosenProjects: any
    chosenProjects: IProject[]
}

export const PopupEmployeeProjects: React.FC<IPopupEmployeeProjectsProps> = ({
                                                                                 isOpenProjects,
                                                                                 setIsOpenProjects,
                                                                                 data,
                                                                                 setChosenProjects,
                                                                                 chosenProjects
                                                                             }) => {

    const projects: IProject[] = useSelector((state: any) => state.toolkit.projects)

    const [searchValue, setSearchValue] = useState("")

    const handleSelectProject = (proj: IProject) => {
        if (chosenProjects?.some(item => item.id === proj.id)) {
            setChosenProjects(chosenProjects.filter(item => item.id !== proj.id))
        } else {
            setChosenProjects((prev: any) => [...prev, proj])
        }
    }

    const handleCheckedAll = () => {
        setChosenProjects(projects.length !== chosenProjects.length ? projects : [])
    }

    useEffect(() => {
        if (data?.all_projects) {
            setChosenProjects(projects)
        } else {
            setChosenProjects(data?.projects ?? [])
        }
    }, [data])

    return (
        <div className={"sub-popup-employee popup is-sub" + (isOpenProjects ? " is-active" : "")}
             id="edit-sub-popup-employee" style={{display: "flex"}}>
            <div className="sub-popup-employee__wrapper popup-wrapper">
                <div className="sub-popup-employee__bg popup-bg" onClick={_ => setIsOpenProjects(false)}></div>
                <div className="sub-popup-employee__body popup-body">
                    <PopupClose/>
                    <div className="sub-popup-employee__body--wrapper">
                        <button type="button" className="sub-popup-employee__close-btn popup-close-btn"
                                onClick={_ => setIsOpenProjects(false)} title="Close">
                            <svg width="15" height="15" viewBox="0 0 15 15">
                                <use xlinkHref="#close"></use>
                            </svg>
                        </button>
                        <SimpleBar autoHide={false} className="sub-popup-employee__container popup-container">
                            <ul className="popup-checkbox-list">
                                <li>
                                    <label className="popup-checkbox">
                                        <input type="checkbox" onChange={handleCheckedAll}
                                               checked={projects?.length === chosenProjects?.length}
                                               name="All projects" className="popup-checkbox__input all-check"/>
                                        <span className="popup-checkbox__element">
                                                <svg width="11" height="8" viewBox="0 0 11 8">
                                                    <use xlinkHref="#check"></use>
                                                </svg>
                                            </span>
                                        <span className="popup-checkbox__text">
                                            All projects
                                        </span>
                                    </label>
                                </li>

                                {
                                    projects.length && projects
                                        ?.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()))
                                        ?.map(project =>
                                            <li key={project.id}>
                                                <label className="popup-checkbox">
                                                    <input onChange={_ => handleSelectProject(project)}
                                                           checked={chosenProjects?.some(item => item.id === project.id)}
                                                           type="checkbox" name={project.name}
                                                           className="popup-checkbox__input"/>
                                                    <span className="popup-checkbox__element">
                                                <svg width="11" height="8" viewBox="0 0 11 8">
                                                    <use xlinkHref="#check"></use>
                                                </svg>
                                            </span>
                                                    <span className="popup-checkbox__text" style={{whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden"}}>
                                                    {project.name}_{project.description}
                                                </span>
                                                </label>
                                            </li>
                                        )
                                }


                            </ul>
                        </SimpleBar>
                        <div className="sub-popup-employee__search">
                            <label>
                                <input type="search" name="search" required placeholder="Search a project"
                                       onChange={e => setSearchValue(e.target.value)} className="input"/>
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
        </div>
    )
}
