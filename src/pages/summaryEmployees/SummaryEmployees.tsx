import React, {useEffect, useState} from 'react'
import {SummaryEmployeesItem} from "./components/SummaryEmployeesItem";
import {Notifications} from "../../components/notifications/Notifications";
import {TableSelectYearMonth} from "../../components/table/TableSelectYearMonth";
import {TableProjectsForUser} from "../../components/table/TableProjectsForUser";
import {TableExport} from "../../components/table/TableExport";
import {CustomSelect} from "../../components/customSelect/CustomSelect";
import {SummaryEmployeesStyled} from "./SummaryEmployees.styled";
import {RowsPerPage} from "../../constants/RowsPerPage";

interface ISummaryEmployeesProps {

}

export const SummaryEmployees: React.FC<ISummaryEmployeesProps> = () => {

    const statusSortList = [
        {
            label: "Pending first",
            value: "pending_first"
        },
        {
            label: "Rejected first",
            value: "rejected_first"
        },
        {
            label: "Approved first",
            value: "approved_first"
        }
    ]

    const [projectData, setProjectData] = useState(undefined)
    const [statusSortValue, setStatusSortValue] = useState(statusSortList[0])
    const [rowsSelectValue, setRowsSelectValue] = useState(RowsPerPage()[0])

    const [employeesList, setEmployeesList] = useState([' ', ' '])

    const handleAddRows = () => {
        const plusCount = window.innerWidth < 768 ? 10 : 20
        setRowsSelectValue({
            value: rowsSelectValue.value + plusCount,
            label: employeesList.length === +rowsSelectValue.label + plusCount ? "All" : String(+rowsSelectValue.label + plusCount)
        })
    }

    return (
        <SummaryEmployeesStyled className="summary">
            <div className="summary__header page-header">
                <div className="page-header__col">
                    <h1 className="page-header__title title">
                        Summary / Employees
                    </h1>
                </div>
                <div className="page-header__col">

                    <Notifications/>

                </div>
                <form className="page-header__row employees-row">

                    <TableSelectYearMonth/>

                    <TableProjectsForUser setProjectData={setProjectData} projectData={projectData}/>

                    <div className="employees-row__search">
                        <div className="section-table__search is-alternative">
                            <label className="section-table__search--label">
                                <input type="search" required name="search" placeholder="Search an employee"
                                       className="section-table__search--input" />
                            </label>
                            <button className="section-table__search--submit btn is-grey is-min-on-mob" type="submit">
                                Search
                                <svg width="15" height="15" viewBox="0 0 15 15">
                                    <use xlinkHref="#search"></use>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="page-header__select employees-row__sort">
                        <CustomSelect list={statusSortList} setSelectedItem={setStatusSortValue} selectValue={statusSortValue} />
                    </div>

                    <TableExport/>
                </form>
            </div>
            <div className="summary__main">

                <SummaryEmployeesItem/>

            </div>
            <div className="summary__footer page-footer">
                <div className="page-footer__row-per-page visible-on-mob">
                    <span>Rows per page:</span>
                    <CustomSelect list={RowsPerPage()} defaultValue={RowsPerPage()[0]} selectValue={rowsSelectValue} setSelectedItem={setRowsSelectValue}/>
                </div>
                {rowsSelectValue.value !== 0 && employeesList.length > rowsSelectValue.value &&
                    <button onClick={handleAddRows} className="section-table__see-more btn" type="button">
                        Show more
                        <svg width="15" height="15" viewBox="0 0 15 15">
                            <use xlinkHref="#arrow-down"></use>
                        </svg>
                    </button>}
                <div className="page-footer__row-per-page visible-on-desktop">
                    <span>Rows per page:</span>
                    <CustomSelect list={RowsPerPage()} defaultValue={RowsPerPage()[0]} selectValue={rowsSelectValue} setSelectedItem={setRowsSelectValue}/>
                </div>
            </div>
        </SummaryEmployeesStyled>
    )
}
