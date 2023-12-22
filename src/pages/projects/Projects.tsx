import React, {useContext, useEffect, useState} from 'react'
import axios from "axios";
import {getApiLink} from "../../functions/getApiLink";
import {IEmployee, IProject} from "../../models";
import {getBearer} from "../../functions/getBearer";
import {useDispatch, useSelector} from 'react-redux';
import {setEmployeesList, setProjects, setSelectedEmployee} from "../../storage/toolkit";
import {ProjectItem} from "./components/ProjectItem";
import {PopupContext} from "../../App";
import {ProjectStyled} from "./Project.styled";
import SimpleBar from "simplebar-react";
import {CustomSelect1} from "../../components/select/CustomSelect1";
import {RowsPerPage} from "../../constants/RowsPerPage";
import {CustomSelect} from "../../components/customSelect/CustomSelect";
import {TableSelectYear} from "../../components/table/TableSelectYear";
import {TableExport} from "../../components/table/TableExport";
import {Translate} from "../../components/translate/Translate";

interface IProjectsProps {

}

export const Projects: React.FC<IProjectsProps> = () => {

    const projects: IProject[] = useSelector((state: any) => state.toolkit.projects)
    const dispatch = useDispatch()
    const [searchValue, setSearchValue] = useState<string>('')

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        getBearer("get")
        axios.get(getApiLink("/api/admin/project/?search=" + searchValue)).then(({data}) => {
            dispatch(setProjects(data))
        }).catch(er => console.log(getApiLink("/api/admin/project/"), er))
    }

    const setPopup: any = useContext(PopupContext);


    useEffect(() => {
        if (searchValue.length > 0) return;

        getBearer("get")
        axios.get(getApiLink(`/api/admin/project/`)).then(({data}) => {
            dispatch(setProjects(data))
        }).catch(er => console.log(er))
    }, [searchValue])


    const handleChangeRows = (e: any) => {
        console.log(e)
        if (e.value === 0) {
            const data = {
                label: "All",
                value: 999999999
            }
            setPaginationCountStep(data)
            setPaginationCountTo(data.value)
            setPaginationMaximumPages(0)
            return;
        }

        setPaginationCountFrom(0)
        setPaginationCountStep(e)
        setPaginationCountTo(e)
        setPaginationMaximumPages(e.value === 0 ? 0 : Math.ceil(projects.length / e.value))
        const arrayCount = Array?.from({length: Math.ceil(projects?.length / e.value)}, (_, i) => i + 1)

        setPaginationNavigation(arrayCount)
        setPaginationCountTo(paginationCountStep.value)
    }


    // PAGINATION
    const [paginationCountStep, setPaginationCountStep] = useState(RowsPerPage()[0])
    const [paginationCountOfMaximumNavigation] = useState(3)
    const [paginationMaximumPages, setPaginationMaximumPages] = useState(Math.ceil(projects.length / paginationCountStep.value))
    const [paginationCountFrom, setPaginationCountFrom] = useState<number>(0)
    const [paginationCountTo, setPaginationCountTo] = useState<number>(paginationCountStep.value)
    const [paginationNavigation, setPaginationNavigation] = useState<number[]>([])

    const paginationCountOfEndingNavigation = paginationMaximumPages - 5 <= 0 ? 0 : paginationMaximumPages - 5
    const isNearEnd = paginationNavigation?.slice(paginationCountFrom / paginationCountStep.value, (paginationCountOfMaximumNavigation + paginationCountFrom / paginationCountStep.value))[0] + 3 >= paginationNavigation.slice(paginationMaximumPages - 1)[0]

    useEffect(() => {
        const arrayCount = Array?.from({length: Math.ceil(projects?.length / paginationCountStep.value)}, (_, i) => i + 1)

        setPaginationNavigation(arrayCount)
        setPaginationCountTo(paginationCountStep.value)
    }, [projects, paginationMaximumPages])

    useEffect(() => {

        setPaginationCountFrom(0)
        setPaginationMaximumPages(Math.ceil(projects.length / paginationCountStep.value))

    }, [projects])

    const changeNumberPagination = (e: React.MouseEvent<HTMLAnchorElement>, number: number) => {
        e.preventDefault()

        setPaginationCountFrom((paginationCountStep.value * number) - paginationCountStep.value)
        setPaginationCountTo(paginationCountStep.value * number)
    }
    const nextNumberPagination = () => {
        if (paginationCountTo / paginationCountStep.value === paginationMaximumPages) return;

        setPaginationCountFrom(prev => prev + paginationCountStep.value)
        setPaginationCountTo(prev => prev + paginationCountStep.value)
    }
    const prevNumberPagination = () => {
        if (paginationCountTo / paginationCountStep.value === 1) return;

        setPaginationCountFrom(prev => prev - paginationCountStep.value)
        setPaginationCountTo(prev => prev - paginationCountStep.value)
    }
    // PAGINATION

    return (
        <ProjectStyled className="section-table">
            <div className="section-table__header">
                <div className="section-table__header--row is-always-row">
                    <div className="section-table__header--col">
                        <h1 className="section-table__title title">
                            <Translate>projects_admin.projects</Translate>
                        </h1>
                    </div>
                </div>
                <div className="section-table__header--row row-2">
                    <div className="section-table__header--col">
                        <a onClick={_ => setPopup({popup: "add-project-popup"})}
                           className="section-table__add btn open-popup">
                            <Translate>projects_admin.add_new_project</Translate>
                            <svg width="16" height="15" viewBox="0 0 16 15">
                                <use xlinkHref="#plus"></use>
                            </svg>
                        </a>
                        <form onSubmit={handleSearch} className="section-table__search">
                            <label className="section-table__search--label">
                                <input type="search" name="search"
                                       className="section-table__search--input"
                                       onChange={e => setSearchValue(e.target.value)} value={searchValue}/>
                                <span className="placeholder">
                                    {!searchValue.length ?
                                        <Translate>employees_admin.others.search_a_project</Translate> : ""}
                                </span>
                            </label>
                            <button className="section-table__search--submit btn is-grey is-min-on-mob"
                                    type="submit">
                                <Translate>projects_admin.search</Translate>
                                <svg width="15" height="15" viewBox="0 0 15 15">
                                    <use xlinkHref="#search"></use>
                                </svg>
                            </button>
                        </form>
                    </div>
                    <div className="section-table__header--col">

                        <TableSelectYear/>

                        <TableExport/>

                    </div>
                </div>
            </div>
            <div className="section-table__main is-row-mode table-projects visible-on-desktop add-border">
                <SimpleBar autoHide={false}>
                    <div className="section-table__main--container">
                        <div className="section-table__main--wrapper">
                            <div className="section-table__head">
                                <div className="section-table__head-row">
                                    <div className="section-table__head-th">
										<span className="section-table__main--param">
											№
										</span>
                                    </div>
                                    <div className="section-table__head-th">
										<span className="section-table__main--param is-center">
											<svg width="13" height="13" viewBox="0 0 13 13">
												<use xlinkHref="#project"></use>
											</svg>
											<Translate>projects_admin.project_name</Translate>
										</span>
                                    </div>
                                    <div className="section-table__head-th">
										<span className="section-table__main--param">
											<svg width="13" height="13" viewBox="0 0 13 13">
												<use xlinkHref="#comments"></use>
											</svg>
											<Translate>projects_admin.project_description</Translate>
										</span>
                                    </div>
                                </div>
                            </div>
                            <div className="section-table__body">

                                {
                                    !!projects.length && projects
                                        ?.filter(item => !item.archive)
                                        ?.slice(paginationCountFrom, paginationCountTo)
                                        ?.filter((item, index) => index < Math.ceil(paginationCountStep.value / 2))
                                        ?.map((project: IProject, index: number) =>
                                            <ProjectItem key={project.id} data={project}
                                                         index={paginationCountFrom + index}/>
                                        )
                                }


                            </div>
                        </div>
                        <div className="section-table__main--wrapper">
                            <div className="section-table__head">
                                <div className="section-table__head-row">
                                    <div className="section-table__head-th">
										<span className="section-table__main--param">
											№
										</span>
                                    </div>
                                    <div className="section-table__head-th">
										<span className="section-table__main--param is-center">
											<svg width="13" height="13" viewBox="0 0 13 13">
												<use xlinkHref="#project"></use>
											</svg>
											<Translate>projects_admin.project_name</Translate>
										</span>
                                    </div>
                                    <div className="section-table__head-th">
										<span className="section-table__main--param">
											<svg width="13" height="13" viewBox="0 0 13 13">
												<use xlinkHref="#comments"></use>
											</svg>
											<Translate>projects_admin.project_description</Translate>
										</span>
                                    </div>
                                </div>
                            </div>
                            <div className="section-table__body">

                                {
                                    !!projects.length && projects
                                        ?.slice(paginationCountFrom, paginationCountTo)
                                        ?.filter((item, index) => index >= Math.ceil(paginationCountStep.value / 2))
                                        ?.map((project: IProject, index: number) =>
                                            <ProjectItem key={project.id} data={project}
                                                         index={Math.ceil((paginationCountFrom + index) + paginationCountStep.value / 2)}/>
                                        )
                                }

                            </div>
                        </div>
                    </div>
                </SimpleBar>
            </div>
            <div className="section-table__main table-projects visible-on-mob">
                <SimpleBar autoHide={false}>
                    <div className="section-table__main--container">
                        <div className="section-table__main--wrapper">
                            <div className="section-table__head">
                                <div className="section-table__head-row">
                                    <div className="section-table__head-th visible-on-mob">
										<span className="section-table__main--param">
											<span>№</span>
											<span>
												<svg width="13" height="13" viewBox="0 0 13 13">
													<use xlinkHref="#project"></use>
												</svg>
												<Translate>projects_admin.project_name</Translate>
											</span>
										</span>
                                    </div>
                                    <div className="section-table__head-th visible-on-desktop">
										<span className="section-table__main--param">
											№
										</span>
                                    </div>
                                    <div className="section-table__head-th visible-on-desktop">
										<span className="section-table__main--param">
											<svg width="13" height="13" viewBox="0 0 13 13">
												<use xlinkHref="#project"></use>
											</svg>
											<Translate>projects_admin.project_name</Translate>
										</span>
                                    </div>
                                    <div className="section-table__head-th">
										<span className="section-table__main--param">
											<svg width="13" height="13" viewBox="0 0 13 13">
												<use xlinkHref="#comments"></use>
											</svg>
											<Translate>projects_admin.project_description</Translate>
										</span>
                                    </div>
                                </div>
                            </div>
                            <div className="section-table__body">
                                {
                                    !!projects.length && projects
                                        ?.map((project: IProject, index: number) =>
                                            <ProjectItem key={project.id} data={project}
                                                         index={paginationCountFrom / paginationCountStep.value + 1}/>
                                        )
                                }
                            </div>
                        </div>
                    </div>
                </SimpleBar>
            </div>
            <div className="section-table__footer">
                <div className="section-table__row-per-page visible-on-mob">
                    <span>
                        <Translate>projects_admin.rows_per_page</Translate>
                    </span>
                    <CustomSelect list={RowsPerPage()} onChange={handleChangeRows} selectValue={paginationCountStep}
                                  setSelectedItem={setPaginationCountStep} defaultValue={RowsPerPage()[0]}/>
                </div>
                {paginationNavigation.length > 1 &&
                    <div className="section-table__pagination pagination visible-on-desktop">
                        <button onClick={prevNumberPagination} className="pagination__arrow is-prev" type="button"
                                title="Prev page">
                            <svg width="7" height="10" viewBox="0 0 7 10">
                                <use xlinkHref="#arrow-prev"></use>
                            </svg>
                        </button>
                        <div className="pagination__list">


                            {
                                paginationNavigation
                                    ?.slice(!isNearEnd ? (paginationCountFrom - 1) / paginationCountStep.value : paginationCountOfEndingNavigation, !isNearEnd ? ((paginationCountFrom === 0 ? paginationCountOfMaximumNavigation : paginationCountOfMaximumNavigation - 1) + paginationCountFrom / (paginationCountFrom === 0 ? (paginationCountStep.value - 1) : paginationCountStep.value)) : 99)
                                    ?.map(item =>
                                        <a href=""
                                           className={(paginationCountTo / paginationCountStep.value) === item ? "is-current" : ""}
                                           key={item} onClick={e => changeNumberPagination(e, item)}>
                                            {item}
                                        </a>
                                    )
                            }
                            {!isNearEnd && <span>...</span>}
                            {
                                !isNearEnd && paginationNavigation
                                    ?.slice(paginationMaximumPages - 1)
                                    ?.map(item =>
                                        <a href=""
                                           className={(paginationCountTo / paginationCountStep.value) === item ? "is-current" : ""}
                                           key={item} onClick={e => changeNumberPagination(e, item)}>
                                            {item}
                                        </a>
                                    )
                            }


                        </div>
                        <button onClick={nextNumberPagination} className="pagination__arrow is-next" type="button"
                                title="Next page">
                            <svg width="7" height="10" viewBox="0 0 7 10">
                                <use xlinkHref="#arrow-next"></use>
                            </svg>
                        </button>
                    </div>}
                <button className="section-table__see-more btn visible-on-mob" type="button">
                    <Translate>employees_admin.table.show_more</Translate>
                    <svg width="15" height="15" viewBox="0 0 15 15">
                        <use xlinkHref="#arrow-down"></use>
                    </svg>
                </button>
                <div className="section-table__row-per-page visible-on-desktop">
                    <span>
                        <Translate>projects_admin.rows_per_page</Translate>
                    </span>
                    <CustomSelect list={RowsPerPage()} onChange={handleChangeRows} selectValue={paginationCountStep}
                                  setSelectedItem={setPaginationCountStep} defaultValue={RowsPerPage()[0]}/>
                </div>
            </div>
        </ProjectStyled>
    )
}
