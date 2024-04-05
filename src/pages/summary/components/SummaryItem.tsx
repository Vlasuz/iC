import React, {useContext, useEffect, useRef, useState} from 'react'
import {useNavigate} from "react-router-dom";
import {useClickOutside} from "../../../hooks/ClickOutside";
import {IExpense, IStatistic, ITask, ITimesheet} from "../../../models";
import {MonthNumber} from "../../../constants/MonthNumber";
import axios from "axios";
import {getApiLink} from "../../../functions/getApiLink";
import {PopupContext} from "../../../App";
import {getBearer} from "../../../functions/getBearer";
import {setChosenTimesheet, setExpenses, setTasks} from "../../../storage/toolkit";
import {useDispatch, useSelector} from 'react-redux';
import {mergeAndSum} from "../../../functions/mergeAndSumStatistic";
import {Translate} from "../../../components/translate/Translate";
import {useTranslation} from "react-i18next";
import { currency } from '../../../constants/Currency';
import {SummaryExportTable} from "./SummaryExportTable";
import html2pdf from "html2pdf.js";
import { GetAccessToken } from '../../../api/GetAccessToken';
import {SummaryExportTableTimesheet} from "./SummaryExportTableTimesheet";
import {SetTasks} from "../../../api/SetTasks";
import {SetExpenses} from "../../../api/SetExpenses";
import {da} from "date-fns/locale";
import {CostsExcel} from "../../costs/components/CostsExcel";
import {SetStatistic} from "../../../api/SetStatistic";
import {SetTimesheet} from "../../../api/SetTimesheet";
import {SummaryExcel} from "./SummaryExcel";

interface ISummaryItemProps {
    dataItem: ITimesheet
    isOpen: boolean
}

export const SummaryItem: React.FC<ISummaryItemProps> = ({dataItem, isOpen}) => {

    const [statisticList, setStatisticList]: any = useState()
    const [isActive, setIsActive] = useState(isOpen)
    const [statistic, setStatistic] = useState<IStatistic | undefined>()

    const setPopup: any = useContext(PopupContext)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const itemDate = dataItem.updated_at;
    const dateForStatus = itemDate.replaceAll(".", " / ")

    const { t } = useTranslation();

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

    const handleEntryCost = () => {
        dispatch(setChosenTimesheet(dataItem))

        if(!dataItem?.id) return;

        getBearer("get")
        axios.get(getApiLink(`/api/timesheet/expenses/?timesheet_id=${dataItem.id}`)).then(({data}) => {
            navigate('/costs')
            dispatch(setExpenses(data))
        }).catch(er => {
            er?.response?.status === 401 && GetAccessToken(dispatch, handleEntryCost)
        })
    }

    const handleEntryTask = () => {
        dispatch(setChosenTimesheet(dataItem))

        getBearer("get")
        axios.get(getApiLink(`/api/timesheet/tasks/?timesheet_id=${dataItem.id}`)).then(({data}) => {
            navigate('/')
            dispatch(setTasks(data))
        })
    }

    useEffect(() => {
        setStatisticList(mergeAndSum(statistic?.expenses, statistic?.tasks).statistic)
    }, [statistic])

    useEffect(() => {
        if(!dataItem?.id) return;

        getBearer('get')
        axios.get(getApiLink(`/api/timesheet/statistics/?timesheet_id=${dataItem.id}`)).then(({data}) => {
            setStatistic(data)
        }).catch(er => console.log(getApiLink("/api/timesheet/statistics/?timesheet_id"), er))
    }, [])


    const chosenTimesheet: ITimesheet = useSelector((state: any) => state.toolkit.chosenTimesheet)

    const [isClickToExport, setIsClickToExport] = useState(false)
    const handleExportPdf = () => {

        getBearer("get")
        axios.get(getApiLink(`/api/timesheet/tasks/?timesheet_id=${dataItem.id}`)).then((resTasks) => {


            getBearer("get")
            axios.get(getApiLink(`/api/timesheet/expenses/?timesheet_id=${dataItem.id}`)).then((resExpenses) => {

                SummaryExcel({chosenTimesheet, translate: t, data: statisticList, tasks: resTasks.data, expenses: resExpenses.data})

            }).catch(er => {
                er?.response?.status === 401 && GetAccessToken(dispatch, handleEntryCost)
            })


        }).catch(er => {
            er?.response?.status === 401 && GetAccessToken(dispatch, handleEntryCost)
        })

    }

    useEffect(() => {

        // SetStatistic(dispatch, dataItem.id)
        // SetExpenses(dispatch, dataItem.id)
        // SetTasks(dispatch, dataItem.id).then(_ => {
        //     setIsClickToExport(false)
        //
        //     // isClickToExport && convertToPDF()
        //     // isClickToExport && tableToExcel('.table-to-download-excel', "timesheet")
        // })

    }, [isClickToExport])


    const handleCancelSending = () => {
        axios.post(getApiLink(`/api/timesheet/my/send/?timesheet_id=${dataItem.id}&status=progress`)).then(({data}) => {
            if (!data.status) return;

            SetTimesheet(dispatch)
        })
    }

    return (
        <>
            {isClickToExport && <SummaryExportTable statistic={statistic} statisticList={statisticList}/>}
            {isClickToExport && <SummaryExportTableTimesheet />}
            {/*{isClickToExport && <CostsExcel />}*/}

            <div className={`summary-item ${isActive && "is-active"}`}>
                <div onClick={_ => setIsActive(prev => !prev)} className="summary-item__target">
                    <h2 className="summary-item__target--name">
                        {
                            MonthNumber()[+dataItem.date.slice(3, 5)].translate
                        }
                    </h2>
                    <div
                        className={`summary-item__target--status ${dataItem.status === "waiting" && "is-waiting"} ${dataItem.status === "reject" && "is-danger"} ${dataItem.status === "approve" && "is-success"}`}>
                    <span>
                        {timesheetStatus[dataItem.status]?.title}
                    </span>
                        <svg width="20" height="20" viewBox="0 0 20 20">
                            <use xlinkHref={timesheetStatus[dataItem.status]?.icon}></use>
                        </svg>
                    </div>
                    <button className="summary-item__target--toggle" type="button">
                        <svg width="10" height="7" viewBox="0 0 10 7" className="summary-item__target--arrow">
                            <use xlinkHref="#drop-down-arrow"></use>
                        </svg>
                    </button>
                </div>
                <div className="summary-item__block">
                    <div>
                        <div className="summary-item__elements-list">

                            {
                                statisticList?.map((item: any, index: number) =>
                                    <div key={index} className="summary-item__element">
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
                                            <span data-value={`${item.expense.percent > 100 ? 100 : item.expense.percent}%`}>
                                            <div className="line_done" style={{width: `${item.expense.percent}%`}}/>
                                        </span>
                                        </div>
                                    </div>
                                )
                            }

                        </div>
                        <div className="summary-item__total">
                            <b className="summary-item__total--title">
                                <Translate>summary_page.main.total</Translate>
                            </b>
                            <div className="summary-item__total--element summary-item__total-element">
                                <div className="summary-item__total-element--icon">
                                    <svg width="20" height="20" viewBox="0 0 13 13">
                                        <use xlinkHref="#time"></use>
                                    </svg>
                                </div>
                                <b className="summary-item__total-element--name">
                                    <Translate>summary_page.main.time_spent_for_projects</Translate>
                                </b>
                                <button onClick={handleEntryTask} className="summary-item__total-element--link">
                                    <Translate>summary_page.main.show_full_data_timesheet</Translate>
                                    <svg width="7" height="10" viewBox="0 0 7 10">
                                        <use xlinkHref="#arrow-next"></use>
                                    </svg>
                                </button>
                                <div className="summary-item__total-element--value">
                                    {statistic?.all_hours.toFixed(1)} <Translate>summary_page.main.hours</Translate>
                                </div>
                            </div>
                            <div className="summary-item__total--element summary-item__total-element">
                                <div className="summary-item__total-element--icon">
                                    <svg width="20" height="20" viewBox="0 0 20 20">
                                        <use xlinkHref="#money"></use>
                                    </svg>
                                </div>
                                <b className="summary-item__total-element--name">
                                    <Translate>summary_page.main.money_spent_for_projects</Translate>
                                </b>
                                <button onClick={handleEntryCost} className="summary-item__total-element--link">
                                    <Translate>summary_page.main.show_full_data_costs</Translate>
                                    <svg width="7" height="10" viewBox="0 0 7 10">
                                        <use xlinkHref="#arrow-next"></use>
                                    </svg>
                                </button>
                                <div className="summary-item__total-element--value">
                                    {statistic?.all_sum.toFixed(2)} {currency}
                                </div>
                            </div>
                        </div>
                        <div className="summary-item__footer">
                            <div className="summary-item__footer--col">

                                {
                                    dataItem.status === "waiting" && <div className="summary-item__message is-waiting">
                                        <svg width="20" height="20" viewBox="0 0 13 13">
                                            <use xlinkHref="#time"></use>
                                        </svg>
                                        <p>
                                            <Translate>summary_page.other.already_sent_for_approval</Translate>
                                        </p>
                                    </div>
                                }

                                {
                                    dataItem.status === "reject" && <div className="summary-item__message is-danger">
                                        <svg width="20" height="20" viewBox="0 0 13 13">
                                            <use xlinkHref="#round-error"></use>
                                        </svg>
                                        <p>
                                            <Translate>summary_page.other.timesheet_rejected</Translate> (by {dataItem?.manager?.first_name} {dataItem?.manager?.last_name})
                                        </p>
                                    </div>
                                }

                                {
                                    dataItem.status === "approve" && <div className="summary-item__message is-success">
                                        <svg width="20" height="20" viewBox="0 0 13 13">
                                            <use xlinkHref="#round-check"></use>
                                        </svg>
                                        <p>
                                            <Translate>summary_page.other.summary_approved</Translate> (by {dataItem?.manager?.first_name} {dataItem?.manager?.last_name})
                                        </p>
                                    </div>
                                }

                            </div>
                            <div className="summary-item__footer--col" style={{gridTemplateColumns: dataItem.status !== "approve" ? "1fr 1fr": "1fr"}}>
                                <button className="summary-item__button btn is-grey is-transparent" type="button" onClick={handleExportPdf}>
                                    <Translate>summary_page.main.export_monthly_summary</Translate>
                                    <svg width="16" height="17" viewBox="0 0 16 17">
                                        <use xlinkHref="#download"></use>
                                    </svg>
                                </button>
                                {!(dataItem.status === "waiting" || dataItem.status === "approve") ? <a onClick={_ => setPopup({popup: "approve-timesheet-popup", data: dataItem})}
                                    className={`summary-item__button btn open-popup`}
                                    type="button">
                                    <Translate>summary_page.main.send_timesheet_for_approval</Translate>
                                </a> :
                                    (dataItem.status !== "approve" && <a onClick={handleCancelSending} className={`summary-item__button btn is-grey`} type="button">
                                        <Translate>cancel_sending</Translate>
                                    </a>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
