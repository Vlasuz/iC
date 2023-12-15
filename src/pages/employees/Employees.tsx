import React, {createContext, ReactNode, useEffect, useRef, useState} from 'react'
import {EmployeesTable} from "./components/EmployeesTable";
import {EmployeesHeader} from "./components/EmployeesHeader";
import {HeaderSearch} from '../../contexts';
import {EmployeesStyled} from "./Employees.styled";
import {CustomSelect1} from "../../components/select/CustomSelect1";
import {IEmployee} from "../../models";
import {useSelector} from "react-redux";
import {CustomSelect} from "../../components/customSelect/CustomSelect";
import {RowsPerPage} from "../../constants/RowsPerPage";

interface IEmployeesProps {

}

export const Employees: React.FC<IEmployeesProps> = () => {

    const employees: IEmployee[] = useSelector((state: any) => state.toolkit.employees)
    const [searchValue, setSearchValue] = useState<string>('')
    const [selectValue, setSelectValue] = useState(RowsPerPage()[0])

    const handleAddRows = () => {
        const plusCount = window.innerWidth < 768 ? 10 : 20
        setSelectValue({
            value: selectValue.value + plusCount,
            label: employees.length === +selectValue.label + plusCount ? "All" : String(+selectValue.label + plusCount)
        })
    }

    return (
        <EmployeesStyled className="section-table">
            <HeaderSearch.Provider value={setSearchValue}>

                    <EmployeesHeader/>

                    <EmployeesTable countOfShowRows={selectValue.value} searchValue={searchValue}/>

                    <div className="section-table__footer">
                        <div className="section-table__row-per-page visible-on-mob">
                            <span>Rows per page:</span>

                            <CustomSelect list={RowsPerPage()} defaultValue={RowsPerPage()[0]} selectValue={selectValue} setSelectedItem={setSelectValue}/>
                        </div>

                        {selectValue.value !== 0 && employees.length > selectValue.value &&
                            <button onClick={handleAddRows} className="section-table__see-more btn" type="button">
                                Show more
                                <svg width="15" height="15" viewBox="0 0 15 15">
                                    <use xlinkHref="#arrow-down"></use>
                                </svg>
                            </button>}

                        <div className="section-table__row-per-page visible-on-desktop">
                            <span>Rows per page:</span>

                            <CustomSelect list={RowsPerPage()} defaultValue={RowsPerPage()[0]} selectValue={selectValue} setSelectedItem={setSelectValue}/>

                        </div>
                    </div>

            </HeaderSearch.Provider>
        </EmployeesStyled>
    )
}
