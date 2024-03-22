import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from 'react'
import {HeaderSearch} from "../../../contexts";
import {PopupContext} from "../../../App";
import {useClickOutside} from "../../../hooks/ClickOutside";
import {TableSelectYear} from "../../../components/table/TableSelectYear";
import {TableExportCustom} from "../../../components/table/TableExportCustom";
import {getBearer} from "../../../functions/getBearer";
import axios from "axios";
import {getApiLink} from "../../../functions/getApiLink";
import {setEmployeesList} from "../../../storage/toolkit";
import {useDispatch, useSelector} from 'react-redux';
import {Translate} from "../../../components/translate/Translate";
import {IEmployee} from "../../../models";
import {SummaryEmployeesExcel} from "../../summaryEmployees/components/SummaryEmployeesExcel";
import {TimesheetExcel} from "../../timesheet/components/TimesheetExcel";
import {EmployeesExcel} from "./EmployeesExcel";
import {useTranslation} from "react-i18next";

interface IEmployeesHeaderProps {
    setSearchValueGlobal: any
}

export const EmployeesHeader: React.FC<IEmployeesHeaderProps> = ({setSearchValueGlobal}) => {

    const setPopup: any = useContext(PopupContext)

    const dispatch = useDispatch()

    const [searchValue, setSearchValue] = useState<string>('')
    const [isOpenInputSearch, setIsOpenInputSearch] = useState(false)

    useEffect(() => {

        getBearer("get")
        axios.get(getApiLink(`/api/admin/employee/?search=${searchValue}`)).then(({data}) => {
            dispatch(setEmployeesList(data))
        }).catch(er => console.log(er))

    }, [searchValue])

    const dateNow = new Date()
    const [listYear, setListYear] = useState(dateNow.getFullYear())

    useEffect(() => {
        if(searchValue.length > 0) return;

        getBearer("get")
        axios.get(getApiLink(`/api/admin/employee/?year=${listYear}`)).then(({data}) => {
            dispatch(setEmployeesList(data))
        }).catch(er => console.log(er))

    }, [searchValue, listYear])

    const {rootEl} = useClickOutside(setIsOpenInputSearch)

    const employees: IEmployee[] = useSelector((state: any) => state.toolkit.employees)

    const {t} = useTranslation()

    return (
        <div className="section-table__header">
            <div className="section-table__header--row is-always-row">
                <div className="section-table__header--col">
                    <h1 className="section-table__title title">
                        <Translate>employees_admin.table.employees</Translate>
                    </h1>
                </div>
            </div>
            <div className="section-table__header--row row-2">
                <div className="section-table__header--col">
                    <a onClick={_ => setPopup({popup: "add-new-employee-popup"})} className="section-table__add btn open-popup">
                        <Translate>employees_admin.table.add_new_employee</Translate>
                        <svg width="16" height="15" viewBox="0 0 16 15">
                            <use xlinkHref="#plus"></use>
                        </svg>
                    </a>
                    <form ref={rootEl} onSubmit={e => e.preventDefault()} className={`section-table__search ${isOpenInputSearch && "is-active"}`}>
                        <label className="section-table__search--label">
                            <input onChange={e => {
                                setSearchValue(e.target.value)
                                setSearchValueGlobal(e.target.value)
                            }} value={searchValue} type="search" name="search" autoComplete="off" className="section-table__search--input"/>
                            <span className="placeholder">
                                {!searchValue.length ? <Translate>employees_admin.table.search_an_employee</Translate> : ""}
                            </span>
                        </label>
                        <button onClick={_ => setIsOpenInputSearch(true)} className="section-table__search--submit btn is-grey is-min-on-mob"
                                type="submit">
                            <Translate>employees_admin.table.search</Translate>
                            <svg width="15" height="15" viewBox="0 0 15 15">
                                <use xlinkHref="#search"></use>
                            </svg>
                        </button>
                    </form>
                </div>
                <div className="section-table__header--col">

                    <TableSelectYear setYear={setListYear}/>

                    <TableExportCustom
                        excelFile={(e: any) => EmployeesExcel({employees, listYear, translate: t})}
                    />

                </div>
            </div>
        </div>
    )
}
