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
import {Translate} from "../../components/translate/Translate";

interface IEmployeesProps {

}

export const Employees: React.FC<IEmployeesProps> = () => {

    const employees: IEmployee[] = useSelector((state: any) => state.toolkit.employees)

    const [searchValue, setSearchValue] = useState<string>('')
    const [selectValue, setSelectValue] = useState(RowsPerPage()[0])
    const [isLoad, setIsLoad] = useState(false)

    useEffect(() => {
        if (isLoad) return;

        setSelectValue(employees.length > +RowsPerPage()[0].value ? RowsPerPage()[0] : RowsPerPage()[3])
        setTimeout(() => {
            setIsLoad(true)
        }, 1000)
    }, [employees, isLoad])

    const handleAddRows = () => {
        const plusCount = window.innerWidth < 768 ? 10 : 20

        setSelectValue({
            value: employees.length <= +selectValue.label + plusCount ? 0 : selectValue.value + plusCount,
            label: employees.length <= +selectValue.label + plusCount ? "All" : String(+selectValue.label + plusCount)
        })
    }

    const [employeesList, setEmployeesList] = useState(employees?.filter(item => item?.first_name?.toLowerCase().includes(searchValue.toLowerCase()) || item?.last_name?.toLowerCase().includes(searchValue.toLowerCase()))
        ?.sort((a, b) => +a.archive - +b.archive))

    useEffect(() => {
        employees?.length && setEmployeesList(employees?.filter(item => item?.first_name?.toLowerCase().includes(searchValue.toLowerCase()) || item?.last_name?.toLowerCase().includes(searchValue.toLowerCase()))
            // ?.filter((item, index) => countOfShowRows === 0 ? item : index < countOfShowRows)
            ?.sort((a, b) => +a.archive - +b.archive))
    }, [employees])

    return (
        <EmployeesStyled className="section-table">

            <EmployeesHeader setSearchValueGlobal={setSearchValue} />

            <EmployeesTable searchValue={searchValue} rowsSelectValue={selectValue}/>

            <div className="section-table__footer">
                <div className="section-table__row-per-page visible-on-mob">
                            <span>
                                <Translate>employees_admin.table.rows_per_page</Translate>
                            </span>

                    <CustomSelect list={RowsPerPage()} defaultValue={RowsPerPage()[0]} selectValue={selectValue}
                                  setSelectedItem={setSelectValue}/>
                </div>

                {selectValue.value !== 0 && employeesList.length > selectValue.value &&
                    <button onClick={handleAddRows} className="section-table__see-more btn" type="button">
                        <Translate>employees_admin.table.show_more</Translate>
                        <svg width="15" height="15" viewBox="0 0 15 15">
                            <use xlinkHref="#arrow-down"></use>
                        </svg>
                    </button>}

                <div className="section-table__row-per-page visible-on-desktop">
                            <span>
                                <Translate>employees_admin.table.rows_per_page</Translate>
                            </span>

                    <CustomSelect list={RowsPerPage()} defaultValue={RowsPerPage()[0]} selectValue={selectValue}
                                  setSelectedItem={setSelectValue}/>

                </div>
            </div>

        </EmployeesStyled>
    )
}
