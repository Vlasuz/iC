import React, {useEffect, useState} from 'react'
import {SummaryEmployeesItem} from "./components/SummaryEmployeesItem";
import {Notifications} from "../../components/notifications/Notifications";
import {TableSelectYearMonth} from "../../components/table/TableSelectYearMonth";
import {TableProjectsForUser} from "../../components/table/TableProjectsForUser";
import {TableExport} from "../../components/table/TableExport";
import {CustomSelect} from "../../components/customSelect/CustomSelect";
import {SummaryEmployeesStyled} from "./SummaryEmployees.styled";
import {RowsPerPage} from "../../constants/RowsPerPage";
import {SetSummaryEmployees} from "../../api/SetSummaryEmployees";
import { useDispatch, useSelector } from 'react-redux';
import {IProject, ISummaryEmployee} from "../../models";
import {Translate} from "../../components/translate/Translate";
import axios from "axios";
import {getApiLink} from "../../functions/getApiLink";

interface ISummaryEmployeesProps {

}

export const SummaryEmployees: React.FC<ISummaryEmployeesProps> = () => {

    const dispatch = useDispatch()

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

    const summaryEmployees: ISummaryEmployee = useSelector((state: any) => state.toolkit.summaryEmployees)

    const handleAddRows = () => {
        const plusCount = window.innerWidth < 768 ? 10 : 20
        setRowsSelectValue({
            value: rowsSelectValue.value + plusCount,
            label: summaryEmployees.all.length === +rowsSelectValue.label + plusCount ? "All" : String(+rowsSelectValue.label + plusCount)
        })
    }

    useEffect(() => {
        setRowsSelectValue(RowsPerPage()[0].value < summaryEmployees?.all?.length ? RowsPerPage()[0] : RowsPerPage()[3])
    }, [])

    useEffect(() => {
        SetSummaryEmployees(dispatch)
    }, [])

    const [valueSearch, setValueSearch] = useState("")

    const [allProjects, setAllProjects] = useState<IProject[]>([])
    useEffect(() => {
        axios.get(getApiLink("/api/timesheet/projects/")).then(({data}) => {
            console.log(data)
            setAllProjects(data)
        })
    }, [])

    return (
        <SummaryEmployeesStyled className="summary">
            <div className="summary__header page-header">
                <div className="page-header__col">
                    <h1 className="page-header__title title">
                        <Translate>summary_page.main.summary</Translate> / <Translate>employees_page.table.employees</Translate>
                    </h1>
                </div>
                <div className="page-header__col">

                    <Notifications/>

                </div>
                <form className="page-header__row employees-row">

                    <TableSelectYearMonth/>

                    <TableProjectsForUser projectList={allProjects} setProjectData={setProjectData} projectData={projectData}/>

                    <div className="employees-row__search">
                        <div className="section-table__search is-alternative">
                            <label className="section-table__search--label">
                                <input type="search" required name="search"
                                       className="section-table__search--input" value={valueSearch} onChange={e => setValueSearch(e.target.value)} />
                                <span className="placeholder">
                                    <Translate>employees_page.table.search_an_employee</Translate>
                                </span>
                            </label>
                            <button className="section-table__search--submit btn is-grey is-min-on-mob" type="submit">
                                <Translate>employees_page.table.search</Translate>
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

                {
                    summaryEmployees?.favourite
                        ?.filter(item => item.user.last_name.toLowerCase().includes(valueSearch.toLowerCase()))
                        ?.map(item => <SummaryEmployeesItem key={item.id} isFavorite={true} itemData={item}/>)
                }
                {
                    summaryEmployees?.all
                        ?.filter(item => item.user.last_name.toLowerCase().includes(valueSearch.toLowerCase()))
                        ?.map(item => <SummaryEmployeesItem key={item.id} itemData={item}/>)
                }

            </div>
            <div className="summary__footer page-footer">
                <div className="page-footer__row-per-page visible-on-mob">
                    <span>Rows per page:</span>
                    <CustomSelect list={RowsPerPage()} defaultValue={RowsPerPage()[0]} selectValue={rowsSelectValue} setSelectedItem={setRowsSelectValue}/>
                </div>
                {rowsSelectValue.value !== 0 && summaryEmployees?.all?.length > rowsSelectValue.value &&
                    <button onClick={handleAddRows} className="section-table__see-more btn" type="button">
                        <Translate>costs_page.table.show_more</Translate>
                        <svg width="15" height="15" viewBox="0 0 15 15">
                            <use xlinkHref="#arrow-down"></use>
                        </svg>
                    </button>}
                <div className="page-footer__row-per-page visible-on-desktop">
                    <span>
                        <Translate>costs_page.table.rows_per_page</Translate>
                    </span>
                    <CustomSelect list={RowsPerPage()} defaultValue={RowsPerPage()[0]} selectValue={rowsSelectValue} setSelectedItem={setRowsSelectValue}/>
                </div>
            </div>
        </SummaryEmployeesStyled>
    )
}
