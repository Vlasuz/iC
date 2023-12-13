import React, {useEffect, useState} from 'react'
import {VacationsStyled} from "./Vacations.styled";
import {TableExport} from "../../components/table/TableExport";
import {TableSelectYear} from "../../components/table/TableSelectYear";
import {VacationsHeader} from "./components/VacationsHeader";
import {useDispatch, useSelector } from 'react-redux';
import {IEmployee} from "../../models";
import {VacationsItem} from "./components/VacationsItem";
import {getBearer} from "../../functions/getBearer";
import axios from "axios";
import {getApiLink} from "../../functions/getApiLink";
import {setEmployeesList} from "../../storage/toolkit";

interface IVacationsProps {

}

export const Vacations: React.FC<IVacationsProps> = () => {

    const employees: IEmployee[] = useSelector((state: any) => state.toolkit.employees)

    const [valueSearch, setValueSearch] = useState<string>("")
    const [sortByName, setSortByName] = useState<string>("default")

    const dispatch = useDispatch()

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        getBearer("get")
        axios.get(getApiLink("/api/admin/employee/" + (valueSearch && `?search=${valueSearch}`))).then(({data}) => {
            dispatch(setEmployeesList(data))
        }).catch(er => console.log(er))
    }


    return (
        <VacationsStyled className="section-table">
            <div className="section-table__header">
                <div className="section-table__header--row is-always-row">
                    <div className="section-table__header--col">
                        <h1 className="section-table__title title">
                            Vacations
                        </h1>
                    </div>
                </div>
                <div className="section-table__header--row is-alternative-row">
                    <div className="section-table__header--col">
                        <form onSubmit={handleSearch} className="section-table__search is-alternative">
                            <label className="section-table__search--label">
                                <input type="search" name="search" placeholder="Search a project"
                                       className="section-table__search--input" onChange={e => setValueSearch(e.target.value)} value={valueSearch}/>
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
                        <TableSelectYear/>
                        <TableExport/>
                    </div>
                </div>
            </div>
            <div className="section-table__main is-alternative add-border table-vacations">
                <div className="section-table__main--container" data-simplebar data-simplebar-auto-hide="false">
                    <div className="section-table__main--wrapper">
                        <VacationsHeader
                            sortByName={sortByName}
                            setSortByName={setSortByName}
                        />

                        <div className="section-table__body">
                                {
                                    [...employees]
                                        ?.sort((a, b) => a?.first_name < b?.first_name ? sortByName === "sortUp" ? 1 : -1 : sortByName === "sortDown" ? 1 : -1)
                                        ?.map((item: IEmployee, index: number) => <VacationsItem key={item.id} index={index + 1} itemData={item} />)
                                }
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
                <button className="section-table__see-more btn" type="button">
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
        </VacationsStyled>
    )
}
