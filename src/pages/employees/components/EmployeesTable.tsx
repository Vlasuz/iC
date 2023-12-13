import React, {useEffect, useRef, useState} from 'react'
import {IEmployee} from "../../../models";
import {getBearer} from "../../../functions/getBearer";
import axios from "axios";
import {getApiLink} from "../../../functions/getApiLink";
import {EmployeesItem} from "./EmployeesItem";
import {useDispatch, useSelector} from 'react-redux';
import {setEmployeesList} from '../../../storage/toolkit';
import SimpleBar from "simplebar-react";
import {StatusesList} from "../../../constants/StatusesList";

interface IEmployeesTableProps {
    searchValue: string
    countOfShowRows: number
}

interface IStatus {
    value: string
    label: string
}

export const EmployeesTable: React.FC<IEmployeesTableProps> = ({searchValue, countOfShowRows}) => {

    const employees: IEmployee[] = useSelector((state: any) => state.toolkit.employees)
    const dispatch = useDispatch()

    useEffect(() => {

        getBearer("get")
        axios.get(getApiLink("/api/admin/employee/" + (searchValue && `?search=${searchValue}`))).then(({data}) => {
            dispatch(setEmployeesList(data))
        }).catch(er => console.log(er))

    }, [searchValue])


    const [isActiveStatusDropDown, setIsActiveStatusDropDown] = useState(false)
    const [chosenStatus, setChosenStatus] = useState<IStatus | any>({})
    const [isActiveNameDropDown, setIsActiveNameDropDown] = useState(false)

    const statusBlockRef: any = useRef(null)
    const nameBlockRef: any = useRef(null)

    useEffect(() => {
        const onClickStatus = (e: any) => statusBlockRef.current.contains(e.target) || setIsActiveStatusDropDown(false);
        const onClickName = (e: any) => nameBlockRef.current.contains(e.target) || setIsActiveNameDropDown(false);

        document.addEventListener('click', onClickStatus);
        document.addEventListener('click', onClickName);
        document.addEventListener('contextmenu', onClickStatus);
        document.addEventListener('contextmenu', onClickName);
        return () => {
            document.removeEventListener('click', onClickStatus);
            document.removeEventListener('click', onClickName);
            document.removeEventListener('contextmenu', onClickStatus);
            document.removeEventListener('contextmenu', onClickName);
        }
    }, []);

    const handleChooseStatus = (status: IStatus) => {
        setChosenStatus(status)
        setIsActiveStatusDropDown(false)

        if (chosenStatus.value === status.value) {
            setChosenStatus({})
        }
    }


    // default, sortUp, sortDown
    const [sortByName, setSortByName] = useState("default")

    const sortByNameList = [
        {
            value: "sortDown",
            label: "A-Z"
        },
        {
            value: "sortUp",
            label: "Z-A"
        }
    ]


    return (
        <div className="section-table__main table-employees">

            <table id="my-table" className="table-to-download-excel">
                <thead>
                <tr>
                    <th style={{background: "#FF0A00", padding: "5px 10px"}}>№</th>
                    <th style={{background: "#FF0A00", padding: "5px 10px"}}>Name</th>
                    <th style={{background: "#FF0A00", padding: "5px 10px"}}>Position of company</th>
                    <th style={{background: "#FF0A00", padding: "5px 10px"}}>Status</th>
                    <th style={{background: "#FF0A00", padding: "5px 10px"}}>Email</th>
                    <th style={{background: "#FF0A00", padding: "5px 10px"}}>Projects</th>
                    <th style={{background: "#FF0A00", padding: "5px 10px"}}>Phone number</th>
                    <th style={{background: "#FF0A00", padding: "5px 10px"}}>Vacations</th>
                </tr>
                </thead>
                <tbody>
                {
                    employees?.map((employee, index) =>
                            <tr key={employee.id}>
                                <td style={{padding: "10px 20px"}}>{index + 1}</td>
                                <td style={{padding: "10px 20px"}}>{employee.first_name} {employee.last_name}</td>
                                <td style={{padding: "10px 20px"}}>{employee.role}</td>
                                <td style={{padding: "10px 20px"}}>{employee.status}</td>
                                <td style={{padding: "10px 20px"}}>{employee.email}</td>
                                <td style={{padding: "10px 20px"}}>{employee.projects.length}</td>
                                <td style={{padding: "10px 20px"}}>{employee.phone}</td>
                                <td style={{padding: "10px 20px"}}>{employee.holidays}</td>
                            </tr>
                        )
                }
                </tbody>
            </table>

            <SimpleBar autoHide={false}>
                <div className="section-table__main--container">
                    <div className="section-table__main--wrapper">
                        <div className="section-table__head">
                            <div className="section-table__head-row">
                                <div className="section-table__head-th visible-on-mob">
                                <span className="section-table__main--param">
                                    <span>№</span>
                                    <span>
                                        <div ref={nameBlockRef}
                                             className="section-table__main--sort drop-down-absolute">
													<button onClick={_ => setIsActiveNameDropDown(prev => !prev)}
                                                            className={`section-table__main--sort-target drop-down-absolute__target ${isActiveNameDropDown && "is-active"}`}
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

                                                            {
                                                                sortByNameList.map(item =>
                                                                    <li className={item.value === sortByName ? "is-active" : ""}>
                                                                        <a onClick={_ => {
                                                                            setSortByName(item.value === sortByName ? "" : item.value)
                                                                            setIsActiveNameDropDown(false)
                                                                        }}>
                                                                            <svg width="15" height="16" viewBox="0 0 15 16">
                                                                                <use xlinkHref="#sort-asc"/>
                                                                            </svg>
                                                                            {
                                                                                item.label
                                                                            }
                                                                        </a>
                                                                    </li>
                                                                )
                                                            }

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
                                    <div ref={nameBlockRef} className="section-table__main--sort drop-down-absolute">
                                        <button onClick={_ => setIsActiveNameDropDown(prev => !prev)}
                                                className={`section-table__main--sort-target drop-down-absolute__target ${isActiveNameDropDown && "is-active"}`}
                                                type="button">
                                            <svg width="13" height="13" viewBox="0 0 13 13">
                                                <use xlinkHref="#user"></use>
                                            </svg>
                                            Name
                                            <svg width="10" height="15" viewBox="0 0 11 15">
                                                <use xlinkHref="#sort-up-down"></use>
                                            </svg>
                                        </button>
                                        <div className={"section-table__main--sort-block drop-down-absolute__block" + (isActiveNameDropDown ? " is-active" : "")} >
                                            <ul className="drop-down__list">
                                                {
                                                    sortByNameList.map(item =>
                                                        <li className={item.value === sortByName ? "is-active" : ""}>
                                                            <a onClick={_ => {
                                                                setSortByName(item.value === sortByName ? "" : item.value)
                                                                setIsActiveNameDropDown(false)
                                                            }}>
                                                                <svg width="15" height="16" viewBox="0 0 15 16">
                                                                    <use xlinkHref="#sort-asc"/>
                                                                </svg>
                                                                {
                                                                    item.label
                                                                }
                                                            </a>
                                                        </li>
                                                    )
                                                }
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
                                    <div ref={statusBlockRef} className="section-table__main--sort drop-down-absolute">
                                        <button onClick={_ => setIsActiveStatusDropDown(prev => !prev)}
                                                className={`section-table__main--sort-target drop-down-absolute__target ${isActiveStatusDropDown && "is-active"}`}
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

                                                {
                                                    StatusesList().map(item =>
                                                        <li key={item.value}
                                                            className={item.value === chosenStatus.value ? "is-active" : ""}>
                                                            <a onClick={_ => handleChooseStatus(item)}>
                                                                {item.label}
                                                            </a>
                                                        </li>
                                                    )
                                                }

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
                                employees
                                    ?.filter(item => chosenStatus?.value ? item.status === chosenStatus.value : item)
                                    ?.filter((item, index) => countOfShowRows === 0 ? item : index < countOfShowRows)
                                    ?.sort((a, b) => a.first_name < b.first_name ? sortByName === "sortUp" ? 1 : -1 : sortByName === "sortDown" ? 1 : -1)
                                    ?.map((employee, index) =>
                                        <EmployeesItem key={employee.id} index={index + 1} data={employee}/>)
                            }
                        </div>
                    </div>
                </div>
            </SimpleBar>
        </div>
    )
}
