import React, {createContext, ReactNode, useEffect, useRef, useState} from 'react'
import {EmployeesTable} from "./components/EmployeesTable";
import {EmployeesHeader} from "./components/EmployeesHeader";
import {HeaderSearch} from '../../contexts';
import {EmployeesStyled} from "./Employees.styled";
import {CustomSelect} from "../../components/select/CustomSelect";
import {IEmployee} from "../../models";
import {useSelector} from "react-redux";

interface IEmployeesProps {

}

export const Employees: React.FC<IEmployeesProps> = () => {

    const listOfNumbers = [
        {
            value: -1,
            label: "Choose",
            isDisabled: true
        },
        {
            value: 1,
            label: "1"
        },
        {
            value: 2,
            label: "2"
        },
        {
            value: 3,
            label: "3"
        },
        {
            value: 4,
            label: "4"
        },
        {
            value: 0,
            label: "All"
        },
    ]

    const employees: IEmployee[] = useSelector((state: any) => state.toolkit.employees)
    const [searchValue, setSearchValue] = useState<string>('')
    const [countOfShowRows, setCountOfShowRows] = useState(listOfNumbers[3].value)
    const [selectValue, setSelectValue] = useState(listOfNumbers[3])

    const handleChangeRows = (e: any) => {
        setCountOfShowRows(e.value)
        setSelectValue(e)
    }

    const handleAddRows = () => {
        const plusCount = 1
        setCountOfShowRows(countOfShowRows + plusCount)
        setSelectValue(employees.length > countOfShowRows + plusCount ? listOfNumbers[0] : listOfNumbers.reverse()[0])
    }

    return (
        <EmployeesStyled>
            <HeaderSearch.Provider value={setSearchValue}>
                <section className="section-table">
                    <EmployeesHeader/>
                    <EmployeesTable countOfShowRows={countOfShowRows} searchValue={searchValue}/>
                    <div className="section-table__footer">
                        <div className="section-table__row-per-page visible-on-mob">
                            <span>Rows per page:</span>
                            <CustomSelect onChange={handleChangeRows} list={listOfNumbers}/>
                        </div>

                        {countOfShowRows !== 0 && employees.length > countOfShowRows &&
                            <button onClick={handleAddRows} className="section-table__see-more btn" type="button">
                                Show more
                                <svg width="15" height="15" viewBox="0 0 15 15">
                                    <use xlinkHref="#arrow-down"></use>
                                </svg>
                            </button>}

                        <div className="section-table__row-per-page visible-on-desktop">
                            <span>Rows per page:</span>
                            <CustomSelect onChange={handleChangeRows} value={selectValue}
                                          defaultValue={listOfNumbers[1]} list={listOfNumbers}/>
                        </div>
                    </div>
                </section>
            </HeaderSearch.Provider>
        </EmployeesStyled>
    )
}
