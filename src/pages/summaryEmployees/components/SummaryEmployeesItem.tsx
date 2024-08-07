import React, {useContext, useEffect, useRef, useState} from 'react'

import {IStatistic, ISummaryEmployee, ITimesheet} from "../../../models";
import {getApiLink} from "../../../functions/getApiLink";
import {SetFavoriteEmployee} from "../../../api/SetFavoriteEmployee";
import {useDispatch, useSelector} from 'react-redux';
import {SummaryEmployeesButtons} from "./SummaryEmployeesButtons";
import {SummaryEmployeesChangeDecision} from "./SummaryEmployeesChangeDecision";
import {SummaryEmployeesStatusRejected} from "./SummaryEmployeesStatusRejected";
import {SummaryEmployeesStatusApproved} from "./SummaryEmployeesStatusApproved";
import axios from "axios";
import {getBearer} from "../../../functions/getBearer";
import {setChosenTimesheet, setSummaryEmployeeIdOpen} from "../../../storage/toolkit";
import {NavLink} from "react-router-dom";
import {mergeAndSum} from '../../../functions/mergeAndSumStatistic';
import {useTranslation} from "react-i18next";
import {Translate} from "../../../components/translate/Translate";
import {currency} from "../../../constants/Currency";
import {PopupContext} from "../../../App";
import {SummaryExportTable} from "../../summary/components/SummaryExportTable";
import {SummaryExportTableTimesheet} from "../../summary/components/SummaryExportTableTimesheet";
import {CostsExcel} from "../../costs/components/CostsExcel";
import {SetStatistic} from "../../../api/SetStatistic";
import {SetExpenses} from "../../../api/SetExpenses";
import {SetTasks} from "../../../api/SetTasks";
import html2pdf from "html2pdf.js";
import {SummaryExcel} from "../../summary/components/SummaryExcel";
import {GetAccessToken} from "../../../api/GetAccessToken";

interface ISummaryEmployeesItemProps {
    itemData: ITimesheet
    isFavorite?: boolean
    setStatisticForTable: any
    allUserStatistics: any
}

interface IStatisticList {
    project: {
        id: string
        name: string
        description: string
    },
    expense: {
        sum: number
        percent: number
    },
    task: {
        hours: number
        percent: number
    }
}

export const SummaryEmployeesItem: React.FC<ISummaryEmployeesItemProps> = ({
                                                                               itemData,
                                                                               isFavorite,
                                                                               setStatisticForTable,
                                                                               allUserStatistics
                                                                           }) => {

    const summaryEmployees: ISummaryEmployee = useSelector((state: any) => state.toolkit.summaryEmployees)
    const summaryEmployeeIdOpen: string = useSelector((state: any) => state.toolkit.summaryEmployeeIdOpen)
    const chosenTimesheet: ITimesheet = useSelector((state: any) => state.toolkit.chosenTimesheet)

    const [isOpen, setIsOpen] = useState(summaryEmployeeIdOpen === itemData?.id)
    const [isFavoriteLocal, setIsFavoriteLocal] = useState(isFavorite)
    const [isChangeDecision, setIsChangeDecision] = useState(false)
    const [isLoad, setIsLoad] = useState(false)

    const summaryBlock: any = useRef(null)

    useEffect(() => {
        if (isLoad) return;

        setIsLoad(true)

        if (summaryEmployeeIdOpen === itemData?.id && summaryBlock.current) {
            // Получаем высоту элемента
            const blockHeight = summaryBlock.current.getBoundingClientRect().y;


            // Прокручиваем пользователя к элементу
            setTimeout(() => {
                // @ts-ignore
                summaryBlock.current?.closest(".simplebar-content-wrapper").scrollTo({
                    top: blockHeight, // Вычитаем высоту элемента, чтобы цель оказалась выше визуальной области
                    behavior: 'smooth', // Для плавной прокрутки
                });
            }, 200)
        }
    }, [isLoad, summaryEmployeeIdOpen, itemData]);

    const dispatch = useDispatch()

    const setPopup: any = useContext(PopupContext)

    const itemDate = itemData.updated_at;
    const dateForStatus = itemDate.replaceAll(".", " / ")

    const {t} = useTranslation();


    const [isClickToExport, setIsClickToExport] = useState(false)
    const handleExportPdf = () => {
        // setIsClickToExport(true)

        getBearer("get")
        axios.get(getApiLink(`/api/timesheet/tasks/?timesheet_id=${itemData.id}`)).then((resTasks) => {


            getBearer("get")
            axios.get(getApiLink(`/api/timesheet/expenses/?timesheet_id=${itemData.id}`)).then((resExpenses) => {

                SummaryExcel({chosenTimesheet: itemData, translate: t, data: statisticList, tasks: resTasks.data, expenses: resExpenses.data})

            }).catch(er => {
                er?.response?.status === 401 && GetAccessToken(dispatch, handleExportPdf)
            })


        }).catch(er => {
            er?.response?.status === 401 && GetAccessToken(dispatch, handleExportPdf)
        })
    }

    const [count, setCount] = useState(0)

    // useEffect(() => {
    //
    //     if (isClickToExport && count === 3) {
    //
    //         getBearer("get")
    //         axios.get(getApiLink(`/api/timesheet/tasks/?timesheet_id=${itemData.id}`)).then((resTasks) => {
    //
    //
    //             getBearer("get")
    //             axios.get(getApiLink(`/api/timesheet/expenses/?timesheet_id=${itemData.id}`)).then((resExpenses) => {
    //
    //                 SummaryExcel({chosenTimesheet, translate: t, data: statisticList, tasks: resTasks.data, expenses: resExpenses.data})
    //
    //             }).catch(er => {
    //                 er?.response?.status === 401 && GetAccessToken(dispatch, handleEntryCost)
    //             })
    //
    //
    //         }).catch(er => {
    //             er?.response?.status === 401 && GetAccessToken(dispatch, handleEntryCost)
    //         })
    //
    //         // setTimeout(() => {
    //         //
    //         //     setTimeout(() => {
    //         //         setIsClickToExport(false)
    //         //     }, 1500)
    //         // }, 1000)
    //
    //     }
    // }, [count, isClickToExport])

    useEffect(() => {
        if (!isClickToExport) return;

        setCount(0)

        SetStatistic(dispatch, itemData.id).finally(() => {
            setCount(prev => prev + 1)
            console.log('111')
        })
        SetExpenses(dispatch, itemData.id).finally(() => {
            setCount(prev => prev + 1)
            console.log('222')
        })
        SetTasks(dispatch, itemData.id).finally(() => {
            setCount(prev => prev + 1)
            console.log('333')
        })

    }, [isClickToExport])


    const timesheetStatus: any = {
        "progress": {
            title: <Translate>summary_page.main.in_progress</Translate>,
            icon: "#attention"
        },
        "waiting": {
            title: `${t('summary_page.main.sent_for_approval')} ${dateForStatus}`,
            icon: "#time"
        },
        "reject": {
            title: `${dateForStatus}`,
            icon: "#round-error"
        },
        "approve": {
            title: `${dateForStatus}`,
            icon: "#round-check"
        },
    }

    useEffect(() => {

        // getBearer('get')
        // axios.get(getApiLink(`/api/timesheet/statistics/?timesheet_id=${itemData?.id}`)).then(({data}) => {
        //     console.log(data)
        //     setStatistic(data)
        // }).catch(er => console.log(getApiLink("/api/timesheet/statistics/?timesheet_id"), er))

    }, [])

    useEffect(() => {
        setIsChangeDecision(false)
    }, [summaryEmployees])

    const handleOpenItem = (e: any) => {
        if(e.target.closest('.summary-item__user--favorite')) return;

        setIsOpen(prev => !prev)
        dispatch(setSummaryEmployeeIdOpen(isOpen ? "" : itemData.id))
    }

    const handleFavorite = () => {
        setIsFavoriteLocal(prev => !prev)

        SetFavoriteEmployee(dispatch, itemData?.user?.id ?? "")
    }

    const footerBlockByStatus: any = {
        "progress": "",
        "waiting": <SummaryEmployeesButtons isClickToExport={isClickToExport} handleExportPdf={handleExportPdf}
                                            timesheetId={itemData.id}/>,
        "reject": <SummaryEmployeesChangeDecision isClickToExport={isClickToExport} handleExportPdf={handleExportPdf}
                                                  itemData={itemData}/>,
        "approve": <SummaryEmployeesChangeDecision isClickToExport={isClickToExport} handleExportPdf={handleExportPdf}
                                                   itemData={itemData}/>,
    }
    const footerStatusesByStatus: any = {
        "progress": <div className="summary-item__footer--col"/>,
        "waiting": <div className="summary-item__footer--col"/>,
        "reject": <SummaryEmployeesStatusRejected itemData={itemData}/>,
        "approve": <SummaryEmployeesStatusApproved itemData={itemData}/>,
    }

    const [statisticList, setStatisticList]: any = useState([])

    useEffect(() => {
        if (!allUserStatistics || !Object.keys(allUserStatistics).length) return;

        setStatisticList(mergeAndSum(allUserStatistics?.expenses, allUserStatistics?.tasks).statistic)

        setStatisticForTable((prev: any[]) => [...prev, {
            user: itemData.user,
            data: mergeAndSum(allUserStatistics?.expenses, allUserStatistics?.tasks).statistic,
            all_hours: allUserStatistics.all_hours,
            all_sum: allUserStatistics.all_sum
        }])
    }, [allUserStatistics])

    const handleOpenProfile = () => {
        setPopup({popup: "profile-popup", data: itemData.user})
    }

    return (
        <>
            {isClickToExport &&
                <SummaryExportTable user={itemData.user} statistic={allUserStatistics} statisticList={statisticList}/>}
            {isClickToExport && <SummaryExportTableTimesheet user={itemData.user}/>}
            {/*{isClickToExport && <CostsExcel user={itemData.user}/>}*/}

            <div ref={summaryBlock} className={`summary-item ${isOpen && "is-active"}`}>
                <div onClick={handleOpenItem} className="summary-item__target">
                    <div className="summary-item__target--user summary-item__user">
                        <button onClick={handleOpenProfile} className="summary-item__user--avatar">
                            {itemData.user.avatar ? <picture>
                                    <img src={getApiLink(`/${itemData.user.avatar}`)} alt="" width="60" height="60"
                                         loading="lazy"/>
                                </picture> :
                                <div className="aside__user--avatar"
                                     style={{background: itemData.user.avatar_color ? itemData.user.avatar_color : "#EF3129"}}>
                                    {itemData.user.first_name[0]}{itemData.user.last_name[0]}
                                </div>
                            }
                        </button>
                        <div className="summary-item__user--info">
                            <h2 className="summary-item__user--name">
                                {itemData.user.first_name} {itemData.user.last_name}
                            </h2>
                            <span className="summary-item__user--position" style={{textTransform: "capitalize"}}>
                                {/*{EmployeesStatus().filter(item => item.value === itemData.user.status)[0]?.label}*/}
                                {itemData.user.role}
                                {/*{itemData.user.id}*/}
                            </span>
                        </div>
                        <button onClick={handleFavorite} type="button"
                                className={`summary-item__user--favorite ${isFavoriteLocal && "is-active"}`}>
                            <svg width="20" height="20" viewBox="0 0 20 20">
                                <use xlinkHref="#star"></use>
                            </svg>
                        </button>
                    </div>
                    <div
                        className={`summary-item__target--status ${itemData.status === "waiting" && "is-waiting"} ${itemData.status === "reject" && "is-danger"} ${itemData.status === "approve" && "is-success"}`}>
                        <span>
                            {timesheetStatus[itemData.status]?.title}
                        </span>
                        <svg width="20" height="20" viewBox="0 0 20 20">
                            <use xlinkHref={timesheetStatus[itemData.status]?.icon}></use>
                        </svg>
                    </div>
                    <button type="button" className="summary-item__target--toggle">
                        <svg width="10" height="7" viewBox="0 0 10 7" className="summary-item__target--arrow">
                            <use xlinkHref="#drop-down-arrow"></use>
                        </svg>
                    </button>
                </div>
                <div className="summary-item__block">
                    <div>
                        <div className="summary-item__elements-list">

                            {
                                statisticList.map((item: IStatisticList) =>
                                    <div key={item.project.id} className="summary-item__element">
                                        <h3 className="summary-item__element--name">
                                            {item.project.name}_{item.project.description}
                                        </h3>
                                        <div className="summary-item__element--progress">
                                            <span>{item.task.hours} <Translate>timesheet_page.table.h</Translate></span>
                                            <span data-value={`${item.task.percent > 100 ? 100 : item.task.percent}%`}>
                                                <div className="line_done" style={{width: `${item.task.percent}%`}}/>
                                            </span>
                                        </div>
                                        <div className="summary-item__element--progress">
                                            <span>{item.expense.sum.toFixed(2)} {currency}</span>
                                            <span
                                                data-value={`${item.expense.percent > 100 ? 100 : item.expense.percent}%`}>
                                                <div className="line_done" style={{width: `${item.expense.percent}%`}}/>
                                            </span>
                                        </div>
                                    </div>
                                )
                            }

                        </div>
                        <div className="summary-item__total">
                            <b className="summary-item__total--title">
                                <Translate>employees_page.table.total</Translate>
                            </b>
                            <div className="summary-item__total--element summary-item__total-element">
                                <div className="summary-item__total-element--icon">
                                    <svg width="22" height="22" viewBox="0 0 22 22">
                                        <use xlinkHref="#time-2"></use>
                                    </svg>
                                </div>
                                <b className="summary-item__total-element--name">
                                    <Translate>summary_page.main.time_spent_for_projects</Translate>
                                </b>
                                <NavLink onClick={_ => dispatch(setChosenTimesheet(itemData))}
                                         to={`/timesheet/${itemData.id}`} className="summary-item__total-element--link">
                                    <Translate>summary_page.main.show_full_data_timesheet</Translate>
                                    <svg width="7" height="10" viewBox="0 0 7 10">
                                        <use xlinkHref="#arrow-next"></use>
                                    </svg>
                                </NavLink>
                                <div className="summary-item__total-element--value">
                                    {allUserStatistics?.all_hours?.toFixed(1)} <Translate>summary_page.main.hours</Translate>
                                </div>
                            </div>
                            <div className="summary-item__total--element summary-item__total-element">
                                <div className="summary-item__total-element--icon">
                                    <svg width="22" height="22" viewBox="0 0 22 22">
                                        <use xlinkHref="#money-2"></use>
                                    </svg>
                                </div>
                                <b className="summary-item__total-element--name">
                                    <Translate>summary_page.main.money_spent_for_projects</Translate>
                                </b>
                                <NavLink onClick={_ => dispatch(setChosenTimesheet(itemData))}
                                         to={`/expenses/${itemData.id}`}
                                         className="summary-item__total-element--link">
                                    <Translate>summary_page.main.show_full_data_costs</Translate>
                                    <svg width="7" height="10" viewBox="0 0 7 10">
                                        <use xlinkHref="#arrow-next"></use>
                                    </svg>
                                </NavLink>
                                <div className="summary-item__total-element--value">
                                    {allUserStatistics?.all_sum?.toFixed(2)} {currency}
                                </div>
                            </div>
                        </div>
                        <div
                            className={`summary-item__footer ${(itemData.status === "waiting" || itemData.status === "progress" || isChangeDecision) && "add-cols"}`}>

                            {footerStatusesByStatus[itemData.status]}
                            {
                                isChangeDecision ?
                                    <SummaryEmployeesButtons isClickToExport={isClickToExport}
                                                             handleExportPdf={handleExportPdf}
                                                             timesheetId={itemData.id}/>
                                    :
                                    footerBlockByStatus[itemData.status]
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
