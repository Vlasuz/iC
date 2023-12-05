import React, {useContext, useEffect, useState} from 'react'
import axios from "axios";
import {getApiLink} from "../../functions/getApiLink";
import {IEmployee, IProject} from "../../models";
import {getBearer} from "../../functions/getBearer";
import {useDispatch, useSelector} from 'react-redux';
import {setProjects, setSelectedEmployee} from "../../storage/toolkit";
import {ProjectItem} from "./components/ProjectItem";
import {PopupContext} from "../../App";
import {ProjectStyled} from "./Project.styled";
import SimpleBar from "simplebar-react";
import {CustomSelect} from "../../components/select/CustomSelect";

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







    const listOfNumbers = [
        {
            value: 2,
            label: "2"
        },
        {
            value: 3,
            label: "3"
        },
        {
            value: 6,
            label: "6"
        },
        {
            value: 8,
            label: "8"
        },
        {
            value: 99,
            label: "All"
        },
    ]


    const handleChangeRows = (e: any) => {
        setPaginationCountFrom(0)
        setPaginationCountStep(e.value)
        setPaginationCountTo(e.value)
        setPaginationMaximumPages(Math.ceil(projects.length / e.value))
        const arrayCount = Array.from({length: Math.ceil(projects.length / e.value)}, (_, i) => i + 1)
        setPaginationNavigation(arrayCount)
    }



    // PAGINATION
    const [paginationCountStep, setPaginationCountStep] = useState(listOfNumbers[3].value)
    const [paginationCountOfMaximumNavigation] = useState(3)
    const [paginationMaximumPages, setPaginationMaximumPages] = useState(Math.ceil(projects.length / paginationCountStep))
    const [paginationCountFrom, setPaginationCountFrom] = useState<number>(0)
    const [paginationCountTo, setPaginationCountTo] = useState<number>(paginationCountStep)
    const [paginationNavigation, setPaginationNavigation] = useState<number[]>([])

    const paginationCountOfEndingNavigation = paginationMaximumPages - 5 <= 0 ? 0 : paginationMaximumPages - 5
    const isNearEnd = paginationNavigation?.slice(paginationCountFrom / paginationCountStep, (paginationCountOfMaximumNavigation + paginationCountFrom / paginationCountStep))[0] + 3 >= paginationNavigation.slice(paginationMaximumPages - 1)[0]

    useEffect(() => {
        const arrayCount = Array.from({length: Math.ceil(projects.length / paginationCountStep)}, (_, i) => i + 1)

        setPaginationNavigation(arrayCount)
        setPaginationCountTo(paginationCountStep)
    }, [projects, paginationMaximumPages])

    useEffect(() => {

        setPaginationCountFrom(0)
        setPaginationMaximumPages(Math.ceil(projects.length / paginationCountStep))

    }, [projects])

    const changeNumberPagination = (e: React.MouseEvent<HTMLAnchorElement>, number: number) => {
        e.preventDefault()

        setPaginationCountFrom((paginationCountStep * number) - paginationCountStep)
        setPaginationCountTo(paginationCountStep * number)
    }
    const nextNumberPagination = () => {
        if(paginationCountTo / paginationCountStep === paginationMaximumPages) return;

        setPaginationCountFrom(prev => prev + paginationCountStep)
        setPaginationCountTo(prev => prev + paginationCountStep)
    }
    const prevNumberPagination = () => {
        if(paginationCountTo / paginationCountStep === 1) return;

        setPaginationCountFrom(prev => prev - paginationCountStep)
        setPaginationCountTo(prev => prev - paginationCountStep)
    }
    // PAGINATION

    return (
        <ProjectStyled className="section-table">
            <div className="section-table__header">
                <div className="section-table__header--row is-always-row">
                    <div className="section-table__header--col">
                        <h1 className="section-table__title title">
                            Projects
                        </h1>
                    </div>
                </div>
                <div className="section-table__header--row row-2">
                    <div className="section-table__header--col">
                        <a onClick={_ => setPopup({popup: "add-project-popup"})}
                           className="section-table__add btn open-popup">
                            Add new project
                            <svg width="16" height="15" viewBox="0 0 16 15">
                                <use xlinkHref="#plus"></use>
                            </svg>
                        </a>
                        <form onSubmit={handleSearch} className="section-table__search">
                            <label className="section-table__search--label">
                                <input type="search" name="search" placeholder="Search a project"
                                       className="section-table__search--input"
                                       onChange={e => setSearchValue(e.target.value)} value={searchValue}/>
                            </label>
                            <button className="section-table__search--submit btn is-grey is-min-on-mob"
                                    type="submit">
                                Search
                                <svg width="15" height="15" viewBox="0 0 15 15">
                                    <use xlinkHref="#search"></use>
                                </svg>
                            </button>
                        </form>
                    </div>
                    <div className="section-table__header--col">
                        <div className="section-table__change-date drop-down">
                            <button className="section-table__change-date--target drop-down__target" type="button">
                                2023
                                <svg width="10" height="7" viewBox="0 0 10 7"
                                     className="section-table__change-date--target-arrow drop-down__target--arrow">
                                    <use xlinkHref="#drop-down-arrow"></use>
                                </svg>
                            </button>
                            <div className="section-table__change-date--block drop-down__block">
                                <div className="section-table__change-date--slider splide">
                                    <div className="splide__track">
                                        <ul className="splide__list">
                                            <li className="splide__slide">
                                                <label>
                                                    <input type="radio" name="year" value="2021"/>
                                                    <span>2021</span>
                                                </label>
                                            </li>
                                            <li className="splide__slide">
                                                <label>
                                                    <input type="radio" name="year" value="2022"/>
                                                    <span>2022</span>
                                                </label>
                                            </li>
                                            <li className="splide__slide">
                                                <label>
                                                    <input type="radio" name="year" value="2023" checked readOnly/>
                                                    <span>2023</span>
                                                </label>
                                            </li>
                                            <li className="splide__slide is-disabled">
                                                <label>
                                                    <input type="radio" name="year" value="2024" disabled/>
                                                    <span>2024</span>
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="splide__arrows">
                                        <button className="splide__arrow splide__arrow--prev" type="button">
                                            <svg width="7" height="10" viewBox="0 0 7 10">
                                                <use xlinkHref="#arrow-prev"></use>
                                            </svg>
                                        </button>
                                        <button className="splide__arrow splide__arrow--next" type="button">
                                            <svg width="7" height="10" viewBox="0 0 7 10">
                                                <use xlinkHref="#arrow-next"></use>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="section-table__export drop-down is-right-default">
                            <button className="section-table__export--target drop-down__target" type="button">
                                Export
                                <svg width="16" height="17" viewBox="0 0 16 17">
                                    <use xlinkHref="#download"></use>
                                </svg>
                            </button>
                            <div className="section-table__export--block drop-down__block">
                                <ul className="drop-down__list">
                                    <li>
                                        <a href="#">
                                            Export as .xlsx
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            Export as .pdf
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
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
											Project name
										</span>
                                    </div>
                                    <div className="section-table__head-th">
										<span className="section-table__main--param">
											<svg width="13" height="13" viewBox="0 0 13 13">
												<use xlinkHref="#comments"></use>
											</svg>
											Project description
										</span>
                                    </div>
                                </div>
                            </div>
                            <div className="section-table__body">

                                {
                                    !!projects.length && projects
                                        ?.slice(paginationCountFrom, paginationCountTo)
                                        ?.filter((item, index) => index < Math.ceil(paginationCountStep / 2))
                                        ?.map((project: IProject, index: number) =>
                                        <ProjectItem key={project.id} data={project} index={paginationCountFrom + index}/>
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
											Project name
										</span>
                                    </div>
                                    <div className="section-table__head-th">
										<span className="section-table__main--param">
											<svg width="13" height="13" viewBox="0 0 13 13">
												<use xlinkHref="#comments"></use>
											</svg>
											Project description
										</span>
                                    </div>
                                </div>
                            </div>
                            <div className="section-table__body">

                                {
                                    !!projects.length && projects
                                        ?.slice(paginationCountFrom, paginationCountTo)
                                        ?.filter((item, index) => index >= Math.ceil(paginationCountStep / 2))
                                        ?.map((project: IProject, index: number) =>
                                        <ProjectItem key={project.id} data={project} index={Math.ceil((paginationCountFrom + index) + paginationCountStep / 2)}/>
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
												Project name
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
											Project name
										</span>
                                    </div>
                                    <div className="section-table__head-th">
										<span className="section-table__main--param">
											<svg width="13" height="13" viewBox="0 0 13 13">
												<use xlinkHref="#comments"></use>
											</svg>
											Project description
										</span>
                                    </div>
                                </div>
                            </div>
                            <div className="section-table__body">
                                {
                                    !!projects.length && projects
                                        ?.map((project: IProject, index: number) =>
                                            <ProjectItem key={project.id} data={project} index={paginationCountFrom / paginationCountStep + 1}/>
                                        )
                                }
                            </div>
                        </div>
                    </div>
                </SimpleBar>
            </div>
            <div className="section-table__footer">
                <div className="section-table__row-per-page visible-on-mob">
                    <span>Rows per page:</span>
                    <select name="row-per-page"
                            className="section-table__row-per-page--select custom-select is-center">
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="40">40</option>
                        <option value="all">All</option>
                    </select>
                </div>
                <div className="section-table__pagination pagination visible-on-desktop">
                    <button onClick={prevNumberPagination} className="pagination__arrow is-prev" type="button" title="Prev page">
                        <svg width="7" height="10" viewBox="0 0 7 10">
                            <use xlinkHref="#arrow-prev"></use>
                        </svg>
                    </button>
                    <div className="pagination__list">

                        {
                            paginationNavigation
                                ?.slice(!isNearEnd ? (paginationCountFrom - 1) / paginationCountStep : paginationCountOfEndingNavigation, !isNearEnd ? ((paginationCountFrom === 0 ? paginationCountOfMaximumNavigation : paginationCountOfMaximumNavigation - 1) + paginationCountFrom / (paginationCountFrom === 0 ? (paginationCountStep - 1) : paginationCountStep)) : 99)
                                ?.map(item =>
                                    <a href="" className={(paginationCountTo / paginationCountStep) === item ? "is-current" : ""} key={item} onClick={e => changeNumberPagination(e, item)}>
                                        {item}
                                    </a>
                                )
                        }
                        {!isNearEnd && <span>...</span>}
                        {
                            !isNearEnd && paginationNavigation
                                ?.slice(paginationMaximumPages - 1)
                                ?.map(item =>
                                    <a href="" className={(paginationCountTo / paginationCountStep) === item ? "is-current" : ""} key={item} onClick={e => changeNumberPagination(e, item)}>
                                        {item}
                                    </a>
                                )
                        }

                    </div>
                    <button onClick={nextNumberPagination} className="pagination__arrow is-next" type="button" title="Next page">
                        <svg width="7" height="10" viewBox="0 0 7 10">
                            <use xlinkHref="#arrow-next"></use>
                        </svg>
                    </button>
                </div>
                <button className="section-table__see-more btn visible-on-mob" type="button">
                    Show more
                    <svg width="15" height="15" viewBox="0 0 15 15">
                        <use xlinkHref="#arrow-down"></use>
                    </svg>
                </button>
                <div className="section-table__row-per-page visible-on-desktop">
                    <span>Rows per page:</span>
                    <CustomSelect onChange={handleChangeRows} defaultValue={listOfNumbers[3]}  list={listOfNumbers} />
                </div>
            </div>
        </ProjectStyled>
    )
}
