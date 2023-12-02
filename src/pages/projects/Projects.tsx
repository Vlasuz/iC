import React, {useContext, useEffect, useState} from 'react'
import axios from "axios";
import {getApiLink} from "../../functions/getApiLink";
import {IProject} from "../../models";
import {getBearer} from "../../functions/getBearer";
import {useDispatch, useSelector} from 'react-redux';
import {setProjects, setSelectedEmployee} from "../../storage/toolkit";
import {ProjectItem} from "./components/ProjectItem";
import {PopupContext} from "../../App";

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

    return (
        <section className="section-table">
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
                        <a onClick={_ => setPopup({popup: "add-project-popup"})} className="section-table__add btn open-popup">
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
                <div className="section-table__main--container" data-simplebar data-simplebar-auto-hide="false">
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
                                !!projects.length && projects?.map((project: IProject, index: number) =>
                                    <ProjectItem key={project.id} data={project} index={index}/>
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

                            <div className="section-table__row drop-down-2">
                                <div className="section-table__param visible-on-mob">
                                    <span>1</span>
                                    <span>61x200495</span>
                                </div>
                                <div className="section-table__param visible-on-desktop is-center">
                                    1
                                </div>
                                <div className="section-table__param visible-on-desktop is-center">
                                    61x200495
                                </div>
                                <div className="section-table__param">
                                    Ukraine EE Building Certification Study
                                </div>
                                <div className="drop-down-2__block">
                                    <ul className="drop-down-2__list">
                                        <li>
                                            <a href="#edit-project-popup" className="open-popup">
                                                <svg width="15" height="16" viewBox="0 0 15 16">
                                                    <use xlinkHref="#edit"></use>
                                                </svg>
                                                Edit
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#remove-table-item-popup" className="open-popup">
                                                <svg width="15" height="16" viewBox="0 0 15 16">
                                                    <use xlinkHref="#trash"></use>
                                                </svg>
                                                Delete
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="section-table__main table-projects visible-on-mob">
                <div className="section-table__main--container" data-simplebar data-simplebar-auto-hide="false">
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
                            <div className="section-table__row drop-down-2">
                                <div className="section-table__param visible-on-mob">
                                    <span>1</span>
                                    <span>61x200495</span>
                                </div>
                                <div className="section-table__param visible-on-desktop is-center">
                                    1
                                </div>
                                <div className="section-table__param visible-on-desktop is-center">
                                    61x200495
                                </div>
                                <div className="section-table__param">
                                    Ukraine EE Building Certification Study
                                </div>
                                <div className="drop-down-2__block">
                                    <ul className="drop-down-2__list">
                                        <li>
                                            <a href="#edit-project-popup" className="open-popup">
                                                <svg width="15" height="16" viewBox="0 0 15 16">
                                                    <use xlinkHref="#edit"></use>
                                                </svg>
                                                Edit
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#remove-table-item-popup" className="open-popup">
                                                <svg width="15" height="16" viewBox="0 0 15 16">
                                                    <use xlinkHref="#trash"></use>
                                                </svg>
                                                Delete
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="section-table__row drop-down-2">
                                <div className="section-table__param visible-on-mob">
                                    <span>1</span>
                                    <span>61x200495</span>
                                </div>
                                <div className="section-table__param visible-on-desktop is-center">
                                    1
                                </div>
                                <div className="section-table__param visible-on-desktop is-center">
                                    61x200495
                                </div>
                                <div className="section-table__param">
                                    Ukraine EE Building Certification Study
                                </div>
                                <div className="drop-down-2__block">
                                    <ul className="drop-down-2__list">
                                        <li>
                                            <a href="#edit-project-popup" className="open-popup">
                                                <svg width="15" height="16" viewBox="0 0 15 16">
                                                    <use xlinkHref="#edit"></use>
                                                </svg>
                                                Edit
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#remove-table-item-popup" className="open-popup">
                                                <svg width="15" height="16" viewBox="0 0 15 16">
                                                    <use xlinkHref="#trash"></use>
                                                </svg>
                                                Delete
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="section-table__row drop-down-2">
                                <div className="section-table__param visible-on-mob">
                                    <span>1</span>
                                    <span>61x200495</span>
                                </div>
                                <div className="section-table__param visible-on-desktop is-center">
                                    1
                                </div>
                                <div className="section-table__param visible-on-desktop is-center">
                                    61x200495
                                </div>
                                <div className="section-table__param">
                                    Ukraine EE Building Certification Study
                                </div>
                                <div className="drop-down-2__block">
                                    <ul className="drop-down-2__list">
                                        <li>
                                            <a href="#edit-project-popup" className="open-popup">
                                                <svg width="15" height="16" viewBox="0 0 15 16">
                                                    <use xlinkHref="#edit"></use>
                                                </svg>
                                                Edit
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#remove-table-item-popup" className="open-popup">
                                                <svg width="15" height="16" viewBox="0 0 15 16">
                                                    <use xlinkHref="#trash"></use>
                                                </svg>
                                                Delete
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="section-table__row drop-down-2">
                                <div className="section-table__param visible-on-mob">
                                    <span>1</span>
                                    <span>61x200495</span>
                                </div>
                                <div className="section-table__param visible-on-desktop is-center">
                                    1
                                </div>
                                <div className="section-table__param visible-on-desktop is-center">
                                    61x200495
                                </div>
                                <div className="section-table__param">
                                    Ukraine EE Building Certification Study
                                </div>
                                <div className="drop-down-2__block">
                                    <ul className="drop-down-2__list">
                                        <li>
                                            <a href="#edit-project-popup" className="open-popup">
                                                <svg width="15" height="16" viewBox="0 0 15 16">
                                                    <use xlinkHref="#edit"></use>
                                                </svg>
                                                Edit
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#remove-table-item-popup" className="open-popup">
                                                <svg width="15" height="16" viewBox="0 0 15 16">
                                                    <use xlinkHref="#trash"></use>
                                                </svg>
                                                Delete
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="section-table__row drop-down-2">
                                <div className="section-table__param visible-on-mob">
                                    <span>1</span>
                                    <span>61x200495</span>
                                </div>
                                <div className="section-table__param visible-on-desktop is-center">
                                    1
                                </div>
                                <div className="section-table__param visible-on-desktop is-center">
                                    61x200495
                                </div>
                                <div className="section-table__param">
                                    Ukraine EE Building Certification Study
                                </div>
                                <div className="drop-down-2__block">
                                    <ul className="drop-down-2__list">
                                        <li>
                                            <a href="#edit-project-popup" className="open-popup">
                                                <svg width="15" height="16" viewBox="0 0 15 16">
                                                    <use xlinkHref="#edit"></use>
                                                </svg>
                                                Edit
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#remove-table-item-popup" className="open-popup">
                                                <svg width="15" height="16" viewBox="0 0 15 16">
                                                    <use xlinkHref="#trash"></use>
                                                </svg>
                                                Delete
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="section-table__row drop-down-2">
                                <div className="section-table__param visible-on-mob">
                                    <span>1</span>
                                    <span>61x200495</span>
                                </div>
                                <div className="section-table__param visible-on-desktop is-center">
                                    1
                                </div>
                                <div className="section-table__param visible-on-desktop is-center">
                                    61x200495
                                </div>
                                <div className="section-table__param">
                                    Ukraine EE Building Certification Study
                                </div>
                                <div className="drop-down-2__block">
                                    <ul className="drop-down-2__list">
                                        <li>
                                            <a href="#edit-project-popup" className="open-popup">
                                                <svg width="15" height="16" viewBox="0 0 15 16">
                                                    <use xlinkHref="#edit"></use>
                                                </svg>
                                                Edit
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#remove-table-item-popup" className="open-popup">
                                                <svg width="15" height="16" viewBox="0 0 15 16">
                                                    <use xlinkHref="#trash"></use>
                                                </svg>
                                                Delete
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="section-table__row drop-down-2">
                                <div className="section-table__param visible-on-mob">
                                    <span>1</span>
                                    <span>61x200495</span>
                                </div>
                                <div className="section-table__param visible-on-desktop is-center">
                                    1
                                </div>
                                <div className="section-table__param visible-on-desktop is-center">
                                    61x200495
                                </div>
                                <div className="section-table__param">
                                    Ukraine EE Building Certification Study
                                </div>
                                <div className="drop-down-2__block">
                                    <ul className="drop-down-2__list">
                                        <li>
                                            <a href="#edit-project-popup" className="open-popup">
                                                <svg width="15" height="16" viewBox="0 0 15 16">
                                                    <use xlinkHref="#edit"></use>
                                                </svg>
                                                Edit
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#remove-table-item-popup" className="open-popup">
                                                <svg width="15" height="16" viewBox="0 0 15 16">
                                                    <use xlinkHref="#trash"></use>
                                                </svg>
                                                Delete
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
                    <button className="pagination__arrow is-prev" type="button" title="Prev page">
                        <svg width="7" height="10" viewBox="0 0 7 10">
                            <use xlinkHref="#arrow-prev"></use>
                        </svg>
                    </button>
                    <div className="pagination__list">
                        <a href="#" className="is-current">
                            1
                        </a>
                        <a href="#">
                            2
                        </a>
                        <a href="#">
                            3
                        </a>
                        <span>
								...
							</span>
                        <a href="#">
                            12
                        </a>
                    </div>
                    <button className="pagination__arrow is-next" type="button" title="Next page">
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
                    <select name="row-per-page"
                            className="section-table__row-per-page--select custom-select is-center">
                        <option value="20">20</option>
                        <option value="40">40</option>
                        <option value="60">60</option>
                        <option value="all">All</option>
                    </select>
                </div>
            </div>
        </section>
    )
}
