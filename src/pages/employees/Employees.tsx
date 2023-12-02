import React, {createContext, ReactNode, useEffect, useRef, useState} from 'react'
import {EmployeesTable} from "./components/EmployeesTable";
import {EmployeesHeader} from "./components/EmployeesHeader";
import {HeaderSearch} from '../../contexts';
import {EmployeesStyled} from "./Employees.styled";

interface IEmployeesProps {

}

export const Employees: React.FC<IEmployeesProps> = () => {

    const [searchValue, setSearchValue] = useState<string>('')

    return (
        <EmployeesStyled>
            <HeaderSearch.Provider value={setSearchValue}>
                <section className="section-table">
                    <EmployeesHeader/>
                    <EmployeesTable searchValue={searchValue}/>
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
                </section>
            </HeaderSearch.Provider>
        </EmployeesStyled>
    )
}
