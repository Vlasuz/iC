import React, {useContext, useEffect, useRef, useState} from 'react'
import {NavLink, useNavigate} from "react-router-dom";
import {useClickOutside} from "../../../hooks/ClickOutside";
import {ITimesheet} from "../../../models";
import {MonthNumber} from "../../../constants/MonthNumber";
import axios from "axios";
import {getApiLink} from "../../../functions/getApiLink";
import {PopupContext} from "../../../App";
import {getBearer} from "../../../functions/getBearer";
import {setChosenTimesheet, setExpenses, setTasks} from "../../../storage/toolkit";
import { useDispatch } from 'react-redux';

interface ISummaryItemProps {
    dataItem: ITimesheet
}

export const SummaryItem: React.FC<ISummaryItemProps> = ({dataItem}) => {

    const [isActive, setIsActive] = useState(false)
    const {rootEl} = useClickOutside(setIsActive)

    const setPopup: any = useContext(PopupContext)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const itemDate = dataItem.date;
    const dateForStatus = `${itemDate[0] + itemDate[1]} / ${itemDate[3] + itemDate[4]} / 20${itemDate[6] + itemDate[7]}`

    const timesheetStatus: any = {
        "progress": {
            title: "In progress",
            icon: "#attention"
        },
        "waiting": {
            title: `Sent for approval ${dateForStatus}`,
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

        getBearer("get")
        axios.get(getApiLink(`/api/timesheet/my/expenses/?timesheet_id=${dataItem.id}`)).then(({data}) => {
            navigate('/costs')
            dispatch(setExpenses(data))
        })
    }

    const handleEntryTask = () => {
        dispatch(setChosenTimesheet(dataItem))

        getBearer("get")
        axios.get(getApiLink(`/api/timesheet/my/tasks/?timesheet_id=${dataItem.id}`)).then(({data}) => {
            navigate('/')
            dispatch(setTasks(data))
        })
    }

    return (
        <div ref={rootEl} className={`summary-item ${isActive && "is-active"}`}>
            <div onClick={_ => setIsActive(prev => !prev)} className="summary-item__target">
                <h2 className="summary-item__target--name">
                    {
                        MonthNumber()[+dataItem.date.slice(3, 5)]
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
                        <div className="summary-item__element">
                            <h3 className="summary-item__element--name">61xA210739_Kremenchuk Bridge
                                supervision</h3>
                            <div className="summary-item__element--progress">
                                <span>18 h</span>
                                <span data-value="9%">
                                            <span className="line" style={{width: "9%"}}></span>
                                        </span>
                            </div>
                            <div className="summary-item__element--progress">
                                <span>5 000 UAH</span>
                                <span data-value="2%">
                                            <span className="line" style={{width: "2%"}}></span>
                                        </span>
                            </div>
                        </div>
                        <div className="summary-item__element">
                            <h3 className="summary-item__element--name">61xA210739_Kremenchuk Bridge
                                supervision</h3>
                            <div className="summary-item__element--progress">
                                <span>8 h</span>
                                <span data-value="9%">
                                            <span className="line" style={{width: "9%"}}></span>
                                        </span>
                            </div>
                            <div className="summary-item__element--progress">
                                <span>522 000 UAH</span>
                                <span data-value="2%">
                                    <span className="line" style={{width: "2%"}}></span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="summary-item__total">
                        <b className="summary-item__total--title">
                            Total
                        </b>
                        <div className="summary-item__total--element summary-item__total-element">
                            <div className="summary-item__total-element--icon">
                                <svg width="20" height="20" viewBox="0 0 13 13">
                                    <use xlinkHref="#time"></use>
                                </svg>
                            </div>
                            <b className="summary-item__total-element--name">
                                Time spent for projects
                            </b>
                            <button onClick={handleEntryTask} className="summary-item__total-element--link">
                                Show full data
                                <svg width="7" height="10" viewBox="0 0 7 10">
                                    <use xlinkHref="#arrow-next"></use>
                                </svg>
                            </button>
                            <div className="summary-item__total-element--value">
                                90 hours
                            </div>
                        </div>
                        <div className="summary-item__total--element summary-item__total-element">
                            <div className="summary-item__total-element--icon">
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <use xlinkHref="#money"></use>
                                </svg>
                            </div>
                            <b className="summary-item__total-element--name">
                                Time spent for projects
                            </b>
                            <button onClick={handleEntryCost} className="summary-item__total-element--link">
                                Show full data
                                <svg width="7" height="10" viewBox="0 0 7 10">
                                    <use xlinkHref="#arrow-next"></use>
                                </svg>
                            </button>
                            <div className="summary-item__total-element--value">
                                210 000 UAH
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
                                    <p>You already sent this timesheet for reapproval. Please, wait for the
                                        answer.</p>
                                </div>
                            }

                            {
                                dataItem.status === "reject" && <div className="summary-item__message is-danger">
                                    <svg width="20" height="20" viewBox="0 0 13 13">
                                        <use xlinkHref="#round-error"></use>
                                    </svg>
                                    <p>Your timesheet was rejected. Please, correct and send for reapproval.
                                        (by {dataItem.manager.first_name} {dataItem.manager.last_name})</p>
                                </div>
                            }

                            {
                                dataItem.status === "approve" && <div className="summary-item__message is-success">
                                    <svg width="20" height="20" viewBox="0 0 13 13">
                                        <use xlinkHref="#round-check"></use>
                                    </svg>
                                    <p>Your summary was approved! (by {dataItem.manager.first_name} {dataItem.manager.last_name})</p>
                                </div>
                            }

                        </div>
                        <div className="summary-item__footer--col">
                            <button className="summary-item__button btn is-grey is-transparent" type="button">
                                Export monthly summary
                                <svg width="16" height="17" viewBox="0 0 16 17">
                                    <use xlinkHref="#download"></use>
                                </svg>
                            </button>
                            <a onClick={_ => setPopup({popup: "approve-timesheet-popup", data: dataItem})}
                               className={`summary-item__button btn open-popup ${(dataItem.status === "waiting" || dataItem.status === "approve") && "is-disabled"}`}
                               type="button">
                                Send timesheet for approval
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
