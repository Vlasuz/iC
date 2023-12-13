import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from 'react'
import {HeaderSearch} from "../../../contexts";
import {PopupContext} from "../../../App";
import {EmployeesItem} from "./EmployeesItem";
import {useClickOutside} from "../../../hooks/ClickOutside";
import {TableSelectYear} from "../../../components/table/TableSelectYear";
import {TableExport} from "../../../components/table/TableExport";

interface IEmployeesHeaderProps {

}

export const EmployeesHeader: React.FC<IEmployeesHeaderProps> = () => {

    const setSearchValueContext: Dispatch<SetStateAction<string>> = useContext(HeaderSearch)

    const setPopup: any = useContext(PopupContext)

    const [searchValue, setSearchValue] = useState<string>('')
    const [isOpenInputSearch, setIsOpenInputSearch] = useState(false)

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSearchValueContext(searchValue)

        if(isOpenInputSearch) {
            setSearchValueContext(searchValue)
        }
    }

    const {rootEl} = useClickOutside(setIsOpenInputSearch)

    return (
        <div className="section-table__header">
            <div className="section-table__header--row is-always-row">
                <div className="section-table__header--col">
                    <h1 className="section-table__title title">
                        Employees
                    </h1>
                </div>
            </div>
            <div className="section-table__header--row row-2">
                <div className="section-table__header--col">
                    <a onClick={_ => setPopup({popup: "add-new-employee-popup"})} className="section-table__add btn open-popup">
                        Add new employee
                        <svg width="16" height="15" viewBox="0 0 16 15">
                            <use xlinkHref="#plus"></use>
                        </svg>
                    </a>
                    <form ref={rootEl} onSubmit={handleSearch} className={`section-table__search ${isOpenInputSearch && "is-active"}`}>
                        <label className="section-table__search--label">
                            <input onChange={e => setSearchValue(e.target.value)} value={searchValue} type="search" name="search" autoComplete="off" placeholder="Search an employee" className="section-table__search--input"/>
                        </label>
                        <button onClick={_ => setIsOpenInputSearch(true)} className="section-table__search--submit btn is-grey is-min-on-mob"
                                type="submit">
                            Search
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
    )
}
