import React, {useEffect, useRef, useState} from 'react'
import {IEmployee} from "../../../models";
import {getBearer} from "../../../functions/getBearer";
import axios from "axios";
import {getApiLink} from "../../../functions/getApiLink";
import {EmployeesItem} from "./EmployeesItem";
import {useDispatch, useSelector} from 'react-redux';
import {setEmployeesList} from '../../../storage/toolkit';

interface IEmployeesTableProps {
    searchValue: string
}

export const EmployeesTable: React.FC<IEmployeesTableProps> = ({searchValue}) => {

    const employees: IEmployee[] = useSelector((state: any) => state.toolkit.employees)
    const dispatch = useDispatch()

    useEffect(() => {

        getBearer("get")
        axios.get(getApiLink("/api/admin/employee/" + (searchValue && `?search=${searchValue}`))).then(({data}) => {
            dispatch(setEmployeesList(data))
        }).catch(er => console.log(er))

    }, [searchValue])

    const [isActiveStatusDropDown, setIsActiveStatusDropDown] = useState(false)
    const [isActiveNameDropDown, setIsActiveNameDropDown] = useState(false)

    return (
        <div className="section-table__main table-employees">
            <div className="section-table__main--container" data-simplebar data-simplebar-auto-hide="false">
                <div className="section-table__main--wrapper">
                    <div className="section-table__head">
                        <div className="section-table__head-row">
                            <div className="section-table__head-th visible-on-mob">
                                <span className="section-table__main--param">
                                    <span>№</span>
                                    <span>
                                        <div className="section-table__main--sort drop-down-absolute">
													<button onClick={_ => setIsActiveNameDropDown(prev => !prev)}
                                                            className="section-table__main--sort-target drop-down-absolute__target"
                                                            type="button">
														<svg width="13" height="13" viewBox="0 0 13 13">
															<use xlinkHref="#user"></use>
														</svg>
														Name
														<svg width="10" height="15" viewBox="0 0 11 15">
															<use xlinkHref="#sort-up-down"></use>
														</svg>
													</button>
													<div
                                                        className={"section-table__main--sort-block drop-down-absolute__block" + (isActiveNameDropDown ? " is-active" : "")}
                                                        id="name-sort">
														<ul className="drop-down__list">
															<li>
																<a href="#">
																	<svg width="15" height="16" viewBox="0 0 15 16">
																		<use
                                                                            xlinkHref="#sort-asc"></use>
																	</svg>
																	A-Z
																</a>
															</li>
															<li>
																<a href="#">
																	<svg width="15" height="16" viewBox="0 0 15 16">
																		<use
                                                                            xlinkHref="#sort-asc"></use>
																	</svg>
																	Z-A
																</a>
															</li>
														</ul>
													</div>
												</div>
											</span>
										</span>
                            </div>
                            <div className="section-table__head-th visible-on-desktop">
										<span className="section-table__main--param is-center">
											№
										</span>
                            </div>
                            <div className="section-table__head-th visible-on-desktop">
                                <div className="section-table__main--sort drop-down-absolute">
                                    <button onClick={_ => setIsActiveNameDropDown(prev => !prev)}
                                            className="section-table__main--sort-target drop-down-absolute__target"
                                            type="button">
                                        <svg width="13" height="13" viewBox="0 0 13 13">
                                            <use xlinkHref="#user"></use>
                                        </svg>
                                        Name
                                        <svg width="10" height="15" viewBox="0 0 11 15">
                                            <use xlinkHref="#sort-up-down"></use>
                                        </svg>
                                    </button>
                                    <div
                                        className={"section-table__main--sort-block drop-down-absolute__block" + (isActiveNameDropDown ? " is-active" : "")}
                                        id="name-sort-2">
                                        <ul className="drop-down__list">
                                            <li>
                                                <a href="#">
                                                    <svg width="15" height="16" viewBox="0 0 15 16">
                                                        <use xlinkHref="#sort-asc"></use>
                                                    </svg>
                                                    A-Z
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <svg width="15" height="16" viewBox="0 0 15 16">
                                                        <use xlinkHref="#sort-asc"></use>
                                                    </svg>
                                                    Z-A
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="section-table__head-th">
										<span className="section-table__main--param">
											<svg width="13" height="13" viewBox="0 0 13 13">
												<use xlinkHref="#position"></use>
											</svg>
											Position in company
										</span>
                            </div>
                            <div className="section-table__head-th">
                                <div className="section-table__main--sort drop-down-absolute">
                                    <button onClick={_ => setIsActiveStatusDropDown(prev => !prev)}
                                            className="section-table__main--sort-target drop-down-absolute__target"
                                            type="button">
                                        <svg width="13" height="13" viewBox="0 0 13 13">
                                            <use xlinkHref="#flag"></use>
                                        </svg>
                                        Status
                                        <svg width="10" height="7" viewBox="0 0 10 7"
                                             className="drop-down-absolute__target--arrow">
                                            <use xlinkHref="#drop-down-arrow"></use>
                                        </svg>
                                    </button>
                                    <div
                                        className={"section-table__main--sort-block drop-down-absolute__block" + (isActiveStatusDropDown ? " is-active" : "")}
                                        id="status-sort">
                                        <ul className="drop-down__list">
                                            <li>
                                                <a href="#">
                                                    Project Lead
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    Team Lead
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    Employee
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="section-table__head-th">
										<span className="section-table__main--param">
											<svg width="13" height="13" viewBox="0 0 13 13">
												<use xlinkHref="#email"></use>
											</svg>
											Email
										</span>
                            </div>
                            <div className="section-table__head-th">
										<span className="section-table__main--param">
											<svg width="13" height="13" viewBox="0 0 13 13">
												<use xlinkHref="#settings"></use>
											</svg>
											Projects
										</span>
                            </div>
                            <div className="section-table__head-th">
										<span className="section-table__main--param">
											<svg width="13" height="13" viewBox="0 0 13 13">
												<use xlinkHref="#tel"></use>
											</svg>
											Phone number
										</span>
                            </div>
                            <div className="section-table__head-th">
										<span className="section-table__main--param">
											<svg width="13" height="13" viewBox="0 0 13 13">
												<use xlinkHref="#calendar-selected"></use>
											</svg>
											Vacations
										</span>
                            </div>
                        </div>
                    </div>
                    <div className="section-table__body">
                        {
                            employees.map((employee, index) => <EmployeesItem key={employee.id} index={index + 1}
                                                                              data={employee}/>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
