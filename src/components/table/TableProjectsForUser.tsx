import React, {useEffect, useState} from 'react'
import {IAllUserProjects, IProject, IUser} from "../../models";
import {useDispatch, useSelector} from "react-redux";
import {useClickOutside} from "../../hooks/ClickOutside";
import SimpleBar from "simplebar-react";
import {Translate} from "../translate/Translate";
import {useTranslation} from "react-i18next";
import axios from "axios";
import {getApiLink} from "../../functions/getApiLink";
import {GetAccessToken} from "../../api/GetAccessToken";
import {getBearer} from "../../functions/getBearer";

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

    const dispatch = useDispatch()

    // const getUserProjects = () => {
    //     getBearer("get")
    //     axios.get<IAllUserProjects>(getApiLink('/api/user/projects_info/')).then(({data}) => {
    //         console.log(data)
    //         dispatch(setAllUserProjects(data))
    //     }).catch(er => {
    //         er?.response?.status === 401 && GetAccessToken(dispatch, getUserProjects)
    //     })
    // }

    // useEffect(getUserProjects, [])

    const [searchValue, setSearchValue] = useState<string>("")
    const [project, setProject] = useState<IProject | undefined>()

    const allUserProjects: IAllUserProjects = useSelector((state: any) => state.toolkit.allUserProjects)

    const [isActiveSelectProjects, setIsActiveSelectProjects] = useState(false)
    const {rootEl} = useClickOutside(setIsActiveSelectProjects)

    const handleChooseProject = (e: React.MouseEvent<HTMLAnchorElement>, item: IProject) => {
        e.preventDefault()

        if (item?.id === projectData?.id) {
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

    const {t} = useTranslation();

    return (
        <div ref={rootEl}
             className={`section-table__add-task--project drop-down ${isActiveSelectProjects && "is-active"}`}>
            <button onClick={_ => setIsActiveSelectProjects(prev => !prev)}
                    className="section-table__add-task--project-target drop-down__target"
                    type="button">

                {projectData?.name ?? projectData?.name ??
                    <Translate>timesheet_page.top_part.choose_project</Translate>}

                <svg width="10" height="7" viewBox="0 0 10 7"
                     className="drop-down__target--arrow">
                    <use xlinkHref="#drop-down-arrow"></use>
                </svg>
            </button>
            <div className="section-table__main--project-name-block drop-down__block">
                <div className="project-popup">
                    <SimpleBar className="project-popup__body" autoHide={false}>
                        <div className="project-popup__block">
                            {/*<h2>*/}
                            {/*    All projects*/}
                            {/*</h2>*/}
                            <ul className="project-popup__list">
                                <li className={`project-popup__item project-popup__item_all ${!projectData ? " is-active" : ""}`}>
                                    <a onClick={_ => {
                                        setProject(undefined)
                                        setProjectData(undefined)
                                        setIsActiveSelectProjects(false)
                                    }}>
                                        <Translate>employees_admin.table.all_projects</Translate>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        {!projectList?.length && !!allUserProjects?.used_projects?.length &&
                            <div className="project-popup__block">
                                <h2><Translate>timesheet_page.popups.commonly_used</Translate></h2>
                                <ul className="project-popup__list">

                                    {
                                        allUserProjects?.used_projects
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
                                    !projectList?.length ? allUserProjects?.projects_list
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
                            <input type="text" className="input" name={'search'}
                                   onChange={e => setSearchValue(e.target.value)} value={searchValue}
                                   placeholder={`${t("projects_admin.search_a_project")}`}
                            />
                        </label>
                        <button className="btn is-grey" type="submit">
                            <Translate>projects_admin.search</Translate>
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
