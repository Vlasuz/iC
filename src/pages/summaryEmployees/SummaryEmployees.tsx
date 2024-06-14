import React, {useEffect, useState} from 'react'
import {SummaryEmployeesItem} from "./components/SummaryEmployeesItem";
import {Notifications} from "../../components/notifications/Notifications";
import {TableSelectYearMonth} from "../../components/table/TableSelectYearMonth";
import {TableProjectsForUser} from "../../components/table/TableProjectsForUser";
import {TableExportCustom} from "../../components/table/TableExportCustom";
import {CustomSelect} from "../../components/customSelect/CustomSelect";
import {SummaryEmployeesStyled} from "./SummaryEmployees.styled";
import {RowsPerPage} from "../../constants/RowsPerPage";
import {SetSummaryEmployees} from "../../api/SetSummaryEmployees";
import {useDispatch, useSelector} from 'react-redux';
import {IProject, ISummaryEmployee, IUser} from "../../models";
import {Translate} from "../../components/translate/Translate";
import axios from "axios";
import {getApiLink} from "../../functions/getApiLink";
import {useTranslation} from "react-i18next";
import {SummaryEmployeesExcel} from "./components/SummaryEmployeesExcel";
import {getBearer} from "../../functions/getBearer";
import {generateAlphaNumericSequence} from "../../functions/getAlphabetNumbers";

interface ISummaryEmployeesProps {

}

export const SummaryEmployees: React.FC<ISummaryEmployeesProps> = () => {

    const dispatch = useDispatch()

    const statusSortList = [
        {
            label: <Translate>all_statuses</Translate>,
            value: "default"
        },
        {
            label: <Translate>employees_page.table.pending_first</Translate>,
            value: "waiting"
        },
        {
            label: <Translate>employees_page.table.progress_first</Translate>,
            value: "progress"
        },
        {
            label: <Translate>employees_page.table.rejected_first</Translate>,
            value: "reject"
        },
        {
            label: <Translate>employees_page.table.approved_first</Translate>,
            value: "approve"
        }
    ]

    const user: IUser = useSelector((state: any) => state.toolkit.user)
    const summaryEmployees: ISummaryEmployee = useSelector((state: any) => state.toolkit.summaryEmployees)
    const chosenTimesheet = useSelector((state: any) => state.toolkit.chosenTimesheet)

    const [actualMonth, setActualMonth] = useState<string>(String(new Date().getMonth() + 1))
    const [actualYear, setActualYear] = useState<string>(String(new Date().getFullYear()))

    useEffect(() => {
        if(month) return;
        if(!chosenTimesheet?.date) return;

        setActualMonth(`${chosenTimesheet?.date[3]}${chosenTimesheet?.date[4]}`)
        setActualYear(`20${chosenTimesheet?.date[6]}${chosenTimesheet?.date[7]}`)
    }, [chosenTimesheet])

    const [projectData, setProjectData] = useState<any>(undefined)
    const [statusSortValue, setStatusSortValue] = useState(statusSortList[0])
    const [year, setYear] = useState(+actualYear)
    const [month, setMonth] = useState(+actualMonth)
    const [isLoad, setIsLoad] = useState(false)
    const [statisticForTable, setStatisticForTable]: any = useState([])

    useEffect(() => {
        axios.get(getApiLink("/api/timesheet/projects/")).then(({data}) => {
            setAllProjects(data)
            setProjects(data)
        })
    }, [])

    useEffect(() => {
        if (isLoad) return;

        setTimeout(() => {
            setIsLoad(true)
        }, 1000)
    }, [summaryEmployees.all, isLoad])

    useEffect(() => {
        if (!year) return;
        if (!month) return;
        setIsHaveEmployees(false)
        SetSummaryEmployees(dispatch, month, year === 0 ? +actualYear : year)
    }, [month, year])

    const [valueSearch, setValueSearch] = useState("")
    const [allProjects, setAllProjects] = useState<IProject[]>([])

    useEffect(() => {
        if(!projectData?.id) return
        SetSummaryEmployees(dispatch, month, year, projectData?.id)
    }, [projectData])

    let numberOfRow = 0;

    const {t} = useTranslation()


    const [projects, setProjects] = useState<IProject[]>([])
    const [allUsersStatistics, setAllUsersStatistics] = useState<any[]>([])

    const [isHaveEmployees, setIsHaveEmployees] = useState(false)

    useEffect(() => {
        if(!summaryEmployees?.all?.length) return;
        if(isHaveEmployees) return;
        setIsHaveEmployees(true)

        if(!year && !month) return;


        getBearer('get')
        axios.get(getApiLink(`/api/timesheet/statistics/all/?year=${year}&month=${month}`)).then(({data}) => {
            setAllUsersStatistics(data)
        }).catch(er => console.log(er))


    }, [summaryEmployees, month, year])

    return (
        <SummaryEmployeesStyled className="summary">

            <div className="summary__header page-header">
                <div className="page-header__col">
                    <h1 className="page-header__title title">
                        <Translate>employees_page.table.employees</Translate>
                    </h1>
                </div>
                <div className="page-header__col">

                    <Notifications/>

                </div>
                <form className="page-header__row employees-row">

                    <TableSelectYearMonth setMonth={setMonth} setYear={setYear}/>

                    <TableProjectsForUser projectList={allProjects} setProjectData={setProjectData}
                                          projectData={projectData}/>

                    <div className="employees-row__search">
                        <div className="section-table__search is-alternative">
                            <label className="section-table__search--label">
                                <input type="search" required name="search"
                                       className="section-table__search--input" value={valueSearch}
                                       onChange={e => setValueSearch(e.target.value)}/>
                                <span className="placeholder">
                                    {!valueSearch && <Translate>employees_page.table.search_an_employee</Translate>}
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
                        <CustomSelect list={statusSortList} setSelectedItem={setStatusSortValue}
                                      selectValue={statusSortValue}/>
                    </div>

                    {user.status === "team_lead" &&
                        <TableExportCustom
                            isCanNotExportPdf={true}
                            excelFile={(e: any) => SummaryEmployeesExcel({chosenTimesheet, projects, users: allUsersStatistics, translate: t})}
                        />
                    }

                </form>
            </div>
            <div className="summary__main">

                {
                    summaryEmployees?.favourite
                        ?.filter(item => `${item.user.first_name} ${item.user.last_name}`.toLowerCase().includes(valueSearch.toLowerCase()))
                        ?.sort((a: any, b: any) => {
                            const lastNameA = a.user.last_name.toLowerCase();
                            const lastNameB = b.user.last_name.toLowerCase();

                            return lastNameB > lastNameA ? -1 : 1;
                        })
                        // ?.filter((a: any, b: any) => b.status === statusSortValue.value ? 1 : -1)
                        ?.filter((item: any) => statusSortValue.value === "default" ? item : item.status === statusSortValue.value)
                        ?.map(item => <SummaryEmployeesItem allUserStatistics={allUsersStatistics.filter((item2: any) => item2.user.id === item.user.id)[0]?.statistics} setStatisticForTable={setStatisticForTable} key={item.id}
                                                            isFavorite={true} itemData={item}/>)
                }
                {
                    summaryEmployees?.all
                        ?.filter(item => `${item.user.first_name} ${item.user.last_name}`.toLowerCase().includes(valueSearch.toLowerCase()))
                        ?.sort((a: any, b: any) => {
                            const lastNameA = a.user.last_name.toLowerCase();
                            const lastNameB = b.user.last_name.toLowerCase();

                            return lastNameB > lastNameA ? -1 : 1;
                        })
                        ?.filter((item: any) => statusSortValue.value === "default" ? item : item.status === statusSortValue.value)
                        ?.map(item => {
                            numberOfRow += 1;

                            // if (rowsSelectValue?.value && rowsSelectValue?.value < numberOfRow) return "";

                            return <SummaryEmployeesItem allUserStatistics={allUsersStatistics.filter((item2: any) => item2.user.id === item.user.id)[0]?.statistics} setStatisticForTable={setStatisticForTable} key={item.id} itemData={item}/>
                        })
                }


            </div>
        </SummaryEmployeesStyled>
    )
}
